import { useState } from "react";
import { Search, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ActiveSearchBarProps {
  query: string;
  onNewSearch: () => void;
  onEditSearch: (newQuery: string) => void;
  isLoading: boolean;
}

export function ActiveSearchBar({
  query,
  onNewSearch,
  onEditSearch,
  isLoading,
}: ActiveSearchBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuery, setEditedQuery] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedQuery.trim() && editedQuery !== query) {
      onEditSearch(editedQuery.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuery(query);
    setIsEditing(false);
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
          <Search className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
        </div>

        {/* Query Display / Edit */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={editedQuery}
                onChange={(e) => setEditedQuery(e.target.value)}
                className="flex-1 bg-background border-border text-foreground focus:border-emerald-500"
                autoFocus
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !editedQuery.trim()}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Search
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div
              className="cursor-pointer group"
              onClick={() => !isLoading && setIsEditing(true)}
            >
              <p className="text-xs text-muted-foreground mb-0.5">Current Search</p>
              <p className="text-foreground font-medium truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                "{query}"
              </p>
            </div>
          )}
        </div>

        {/* New Search Button */}
        {!isEditing && (
          <Button
            onClick={onNewSearch}
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="flex-shrink-0 border-border text-muted-foreground hover:text-foreground hover:border-emerald-500 hover:bg-emerald-500/10 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            New Search
          </Button>
        )}
      </div>
    </div>
  );
}
