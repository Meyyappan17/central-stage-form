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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
          <Search className="h-5 w-5 text-emerald-400" />
        </div>

        {/* Query Display / Edit */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={editedQuery}
                onChange={(e) => setEditedQuery(e.target.value)}
                className="flex-1 bg-slate-900 border-slate-600 text-white focus:border-emerald-500"
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
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div
              className="cursor-pointer group"
              onClick={() => !isLoading && setIsEditing(true)}
            >
              <p className="text-xs text-slate-500 mb-0.5">Current Search</p>
              <p className="text-white font-medium truncate group-hover:text-emerald-300 transition-colors">
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
            className="flex-shrink-0 border-slate-600 text-slate-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            New Search
          </Button>
        )}
      </div>
    </div>
  );
}
