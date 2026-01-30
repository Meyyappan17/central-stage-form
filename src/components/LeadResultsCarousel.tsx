import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeadResult } from "@/types/chat";
import { LeadResultCard } from "./LeadResultCard";

interface LeadResultsCarouselProps {
  leads: LeadResult[];
  isVisible: boolean;
}

export function LeadResultsCarousel({ leads, isVisible }: LeadResultsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [leads]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible || leads.length === 0) return null;

  return (
    <div className="relative w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Found {leads.length} Matching Leads
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-9 w-9 rounded-full border-border bg-card text-muted-foreground hover:text-foreground hover:border-emerald-500 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-9 w-9 rounded-full border-border bg-card text-muted-foreground hover:text-foreground hover:border-emerald-500 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {leads.map((lead, index) => (
            <div
              key={lead.id}
              className="flex-shrink-0 w-[320px] snap-start"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <LeadResultCard lead={lead} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {leads.map((lead, index) => (
          <button
            key={lead.id}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: index * 340,
                  behavior: "smooth",
                });
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              "bg-muted-foreground/30 hover:bg-emerald-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}
