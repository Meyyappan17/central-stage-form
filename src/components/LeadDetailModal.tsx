import { Lead } from "@/types/lead";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MapPin, Clock, Phone, Mail, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <DialogTitle className="text-xl">{lead.name}</DialogTitle>
              <p className="text-muted-foreground">{lead.company}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-secondary rounded-xl">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-bold text-foreground">{lead.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{lead.reviewCount} reviews</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-xl">
              <p className="font-bold text-foreground">{lead.yearsExperience}+</p>
              <p className="text-xs text-muted-foreground">Years exp.</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-xl">
              <p className="font-bold text-foreground">{lead.completedJobs.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Jobs done</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-foreground mb-2">About</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{lead.description}</p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">{lead.availability}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.priceRange}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.email}</span>
            </div>
          </div>

          {/* Service Badge */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{lead.service} Specialist</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1">Contact Now</Button>
            <Button variant="outline" className="flex-1">Save Lead</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
