import { useState } from "react";
import {
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Building2,
  DollarSign,
  TrendingUp,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeadResult } from "@/types/chat";

interface LeadResultCardProps {
  lead: LeadResult;
  index: number;
}

export function LeadResultCard({ lead, index }: LeadResultCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-cyan-400";
    if (score >= 70) return "text-amber-400";
    return "text-slate-400";
  };

  return (
    <div
      className="relative h-[380px] w-full perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-all duration-700 transform-style-preserve-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl shadow-black/20 overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
            {/* Card Header with Score */}
            <div className="relative p-5 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
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
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-slate-900 border-2",
                      getScoreColor(lead.matchScore)
                    )}
                    style={{ borderColor: "currentColor" }}
                  >
                    {lead.matchScore}
                  </div>
                </div>
                <div className="flex-1 min-w-0 pr-20">
                  <h3 className="font-semibold text-lg text-white truncate group-hover:text-emerald-300 transition-colors">
                    {lead.companyName}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="truncate">{lead.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <Users className="h-4 w-4 mx-auto mb-1 text-cyan-400" />
                  <p className="text-white font-semibold text-sm">{lead.employeeCount}</p>
                  <p className="text-slate-500 text-xs">Employees</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <DollarSign className="h-4 w-4 mx-auto mb-1 text-emerald-400" />
                  <p className="text-white font-semibold text-sm">{lead.revenue}</p>
                  <p className="text-slate-500 text-xs">Revenue</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                  <p className={cn("font-semibold text-sm", getScoreColor(lead.matchScore))}>
                    {lead.matchScore}%
                  </p>
                  <p className="text-slate-500 text-xs">Match</p>
                </div>
              </div>

              {/* Industry & Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">{lead.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400 truncate">{lead.address}</span>
                </div>
              </div>

              {/* Contact Preview */}
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-2">Primary Contact</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{lead.contact.name}</p>
                    <p className="text-slate-400 text-xs">{lead.contact.title}</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <span>View Details</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-emerald-500/30 shadow-xl shadow-emerald-500/10 overflow-hidden">
            {/* Back Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-white">Contact Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Flip
                </Button>
              </div>
              <p className="text-emerald-400 text-sm">{lead.companyName}</p>
            </div>

            {/* Contact Info */}
            <div className="p-5 space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {lead.contact.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{lead.contact.name}</p>
                    <p className="text-slate-400 text-sm">{lead.contact.title}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${lead.contact.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span className="truncate">{lead.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${lead.contact.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <span>{lead.contact.phone}</span>
                  </a>
                  {lead.contact.linkedIn && (
                    <a
                      href={`https://${lead.contact.linkedIn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      <Linkedin className="h-4 w-4 text-blue-400" />
                      <span className="truncate">LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Company Website */}
              <a
                href={`https://${lead.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Globe className="h-4 w-4 text-emerald-400" />
                <span>{lead.website}</span>
              </a>

              {/* Description */}
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-2">About</p>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {lead.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
