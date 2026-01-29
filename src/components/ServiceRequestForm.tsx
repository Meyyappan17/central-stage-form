import { useState } from "react";
import { Sparkles, Camera, ArrowUp, Lightbulb, Wrench, Thermometer, SprayCan, Droplets } from "lucide-react";
import LeadsCarousel from "./LeadsCarousel";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";

const services = [
  { id: "electrical", label: "Electrical", icon: Lightbulb },
  { id: "handyman", label: "Handyman", icon: Wrench },
  { id: "hvac", label: "HVAC", icon: Thermometer },
  { id: "janitorial", label: "Janitorial", icon: SprayCan },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
];

const ServiceRequestForm = () => {
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || selectedService) {
      // Filter leads based on selected service or return all
      const filteredLeads = selectedService
        ? mockLeads.filter((lead) => lead.service.toLowerCase() === selectedService)
        : mockLeads;
      setSearchResults(filteredLeads);
      setHasSearched(true);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    const isSelected = selectedService === serviceId;
    setSelectedService(isSelected ? null : serviceId);
    
    // Auto-search when clicking a service
    if (!isSelected) {
      const filteredLeads = mockLeads.filter(
        (lead) => lead.service.toLowerCase() === serviceId
      );
      setSearchResults(filteredLeads);
      setHasSearched(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto animate-fade-in">
        {/* Main Input Container */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-input-bg border border-border rounded-2xl shadow-soft transition-shadow hover:shadow-input focus-within:shadow-input focus-within:border-primary/30">
            {/* Input Row */}
            <div className="flex items-center gap-3 p-4">
              {/* AI Sparkle Icon */}
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
              
              {/* Text Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe the work you need done... (e.g. Unclog a drain or Deep clean floors)"
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
            </div>

            {/* Bottom Row with Camera and Submit */}
            <div className="flex items-center justify-between px-4 pb-4">
              {/* Camera Button */}
              <button
                type="button"
                className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Upload photo"
              >
                <Camera className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!query.trim() && !selectedService}
                className="p-2.5 rounded-full bg-muted-foreground/80 hover:bg-foreground disabled:bg-muted-foreground/40 transition-colors disabled:cursor-not-allowed"
                aria-label="Submit request"
              >
                <ArrowUp className="w-5 h-5 text-background" />
              </button>
            </div>
          </div>
        </form>

        {/* Service Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`
                  flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-200
                  ${isSelected 
                    ? "bg-primary/10 border-primary text-primary" 
                    : "bg-pill-bg border-pill-border hover:bg-pill-hover hover:border-primary/20 text-foreground"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-primary"}`} />
                <span className="text-sm font-medium">{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && searchResults.length > 0 && (
        <div className="mt-12 px-4">
          <LeadsCarousel leads={searchResults} />
        </div>
      )}
    </div>
  );
};

export default ServiceRequestForm;
