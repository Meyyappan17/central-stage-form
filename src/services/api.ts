// API Service for Lead Finder Backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Chat Agent API - for conversational lead discovery
export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  sessionId: string;
  message: string;
  isComplete: boolean;
  searchRequest?: {
    query: string;
    filters: {
      minLocations?: number;
      geography?: string;
      industry?: string;
    };
    config?: {
      enableEnrichment?: boolean;
      enableIntentScoring?: boolean;
      enrichmentSources?: string[];
    };
  };
}

// Leads API - for direct lead search
export interface LeadsRequest {
  query: string;
  aeId?: string;
  config?: {
    enableEnrichment?: boolean;
    enableSalesforceCheck?: boolean;
    enrichmentProvider?: string;
    maxLeads?: number;
  };
  filters?: {
    minLocations?: number;
    geography?: string;
    industry?: string;
  };
}

export interface KeyContact {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  source: string;
  relevanceScore: number;
}

export interface IntentSignals {
  expansionNews: boolean;
  hiringFacilityRoles: boolean;
  recentFunding: boolean;
  leadershipChange: boolean;
  competitorMentions: boolean;
  rfpActivity: boolean;
}

export interface MatchingCompany {
  customer_id: string;
  name: string;
  industry_name: string;
  website: string;
  status: string;
}

export interface LeadData {
  id: string;
  companyName: string;
  website: string;
  industry: string;
  estimatedLocations: number;
  headquarters: string;
  description: string;
  sources: string[];
  confidence: 'high' | 'medium' | 'low';
  discoveredAt: string;
  searchQuery: string;
  salesforceStatus: 'NEW' | 'EXISTS_ASSIGNED' | 'EXISTS_UNASSIGNED';
  enrichment?: {
    socialLinks?: Record<string, string>;
    keyContacts?: KeyContact[];
  };
  intentSignals?: IntentSignals;
  fitScore?: number;
  intentScore?: number;
  overallScore?: number;
  matchingActiveCompaniesInDMG?: MatchingCompany[];
}

export interface PipelineStage {
  stage: string;
  inputCount: number;
  outputCount: number;
  durationMs: number;
  details?: Record<string, unknown>;
}

export interface LeadsResponse {
  pipelineId: string;
  query: string;
  leads: LeadData[];
  stages: PipelineStage[];
  timestamp: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Chat Agent endpoint - POST /api/chat
  // Used when VITE_CHAT_AGENT_ENABLED=true for conversational flow
  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        sessionId: request.sessionId,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Direct Leads search endpoint - POST /api/leads/search
  // Used for both:
  // 1. When VITE_CHAT_AGENT_ENABLED=false for direct search
  // 2. After chat is complete (isComplete=true) to fetch leads with searchRequest
  async searchLeads(request: LeadsRequest): Promise<LeadsResponse> {
    const response = await fetch(`${this.baseUrl}/api/leads/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
export default apiService;
