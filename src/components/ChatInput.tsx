import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FrequentPrompt } from "@/types/chat";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  frequentPrompts: FrequentPrompt[];
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  frequentPrompts,
  isLoading,
  placeholder = "Describe the leads you're looking for...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (!isLoading) {
      onSendMessage(prompt);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Input Area */}
      <div className="relative">
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-xl shadow-black/20 overflow-hidden transition-all duration-300 focus-within:border-emerald-500/50 focus-within:shadow-emerald-500/10">
          <div className="flex items-end p-2">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 min-h-[56px] max-h-[150px] bg-transparent border-0 text-white placeholder:text-slate-500 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base py-4 px-4"
              rows={1}
            />
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-xl transition-all duration-300 mr-2 mb-2",
                message.trim() && !isLoading
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-slate-700 text-slate-500"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Input footer hint */}
          <div className="px-4 pb-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>AI-powered lead discovery</span>
            </div>
            <span>Press Enter to send</span>
          </div>
        </div>
      </div>

      {/* Frequent Prompts */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="font-medium">Quick searches</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {frequentPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => handlePromptClick(prompt.prompt)}
              disabled={isLoading}
              className={cn(
                "group relative p-4 rounded-xl text-left transition-all duration-300",
                "bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50",
                "hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-cyan-500/10",
                "hover:shadow-lg hover:shadow-emerald-500/5",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{prompt.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm group-hover:text-emerald-300 transition-colors">
                    {prompt.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {prompt.prompt}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
