import { Lead } from "@/types/lead";
import { Star, MapPin, Clock } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer perspective-1000"
    >
      <div className="relative w-72 h-80 transition-transform duration-500 transform-style-3d group-hover:rotate-y-6">
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
            Click to view details
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
