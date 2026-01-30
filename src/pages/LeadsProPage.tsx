import { useState, useEffect, useCallback } from "react";
import { Sparkles, Target, Zap, MessageCircle } from "lucide-react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { LeadResultsCarousel } from "@/components/LeadResultsCarousel";
import { ActiveSearchBar } from "@/components/ActiveSearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatSession, LeadResult, ChatMessage, LeadData } from "@/types/chat";
import { apiService, ChatResponse, LeadsRequest } from "@/services/api";
import { config } from "@/config";
import {
  mockChatSessions,
  frequentPrompts,
  motivationalQuotes,
  generateChatId,
} from "@/data/mockChatData";
import { Badge } from "@/components/ui/badge";

// Convert API LeadData to UI LeadResult format
function convertLeadDataToResult(lead: LeadData): LeadResult {
  const primaryContact = lead.enrichment?.keyContacts?.[0];
  
  return {
    id: lead.id,
    companyName: lead.companyName,
    location: lead.headquarters,
    address: lead.headquarters,
    employeeCount: lead.estimatedLocations || 0,
    industry: lead.industry,
    revenue: lead.estimatedLocations ? `${lead.estimatedLocations}+ locations` : "N/A",
    website: lead.website,
    description: lead.description,
    contact: {
      name: primaryContact?.name || "Contact not available",
      title: primaryContact?.title || "",
      email: primaryContact?.email || `info@${lead.website?.replace(/https?:\/\//, "").replace("www.", "")}`,
      phone: primaryContact?.phone || "",
      linkedIn: primaryContact?.linkedin,
    },
    salesforceStatus: lead.salesforceStatus === "NEW" ? "new" : 
                      lead.salesforceStatus === "EXISTS_ASSIGNED" ? "qualified" : "existing",
    matchScore: lead.overallScore || lead.fitScore || 70,
  };
}

