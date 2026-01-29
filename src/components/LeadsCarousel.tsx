import { useState } from "react";
import { Lead } from "@/types/lead";
import LeadCard from "./LeadCard";
import LeadDetailModal from "./LeadDetailModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeadsCarouselProps {
  leads: Lead[];
}

const LeadsCarousel = ({ leads }: LeadsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? leads.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === leads.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Top Matches</h2>
        <p className="text-muted-foreground text-sm mt-1">{leads.length} professionals found</p>
      </div>

      {/* Cards Container with Navigation */}
      <div className="flex items-center justify-center gap-6">
        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-border bg-card hover:bg-secondary shadow-soft transition-all hover:scale-105 z-10"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        {/* Stacked Cards */}
        <div className="relative w-72 h-80">
          {leads.map((lead, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            
            // Calculate position for stacked effect
            let translateX = 0;
            let translateZ = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = leads.length - Math.abs(offset);

            if (offset === 0) {
              // Current card
              translateZ = 0;
              scale = 1;
              opacity = 1;
            } else if (offset === 1 || offset === -(leads.length - 1)) {
              // Next card (or wrap around)
              translateX = 40;
              translateZ = -50;
              scale = 0.92;
              opacity = 0.6;
              zIndex = leads.length - 1;
            } else if (offset === -1 || offset === leads.length - 1) {
              // Previous card (or wrap around)
              translateX = -40;
              translateZ = -50;
              scale = 0.92;
              opacity = 0.6;
              zIndex = leads.length - 1;
            } else if (offset === 2 || offset === -(leads.length - 2)) {
              // Card after next
              translateX = 70;
              translateZ = -100;
              scale = 0.85;
              opacity = 0.3;
              zIndex = leads.length - 2;
            } else if (offset === -2 || offset === leads.length - 2) {
              // Card before previous
              translateX = -70;
              translateZ = -100;
              scale = 0.85;
              opacity = 0.3;
              zIndex = leads.length - 2;
            } else {
              // Hidden cards
              opacity = 0;
              scale = 0.8;
              zIndex = 0;
            }

            return (
              <div
                key={lead.id}
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <LeadCard lead={lead} onClick={() => isActive && handleCardClick(lead)} />
              </div>
            );
          })}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-border bg-card hover:bg-secondary shadow-soft transition-all hover:scale-105 z-10"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Card Counter */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <span className="text-sm font-medium text-foreground">{currentIndex + 1}</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm text-muted-foreground">{leads.length}</span>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {leads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-border hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LeadsCarousel;
