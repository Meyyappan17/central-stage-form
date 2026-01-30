import { useState } from "react";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Building2,
  TrendingUp,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LeadResult } from "@/types/chat";

interface LeadResultCardProps {
  lead: LeadResult;
  index: number;
}

export function LeadResultCard({ lead, index }: LeadResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: LeadResult["salesforceStatus"]) => {
    switch (status) {
      case "new":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "qualified":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "existing":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusLabel = (status: LeadResult["salesforceStatus"]) => {
    switch (status) {
      case "new":
        return "New Lead";
      case "qualified":
        return "Qualified";
      case "existing":
        return "Existing";
      default:
        return status;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 80) return "text-cyan-500 dark:text-cyan-400";
    if (score >= 70) return "text-amber-500 dark:text-amber-400";
    return "text-muted-foreground";
  };

  return (
    <>
      {/* Lead Card - Click to open modal */}
      <div
        className="relative h-[380px] w-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-full bg-gradient-to-br from-card to-secondary rounded-2xl border border-border shadow-xl shadow-black/10 dark:shadow-black/20 overflow-hidden group hover:border-emerald-500/30 hover:shadow-emerald-500/10 transition-all duration-300">
          {/* Card Header with Score */}
          <div className="relative p-5 bg-gradient-to-r from-secondary to-muted border-b border-border">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge className={cn("border", getStatusColor(lead.salesforceStatus))}>
                {getStatusLabel(lead.salesforceStatus)}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {lead.companyName.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-20">
                <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors">
                  {lead.companyName}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Building2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="truncate">{lead.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <Building2 className="h-4 w-4 mx-auto mb-1 text-cyan-500 dark:text-cyan-400" />
                <p className="text-foreground font-semibold text-sm">{lead.employeeCount.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">Locations</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-emerald-500 dark:text-emerald-400" />
                <p className="text-foreground font-semibold text-sm capitalize">{lead.confidence || 'N/A'}</p>
                <p className="text-muted-foreground text-xs">Confidence</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-amber-500 dark:text-amber-400" />
                <p className={cn("font-semibold text-sm", getScoreColor(lead.matchScore))}>
                  {lead.matchScore}%
                </p>
                <p className="text-muted-foreground text-xs">Match</p>
              </div>
            </div>

            {/* Company Address */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground truncate">{lead.address || lead.location}</span>
            </div>

            {/* Contact Preview */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Primary Contact</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium text-sm">{lead.contact.name}</p>
                  <p className="text-muted-foreground text-xs">{lead.contact.title}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 text-xs font-medium">
                  <span>View Details</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Enlarged Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] bg-gradient-to-br from-card to-secondary border-border text-foreground flex flex-col">
          <DialogHeader className="flex-shrink-0 pb-4">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg">
                  {lead.companyName.charAt(0)}
                </div>
                <span className="truncate">{lead.companyName}</span>
              </DialogTitle>
              <Badge className={cn("border flex-shrink-0", getStatusColor(lead.salesforceStatus))}>
                {getStatusLabel(lead.salesforceStatus)}
              </Badge>
            </div>
            <DialogDescription className="text-muted-foreground text-sm">
              {lead.industry} • {lead.location}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--muted-foreground)) transparent'
            }}
          >
            {/* Row 1: Company Description */}
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                Company Description
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{lead.description}</p>
            </div>

            {/* Row 2: Headquarters & Website */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Headquarters</h4>
                </div>
                <p className="text-foreground text-sm font-medium">{lead.location}</p>
              </div>
              {lead.website && lead.website !== "N/A" && (
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Website</h4>
                  </div>
                  <a
                    href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 text-sm truncate block font-medium"
                  >
                    {lead.website}
                  </a>
                </div>
              )}
            </div>

            {/* Row 3: Industry | Estimated Locations | Confidence */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Industry</h4>
                </div>
                <p className="text-foreground text-sm font-medium">{lead.industry}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border text-center">
                <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Locations</h4>
                <p className="text-foreground font-bold text-xl">{lead.employeeCount.toLocaleString()}</p>
              </div>
              {lead.confidence && (
                <div className="bg-secondary/50 rounded-lg p-4 border border-border text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                    <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Confidence</h4>
                  </div>
                  <p className="text-foreground text-sm font-medium capitalize">{lead.confidence}</p>
                </div>
              )}
            </div>

            {/* Row 4: Fit Score | Intent Score | Overall Score */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-lg p-4 border border-border text-center">
                <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Fit Score</h4>
                <p className={cn("font-bold text-2xl", getScoreColor(lead.fitScore || 0))}>
                  {lead.fitScore || 0}%
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-lg p-4 border border-border text-center">
                <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Intent Score</h4>
                <p className={cn("font-bold text-2xl", getScoreColor(lead.intentScore || 0))}>
                  {lead.intentScore || 0}%
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-lg p-4 border border-border text-center">
                <h4 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Overall Score</h4>
                <p className={cn("font-bold text-2xl", getScoreColor(lead.overallScore || 0))}>
                  {lead.overallScore || 0}%
                </p>
              </div>
            </div>

            {/* Matching DMG Customers - Moved above Intent Signals */}
            {lead.matchingDMGCustomers && lead.matchingDMGCustomers.length > 0 && (
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/20">
                <div className="flex items-start gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground font-semibold text-sm">Existing DMG Customers</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      We are already serving these {lead.industry?.toUpperCase().replace(/\s+/g, '_') || 'industry'} customers
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lead.matchingDMGCustomers.map((customer, idx) => (
                    <Badge
                      key={idx}
                      className="bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                    >
                      {customer}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Intent Signals */}
            {lead.intentSignals && (
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <h4 className="text-foreground font-semibold text-sm">Intent Signals</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.expansionNews ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.expansionNews ? "text-foreground" : "text-muted-foreground")}>
                      Expansion News
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.hiringFacilityRoles ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.hiringFacilityRoles ? "text-foreground" : "text-muted-foreground")}>
                      Hiring Facility Roles
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.recentFunding ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.recentFunding ? "text-foreground" : "text-muted-foreground")}>
                      Recent Funding
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.leadershipChange ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.leadershipChange ? "text-foreground" : "text-muted-foreground")}>
                      Leadership Change
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.competitorMentions ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.competitorMentions ? "text-foreground" : "text-muted-foreground")}>
                      Competitor Mentions
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    {lead.intentSignals.rfpActivity ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={cn("text-xs", lead.intentSignals.rfpActivity ? "text-foreground" : "text-muted-foreground")}>
                      RFP Activity
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg p-3 border border-emerald-500/20">
              <h4 className="text-foreground font-semibold mb-3 text-sm">Primary Contact</h4>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
                  {lead.contact.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-foreground font-semibold text-sm truncate">{lead.contact.name}</p>
                  <p className="text-muted-foreground text-xs truncate">{lead.contact.title}</p>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${lead.contact.email}`}
                  className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-secondary transition-all text-sm"
                >
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <span className="truncate">{lead.contact.email}</span>
                </a>
                
                <a
                  href={`tel:${lead.contact.phone}`}
                  className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-secondary transition-all text-sm"
                >
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                  </div>
                  <span className="truncate">{lead.contact.phone}</span>
                </a>

                {lead.contact.linkedIn && (
                  <a
                    href={lead.contact.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400 hover:bg-secondary transition-all text-sm"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="truncate">LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {/* Other Contacts */}
            {lead.otherContacts && lead.otherContacts.length > 0 && (
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <h4 className="text-foreground font-semibold mb-3 text-sm">Other Contacts</h4>
                <div className="space-y-3">
                  {lead.otherContacts.map((contact, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-muted to-secondary rounded-full flex items-center justify-center text-foreground font-bold text-xs shadow flex-shrink-0">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium text-sm truncate">{contact.name}</p>
                        <p className="text-muted-foreground text-xs truncate">{contact.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <a href={`mailto:${contact.email}`} className="text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 text-xs truncate">
                            {contact.email}
                          </a>
                          <span className="text-muted-foreground/50">•</span>
                          <a href={`tel:${contact.phone}`} className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {lead.sources && lead.sources.length > 0 && (
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <h4 className="text-foreground font-semibold mb-2 text-sm flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  Sources
                </h4>
                <div className="space-y-2">
                  {lead.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-background/50 rounded-lg text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-background transition-all text-xs group"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate flex-1">{source}</span>
                      <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
