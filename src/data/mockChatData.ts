import { LeadResult, ChatSession, FrequentPrompt } from "@/types/chat";

// Mock lead results data
export const mockLeadResults: LeadResult[] = [
  {
    id: "lead-001",
    companyName: "Five Guys Burgers & Fries",
    location: "Austin, TX",
    address: "1234 Congress Ave, Austin, TX 78701",
    employeeCount: 45,
    industry: "Quick Service Restaurant",
    revenue: "$2.5M",
    website: "www.fiveguys.com",
    description: "Premium burger chain known for fresh ingredients and customizable options. High-volume location with 24/7 operations requiring consistent facility maintenance.",
    contact: {
      name: "Sarah Mitchell",
      title: "Regional Operations Manager",
      email: "s.mitchell@fiveguys.com",
      phone: "(512) 555-0142",
      linkedIn: "linkedin.com/in/sarahmitchell"
    },
    salesforceStatus: "new",
    matchScore: 95
  },
  {
    id: "lead-002",
    companyName: "Shake Shack",
    location: "Houston, TX",
    address: "5678 Westheimer Rd, Houston, TX 77056",
    employeeCount: 38,
    industry: "Quick Service Restaurant",
    revenue: "$3.1M",
    website: "www.shakeshack.com",
    description: "Modern roadside burger stand serving premium burgers and frozen custard. Expanding rapidly with new locations planned.",
    contact: {
      name: "Michael Chen",
      title: "Facilities Director",
      email: "m.chen@shakeshack.com",
      phone: "(713) 555-0198",
      linkedIn: "linkedin.com/in/michaelchen"
    },
    salesforceStatus: "qualified",
    matchScore: 89
  },
  {
    id: "lead-003",
    companyName: "Whataburger",
    location: "San Antonio, TX",
    address: "9012 Broadway St, San Antonio, TX 78215",
    employeeCount: 52,
    industry: "Quick Service Restaurant",
    revenue: "$4.2M",
    website: "www.whataburger.com",
    description: "Iconic Texas burger chain with 24-hour operations. Multiple locations requiring comprehensive facility management services.",
    contact: {
      name: "Jennifer Rodriguez",
      title: "VP of Operations",
      email: "j.rodriguez@whataburger.com",
      phone: "(210) 555-0167",
      linkedIn: "linkedin.com/in/jenniferrodriguez"
    },
    salesforceStatus: "new",
    matchScore: 92
  },
  {
    id: "lead-004",
    companyName: "In-N-Out Burger",
    location: "Dallas, TX",
    address: "3456 McKinney Ave, Dallas, TX 75204",
    employeeCount: 41,
    industry: "Quick Service Restaurant",
    revenue: "$3.8M",
    website: "www.in-n-out.com",
    description: "West Coast burger chain with cult following. Known for cleanliness standards and quality focus, requiring top-tier facility services.",
    contact: {
      name: "David Park",
      title: "Regional Facilities Manager",
      email: "d.park@innout.com",
      phone: "(214) 555-0123",
      linkedIn: "linkedin.com/in/davidpark"
    },
    salesforceStatus: "existing",
    matchScore: 78
  },
  {
    id: "lead-005",
    companyName: "Hopdoddy Burger Bar",
    location: "Austin, TX",
    address: "7890 South Lamar Blvd, Austin, TX 78704",
    employeeCount: 35,
    industry: "Casual Dining",
    revenue: "$2.1M",
    website: "www.hopdoddy.com",
    description: "Craft burger restaurant with artisanal approach. Growing brand with expansion plans requiring scalable facility solutions.",
    contact: {
      name: "Amanda Foster",
      title: "Operations Director",
      email: "a.foster@hopdoddy.com",
      phone: "(512) 555-0189",
      linkedIn: "linkedin.com/in/amandafoster"
    },
    salesforceStatus: "new",
    matchScore: 85
  }
];

// Mock chat sessions for sidebar
export const mockChatSessions: ChatSession[] = [
  {
    id: "chat-uuid-a1b2c3d4",
    title: "Top 5 Burger Stations TX",
    createdAt: new Date("2026-01-29T10:30:00"),
    updatedAt: new Date("2026-01-29T10:45:00"),
    messages: []
  },
  {
    id: "chat-uuid-e5f6g7h8",
    title: "Coffee Shops in California",
    createdAt: new Date("2026-01-28T14:20:00"),
    updatedAt: new Date("2026-01-28T14:35:00"),
    messages: []
  },
  {
    id: "chat-uuid-i9j0k1l2",
    title: "Fitness Centers Northeast",
    createdAt: new Date("2026-01-27T09:15:00"),
    updatedAt: new Date("2026-01-27T09:30:00"),
    messages: []
  },
  {
    id: "chat-uuid-m3n4o5p6",
    title: "Hotels in Miami Area",
    createdAt: new Date("2026-01-26T16:00:00"),
    updatedAt: new Date("2026-01-26T16:20:00"),
    messages: []
  }
];

// Frequently used prompts
export const frequentPrompts: FrequentPrompt[] = [
  {
    id: "fp-001",
    label: "Top Burger Chains",
    prompt: "Find top 5 burger restaurant chains in Texas with 30+ employees",
    icon: "🍔"
  },
  {
    id: "fp-002",
    label: "Coffee Shop Leads",
    prompt: "Get top 5 coffee shop franchises in California needing facility management",
    icon: "☕"
  },
  {
    id: "fp-003",
    label: "Fitness Centers",
    prompt: "Find top 5 fitness center chains in the Northeast region",
    icon: "💪"
  },
  {
    id: "fp-004",
    label: "Hotel Chains",
    prompt: "List top 5 hotel chains in Florida with facility management needs",
    icon: "🏨"
  },
  {
    id: "fp-005",
    label: "Retail Stores",
    prompt: "Find top 5 retail store chains expanding in the Midwest",
    icon: "🏪"
  },
  {
    id: "fp-006",
    label: "Healthcare Facilities",
    prompt: "Get top 5 healthcare facilities in New York requiring maintenance services",
    icon: "🏥"
  }
];

// Motivational quotes for the UI
export const motivationalQuotes = [
  "Every lead is a story waiting to be discovered. What's yours today?",
  "The best leads aren't found, they're uncovered. Let's dig in!",
  "Your next big deal is just one search away. Ready to find it?",
  "Great relationships start with great leads. What are you building today?",
  "Turn prospects into partners. What industry shall we explore?",
  "Success leaves clues. Let's find your next opportunity!"
];

// Simulate API delay and return mock results
export const mockSearchLeads = async (query: string): Promise<LeadResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock results (in real app, this would call your backend)
  return mockLeadResults;
};

// Generate a random UUID for new chats
export const generateChatId = (): string => {
  return `chat-uuid-${Math.random().toString(36).substring(2, 10)}`;
};
