import { useRef, useEffect } from "react";
import { User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "assistant" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
          )}

          <div
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3",
              message.role === "user"
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                : "bg-card border border-border text-foreground"
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            <p
              className={cn(
                "text-xs mt-1",
                message.role === "user"
                  ? "text-white/70"
                  : "text-muted-foreground"
              )}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {message.role === "user" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4 text-foreground" />
            </div>
          )}
        </div>
      ))}

      {/* Loading indicator for assistant response */}
      {isLoading && (
        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="bg-card border border-border rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
