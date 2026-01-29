export interface LeadContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedIn?: string;
}

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
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  results?: LeadResult[];
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
  query?: string;
  results?: LeadResult[];
}

export interface FrequentPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
