import { useState } from "react";
import { Plus, MessageSquare, Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/types/chat";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isCollapsed,
  onToggleCollapse,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const truncateId = (id: string) => {
    return id.replace("chat-uuid-", "").substring(0, 8);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gradient-to-b from-card to-secondary border-r border-border flex flex-col items-center py-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          className="text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-accent"
        >
          <Plus className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          {sessions.slice(0, 5).map((session) => (
            <Button
              key={session.id}
              variant="ghost"
              size="icon"
              onClick={() => onSelectSession(session.id)}
              className={cn(
                "text-muted-foreground hover:text-foreground hover:bg-accent",
                currentSessionId === session.id && "bg-accent text-foreground"
              )}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-gradient-to-b from-card to-secondary border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LP</span>
            </div>
            <span className="text-foreground font-semibold">History</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pb-4">
          {filteredSessions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chats found</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200",
                  currentSessionId === session.id
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
                    : "hover:bg-accent/50"
                )}
                onClick={() => onSelectSession(session.id)}
              >
                <MessageSquare
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    currentSessionId === session.id
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-muted-foreground"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      currentSessionId === session.id
                        ? "text-foreground"
                        : "text-foreground/80"
                    )}
                  >
                    {session.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(session.updatedAt)}</span>
                    <span>•</span>
                    <span className="font-mono">{truncateId(session.id)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {sessions.length} conversation{sessions.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
