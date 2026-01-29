import { useState, useEffect, useCallback } from "react";
import { Sparkles, Target, Zap } from "lucide-react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { LeadResultsCarousel } from "@/components/LeadResultsCarousel";
import { ActiveSearchBar } from "@/components/ActiveSearchBar";
import { ChatSession, LeadResult, ChatMessage } from "@/types/chat";
import {
  mockChatSessions,
  frequentPrompts,
  motivationalQuotes,
  mockSearchLeads,
  generateChatId,
} from "@/data/mockChatData";

export default function LeadsProPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentResults, setCurrentResults] = useState<LeadResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [quote, setQuote] = useState("");

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
    setCurrentQuery("");
  }, []);

  const handleSelectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
    // Load the session's stored results and query
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentResults(session.results || []);
      setCurrentQuery(session.query || "");
    } else {
      setCurrentResults([]);
      setCurrentQuery("");
    }
  }, [sessions]);

  const handleDeleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setCurrentResults([]);
      setCurrentQuery("");
    }
  }, [currentSessionId]);

  const handleNewSearch = useCallback(() => {
    // Clear results but keep the session - user can start a new search within same session
    setCurrentResults([]);
    setCurrentQuery("");
    // Also update the session to clear stored results
    if (currentSessionId) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, query: "", results: [], title: "New Search" }
            : s
        )
      );
    }
  }, [currentSessionId]);

  const handleSendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setCurrentQuery(message);

    let sessionId = currentSessionId;

    // Create or update session
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
      // Call mock API
      const results = await mockSearchLeads(message);
      setCurrentResults(results);
      
      // Store results in the session
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, results, query: message }
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

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
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
        <header className="flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
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
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    Leads<span className="text-emerald-400">Pro</span>
                  </h1>
                  <p className="text-xs text-slate-500">AI-Powered Lead Discovery</p>
                </div>
              </div>

              {currentSessionId && (
                <div className="text-right">
                  <p className="text-xs text-slate-500">Session ID</p>
                  <p className="text-sm font-mono text-slate-400">
                    {currentSessionId.replace("chat-uuid-", "")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Show Active Search Bar when we have results or are loading */}
            {(currentResults.length > 0 || isLoading) && currentQuery && (
              <ActiveSearchBar
                query={currentQuery}
                onNewSearch={handleNewSearch}
                onEditSearch={handleSendMessage}
                isLoading={isLoading}
              />
            )}

            {/* Welcome Section - Only show when no results and not loading */}
            {!isLoading && currentResults.length === 0 && (
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
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 max-w-2xl mx-auto leading-tight">
                    {quote}
                  </h2>

                  {/* Subheading - Hint */}
                  <p className="text-slate-400 text-lg mb-2">
                    Find facility management leads for your target industries
                  </p>
                  <p className="text-slate-500 text-sm max-w-xl mx-auto">
                    Try searching for <span className="text-emerald-400">"top 5 burger chains in Texas"</span> or{" "}
                    <span className="text-emerald-400">"coffee shops in California with 50+ employees"</span>
                  </p>
                </div>

                {/* Chat Input Section - Only show when no results */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                  frequentPrompts={frequentPrompts}
                  isLoading={isLoading}
                  placeholder="Describe the leads you're looking for... (e.g., 'top 5 burger chains in Texas')"
                />
              </>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-16 animate-in fade-in duration-300">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Discovering leads for you...
                </h2>
                <p className="text-slate-400">
                  Searching across databases and verifying with Salesforce
                </p>
              </div>
            )}

            {/* Results Section - Show below search bar when we have results */}
            {!isLoading && currentResults.length > 0 && (
              <LeadResultsCarousel leads={currentResults} isVisible={true} />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 border-t border-slate-800 bg-slate-900/30 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <p>Powered by AI Agent • ZoomInfo • Salesforce Integration</p>
            <p>Hackathon 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
