// Environment configuration for the application

export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Chat Agent Mode
  // When true: Uses conversational chat agent flow (multi-turn conversation)
  // When false: Direct search mode (user query goes straight to leads API)
  chatAgentEnabled: import.meta.env.VITE_CHAT_AGENT_ENABLED === 'true',
  
  // Default search configuration
  defaultConfig: {
    enableEnrichment: true,
    enableSalesforceCheck: true,
    enrichmentProvider: 'apollo',
    maxLeads: 10,
  },
  
  // Default filters (can be overridden by chat agent responses)
  defaultFilters: {
    minLocations: 30,
    geography: 'US',
    industry: '',
  },
};

export default config;
