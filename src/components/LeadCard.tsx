import { useState } from "react";
import { Lead } from "@/types/lead";
import { Star, MapPin, Clock, Phone, Mail, ArrowRight } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      onClick={handleFlip}
      className="cursor-pointer perspective-1000 w-72 h-80"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-card border border-border rounded-2xl p-6 shadow-soft backface-hidden flex flex-col">
          {/* Service Badge */}
          <span className="self-start px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
            {lead.service}
          </span>

          {/* Avatar & Name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{lead.name}</h3>
              <p className="text-sm text-muted-foreground">{lead.company}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{lead.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">({lead.reviewCount} reviews)</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span>{lead.location}</span>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-green-600 font-medium">{lead.availability}</span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-lg font-semibold text-foreground">{lead.priceRange}</p>
          </div>

          {/* Click hint */}
          <p className="text-xs text-muted-foreground text-center mt-3">
            Tap to flip
          </p>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 bg-card border border-border rounded-2xl p-6 shadow-soft backface-hidden rotate-y-180 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{lead.name}</h3>
              <p className="text-xs text-muted-foreground">{lead.service} Specialist</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-secondary rounded-lg p-2 text-center">
              <p className="font-bold text-foreground text-sm">{lead.yearsExperience}+</p>
              <p className="text-xs text-muted-foreground">Years</p>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-center">
              <p className="font-bold text-foreground text-sm">{lead.completedJobs.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Jobs</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-foreground text-xs">{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-foreground text-xs truncate">{lead.email}</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
            {lead.description}
          </p>

          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            View Full Details
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Flip back hint */}
          <p className="text-xs text-muted-foreground text-center mt-3">
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
