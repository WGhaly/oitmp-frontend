export const BRAND_COLORS = {
  navy: "#10112f",
  blue: "#243996",
  lightBlue: "#4a81f6",
  white: "#ffffff",
  black: "#161616",
} as const;

export const ENTITY_NAMES = [
  "research",
  "research-area",
  "research-outputs",
  "invention-disclosure",
  "prior-art-search",
  "patent-utility",
  "design-right",
  "know-how",
  "license",
  "tech-assessment",
  "market-assessment",
  "consultation",
  "equipment",
  "events",
  "fund-type",
  "fund",
  "proposal",
  "industry-challenge",
  "challenge-solution",
  "user",
  "entity",
] as const;

export const ENTITY_LABELS: Record<string, string> = {
  "research": "Research",
  "research-area": "Research Areas",
  "research-outputs": "Research Outputs",
  "invention-disclosure": "Invention Disclosures",
  "prior-art-search": "Prior Art Searches",
  "patent-utility": "Patent Utilities",
  "design-right": "Design Rights",
  "know-how": "Know-How",
  "license": "Licenses",
  "tech-assessment": "Tech Assessments",
  "market-assessment": "Market Assessments",
  "consultation": "Consultations",
  "equipment": "Equipment",
  "events": "Events",
  "fund-type": "Fund Types",
  "fund": "Funds",
  "proposal": "Proposals",
  "industry-challenge": "Industry Challenges",
  "challenge-solution": "Challenge Solutions",
  "user": "Users",
  "entity": "Entities",
};

export const STATUS_OPTIONS = ["Active", "Inactive", "In Progress", "Completed", "Pending"] as const;
export const AFFILIATION_STATUS_OPTIONS = ["Active", "On Leave", "Retired", "Terminated"] as const;
export const DEVELOPMENT_STATUS_OPTIONS = ["Concept", "Prototype", "Testing", "Production", "Commercialized"] as const;