export default function LeadsProPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentResults, setCurrentResults] = useState<LeadResult[]>([]);
  const [currentLeadData, setCurrentLeadData] = useState<LeadData[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [quote, setQuote] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [backendSessionId, setBackendSessionId] = useState<string | null>(null);
  const [isInChatMode, setIsInChatMode] = useState(false);
  const [pendingSearchRequest, setPendingSearchRequest] = useState<ChatResponse["searchRequest"] | null>(null);

  const chatAgentEnabled = config.chatAgentEnabled;

  // Set random quote on mount and session change
  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, [currentSessionId]);

  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: generateChatId(),
      title: "New Search",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
      query: "",
      results: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setCurrentResults([]);
    setCurrentLeadData([]);
    setCurrentQuery("");
    setChatMessages([]);
    setBackendSessionId(null);
    setIsInChatMode(false);
    setPendingSearchRequest(null);
  }, []);

  const handleSelectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentResults(session.results || []);
      setCurrentQuery(session.query || "");
      setChatMessages(session.messages || []);
      setBackendSessionId(session.sessionId || null);
      setIsInChatMode(session.messages && session.messages.length > 0);
    } else {
      setCurrentResults([]);
      setCurrentQuery("");
      setChatMessages([]);
      setBackendSessionId(null);
      setIsInChatMode(false);
    }
  }, [sessions]);

  const handleDeleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setCurrentResults([]);
      setCurrentLeadData([]);
      setCurrentQuery("");
      setChatMessages([]);
      setBackendSessionId(null);
      setIsInChatMode(false);
    }
  }, [currentSessionId]);

  const handleNewSearch = useCallback(() => {
    setCurrentResults([]);
    setCurrentLeadData([]);
    setCurrentQuery("");
    setChatMessages([]);
    setBackendSessionId(null);
    setIsInChatMode(false);
    setPendingSearchRequest(null);
    
    if (currentSessionId) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, query: "", results: [], messages: [], title: "New Search", sessionId: undefined }
            : s
        )
      );
    }
  }, [currentSessionId]);

  // Fetch leads using /api/leads/search after chat is complete
  const fetchLeadsFromChat = useCallback(async (searchRequest: ChatResponse["searchRequest"]) => {
    if (!searchRequest) return;
    
    setIsLoading(true);

    try {
      // Build the request using search request from chat + default config
      const leadsRequest: LeadsRequest = {
        query: searchRequest.query || "Find potential leads",
        config: {
          enableEnrichment: searchRequest.config?.enableEnrichment ?? config.defaultConfig.enableEnrichment,
          enableSalesforceCheck: config.defaultConfig.enableSalesforceCheck,
          enrichmentProvider: config.defaultConfig.enrichmentProvider,
          maxLeads: config.defaultConfig.maxLeads,
        },
        filters: {
          minLocations: searchRequest.filters?.minLocations ?? config.defaultFilters.minLocations,
          geography: searchRequest.filters?.geography ?? config.defaultFilters.geography,
          industry: searchRequest.filters?.industry ?? config.defaultFilters.industry,
        },
      };

      const response = await apiService.searchLeads(leadsRequest);
      
      setCurrentLeadData(response.leads);
      const results = response.leads.map(convertLeadDataToResult);
      setCurrentResults(results);
      setCurrentQuery(searchRequest.query || response.query || "Lead Search");

      if (currentSessionId) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? { 
                  ...s, 
                  results, 
                  leadData: response.leads,
                  query: searchRequest.query || response.query,
                  title: (searchRequest.query || response.query || "").length > 30 
                    ? (searchRequest.query || response.query || "").substring(0, 30) + "..." 
                    : (searchRequest.query || response.query || "Lead Search")
                }
              : s
          )
        );
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      const errorMessage: ChatMessage = {
        id: generateChatId(),
        role: "assistant",
        content: `Sorry, I encountered an error while searching for leads: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsInChatMode(false);
    }
  }, [currentSessionId]);

  // Handle chat agent flow
  const handleChatAgentMessage = useCallback(async (message: string) => {
    setIsChatLoading(true);
    setIsInChatMode(true);

    const userMessage: ChatMessage = {
      id: generateChatId(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    let sessionId = currentSessionId;

    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: generateChatId(),
        title: message.length > 30 ? message.substring(0, 30) + "..." : message,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [userMessage],
        query: message,
        results: [],
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    }

    try {
      const response = await apiService.sendChatMessage({
        message,
        sessionId: backendSessionId || undefined,
      });

      setBackendSessionId(response.sessionId);

      if (response.message) {
        const assistantMessage: ChatMessage = {
          id: generateChatId(),
          role: "assistant",
          content: response.message,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, assistantMessage]);

        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId
              ? { 
                  ...s, 
                  messages: [...(s.messages || []), userMessage, assistantMessage],
                  sessionId: response.sessionId,
                  updatedAt: new Date()
                }
              : s
          )
        );
      }

      if (response.isComplete && response.searchRequest) {
        setPendingSearchRequest(response.searchRequest);
        
        const searchingMessage: ChatMessage = {
          id: generateChatId(),
          role: "assistant",
          content: `Perfect! I'll now search for leads matching your criteria:\n\n• Query: ${response.searchRequest.query}\n• Industry: ${response.searchRequest.filters?.industry || "Any"}\n• Geography: ${response.searchRequest.filters?.geography || "Any"}\n• Min Locations: ${response.searchRequest.filters?.minLocations || "Any"}\n\nSearching...`,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, searchingMessage]);
        
        setIsChatLoading(false);
        // Use /api/leads/search with the search request from chat
        await fetchLeadsFromChat(response.searchRequest);
      }
    } catch (error) {
      console.error("Chat agent error:", error);
      const errorMessage: ChatMessage = {
        id: generateChatId(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  }, [currentSessionId, backendSessionId, fetchLeadsFromChat]);

  // Handle direct search (no chat agent)
  const handleDirectSearch = useCallback(async (message: string) => {
    setIsLoading(true);
    setCurrentQuery(message);

    let sessionId = currentSessionId;

    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: generateChatId(),
        title: message.length > 30 ? message.substring(0, 30) + "..." : message,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
        query: message,
        results: [],
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    } else {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? {
                ...s,
                title: message.length > 30 ? message.substring(0, 30) + "..." : message,
                updatedAt: new Date(),
                query: message,
              }
            : s
        )
      );
    }

    try {
      const leadsRequest: LeadsRequest = {
        query: message,
        config: config.defaultConfig,
        filters: config.defaultFilters,
      };

      const response = await apiService.searchLeads(leadsRequest);
      
      setCurrentLeadData(response.leads);
      const results = response.leads.map(convertLeadDataToResult);
      setCurrentResults(results);

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, results, leadData: response.leads, query: message }
            : s
        )
      );
    } catch (error) {
      console.error("Error fetching leads:", error);
      setCurrentResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentSessionId]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (chatAgentEnabled) {
      await handleChatAgentMessage(message);
    } else {
      await handleDirectSearch(message);
    }
  }, [chatAgentEnabled, handleChatAgentMessage, handleDirectSearch]);

  const showWelcome = !isLoading && !isChatLoading && currentResults.length === 0 && chatMessages.length === 0;
  const showChatInterface = chatAgentEnabled && (chatMessages.length > 0 || isChatLoading) && currentResults.length === 0;
  const showResults = !isLoading && currentResults.length > 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                    <Zap className="h-2.5 w-2.5 text-slate-900" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Leads<span className="text-emerald-400">Pro</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">AI-Powered Lead Discovery</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Mode Indicator */}
                <Badge variant={chatAgentEnabled ? "default" : "secondary"} className="hidden sm:flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {chatAgentEnabled ? "Chat Agent" : "Direct Search"}
                </Badge>

                {currentSessionId && (
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-muted-foreground">Session ID</p>
                    <p className="text-sm font-mono text-muted-foreground">
                      {currentSessionId.replace("chat-uuid-", "")}
                    </p>
                  </div>
                )}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Show Active Search Bar when we have results or are loading */}
            {showResults && currentQuery && (
              <ActiveSearchBar
                query={currentQuery}
                onNewSearch={handleNewSearch}
                onEditSearch={handleSendMessage}
                isLoading={isLoading}
              />
            )}

            {/* Welcome Section - Only show when no results, no chat messages, and not loading */}
            {showWelcome && (
              <>
                <div className="text-center mb-12 animate-in fade-in duration-500">
                  {/* Decorative Elements */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-emerald-400" />
                      </div>
                      <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full animate-ping" />
                    </div>
                  </div>

                  {/* Motivational Quote */}
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 max-w-2xl mx-auto leading-tight">
                    {quote}
                  </h2>

                  {/* Subheading - Hint */}
                  <p className="text-muted-foreground text-lg mb-2">
                    Find facility management leads for your target industries
                  </p>
                  <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto">
                    {chatAgentEnabled ? (
                      <>
                        I'll help you discover leads. Just tell me what you're looking for and I'll ask a few clarifying questions.
                      </>
                    ) : (
                      <>
                        Try searching for <span className="text-emerald-400">"top 5 burger chains in Texas"</span> or{" "}
                        <span className="text-emerald-400">"coffee shops in California with 50+ employees"</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Chat Input Section - Only show when no results */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                  frequentPrompts={frequentPrompts}
                  isLoading={isLoading || isChatLoading}
                  placeholder={chatAgentEnabled 
                    ? "Tell me what kind of leads you're looking for..." 
                    : "Describe the leads you're looking for... (e.g., 'top 5 burger chains in Texas')"
                  }
                />
              </>
            )}

            {/* Chat Interface - Show when in chat agent mode with messages */}
            {showChatInterface && (
              <div className="flex flex-col h-full">
                <ChatMessages messages={chatMessages} isLoading={isChatLoading} />
                
                <div className="mt-auto pt-4">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    frequentPrompts={[]}
                    isLoading={isChatLoading}
                    placeholder="Continue the conversation..."
                  />
                </div>
              </div>
            )}

            {/* Loading State - Only for direct search mode or leads fetching */}
            {isLoading && !chatAgentEnabled && (
              <div className="text-center py-16 animate-in fade-in duration-300">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Discovering leads for you...
                </h2>
                <p className="text-muted-foreground">
                  Searching across databases and verifying with Salesforce
                </p>
              </div>
            )}

            {/* Results Section - Show below search bar when we have results */}
            {showResults && (
              <LeadResultsCarousel leads={currentResults} isVisible={true} />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 border-t border-border bg-card/30 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Powered by AI Agent • ZoomInfo • Salesforce Integration</p>
            <p>Hackathon 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
