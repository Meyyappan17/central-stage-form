import type { LeadData, KeyContact, IntentSignals, MatchingCompany } from '@/services/api';

export interface LeadContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedIn?: string;
}

// Re-export API types for convenience
export type { LeadData, KeyContact, IntentSignals, MatchingCompany };

export interface LeadResult {
  id: string;
  companyName: string;
  location: string;
  address: string;
  employeeCount: number;
  industry: string;
  revenue: string;
  website: string;
  description: string;
  contact: LeadContact;
  salesforceStatus: "new" | "existing" | "qualified";
  matchScore: number;
  // Extended fields from API
  confidence?: 'high' | 'medium' | 'low';
  fitScore?: number;
  intentScore?: number;
  overallScore?: number;
  intentSignals?: IntentSignals;
  sources?: string[];
  otherContacts?: LeadContact[];
  matchingDMGCustomers?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  results?: LeadResult[];
  leadData?: LeadData[]; // New field for API response data
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
  query?: string;
  results?: LeadResult[];
  leadData?: LeadData[]; // New field for API response data
  sessionId?: string; // Backend session ID for chat agent
}

export interface FrequentPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
