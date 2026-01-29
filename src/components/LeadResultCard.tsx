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
  CloudUpload,
  Loader2,
  CheckCircle2,
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
  const [isPushingToSF, setIsPushingToSF] = useState(false);
  const [isPushedToSF, setIsPushedToSF] = useState(false);

  const handlePushToSalesforce = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPushedToSF || isPushingToSF) return;
    
    setIsPushingToSF(true);
    // Simulate API call to Salesforce
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsPushingToSF(false);
    setIsPushedToSF(true);
  };

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
          <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-emerald-500/30 shadow-xl shadow-emerald-500/10 overflow-hidden flex flex-col">
            {/* Back Header */}
            <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-white">Contact Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white gap-1 h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <RotateCcw className="h-3 w-3" />
                  Flip
                </Button>
              </div>
              <p className="text-emerald-400 text-xs">{lead.companyName}</p>
            </div>

            {/* Minimal Contact Info */}
            <div className="flex-1 p-4 flex flex-col">
              {/* Contact Card */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {lead.contact.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{lead.contact.name}</p>
                  <p className="text-slate-400 text-xs">{lead.contact.title}</p>
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <a
                  href={`mailto:${lead.contact.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 p-2.5 bg-slate-800/50 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-all text-sm"
                >
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="truncate text-xs">{lead.contact.email}</span>
                </a>
                <a
                  href={`tel:${lead.contact.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 p-2.5 bg-slate-800/50 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all text-sm"
                >
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-xs">{lead.contact.phone}</span>
                </a>
              </div>

              {/* Push to Salesforce Button */}
              <Button
                onClick={handlePushToSalesforce}
                disabled={isPushingToSF || isPushedToSF}
                className={cn(
                  "w-full font-medium transition-all duration-300 mt-3 h-10",
                  isPushedToSF
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                )}
              >
                {isPushingToSF ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm">Pushing...</span>
                  </>
                ) : isPushedToSF ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <span className="text-sm">Added to Salesforce</span>
                  </>
                ) : (
                  <>
                    <CloudUpload className="h-4 w-4 mr-2" />
                    <span className="text-sm">Push to Salesforce</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
