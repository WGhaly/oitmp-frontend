import type { EntityMetadata, AnyEntity } from "./types";

// Entity Metadata Definitions
export const entityMetadata: Record<string, EntityMetadata> = {
  user: {
    name: "user",
    label: "Users",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: false },
      { name: "phone", label: "Phone", type: "text", required: false },
      { name: "work_phone", label: "Work Phone", type: "text", required: false },
      { name: "mobile", label: "Mobile", type: "text", required: false },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "work_email", label: "Work Email", type: "email", required: false },
      { name: "entity_id", label: "Entity", type: "foreignkey", required: false, foreignEntity: "entity" },
      { name: "department", label: "Department", type: "text", required: false },
      { name: "sub_department_1", label: "Sub Department 1", type: "text", required: false },
      { name: "sub_department_2", label: "Sub Department 2", type: "text", required: false },
      { name: "sub_department_3", label: "Sub Department 3", type: "text", required: false },
      { name: "sub_department_4", label: "Sub Department 4", type: "text", required: false },
      { name: "affiliation_status", label: "Affiliation Status", type: "select", required: false, options: ["Active", "On Leave", "Retired"] },
      { name: "joining_date", label: "Joining Date", type: "date", required: false },
      { name: "leave_date", label: "Leave Date", type: "date", required: false },
      { name: "username", label: "Username", type: "text", required: true },
    ],
    relationships: {
      parents: ["entity"],
      children: ["research", "proposal", "consultation"],
    },
  },
  entity: {
    name: "entity",
    label: "Entities",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: false },
      { name: "phone", label: "Phone", type: "text", required: false },
      { name: "email", label: "Email", type: "email", required: false },
      { name: "type", label: "Type", type: "select", required: false, options: ["University", "Research Institute", "Company", "Government", "NGO", "Startup"] },
      { name: "policies", label: "Policies", type: "multifile", required: false },
      { name: "parent_entity", label: "Parent Entity", type: "foreignkey", required: false, foreignEntity: "entity" },
    ],
    relationships: {
      parents: [],
      children: ["user", "fund", "industry-challenge"],
    },
  },
  "research-area": {
    name: "research-area",
    label: "Research Areas",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
    relationships: {
      parents: [],
      children: ["research", "research-outputs"],
    },
  },
  research: {
    name: "research",
    label: "Research",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "detailed_description", label: "Detailed Description", type: "textarea", required: false },
      { name: "is_funded", label: "Is Funded", type: "boolean", required: false },
      { name: "proposal_id", label: "Proposal", type: "foreignkey", required: false, foreignEntity: "proposal" },
      { name: "start_date", label: "Start Date", type: "date", required: false },
      { name: "end_date", label: "End Date", type: "date", required: false },
      { name: "amount", label: "Amount", type: "number", required: false },
      { name: "status", label: "Status", type: "select", required: false, options: ["Active", "Completed", "On Hold", "Cancelled"] },
      { name: "research_area_ids", label: "Research Areas", type: "multiforeignkey", required: false, foreignEntity: "research-area" },
      { name: "research_team_pi_id", label: "Principal Investigator", type: "foreignkey", required: false, foreignEntity: "user" },
      { name: "research_team_ids", label: "Research Team", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "fund_id", label: "Fund", type: "foreignkey", required: false, foreignEntity: "fund" },
    ],
    relationships: {
      parents: ["proposal", "fund", "research-area", "user"],
      children: ["research-outputs", "invention-disclosure", "tech-assessment", "market-assessment", "equipment", "events", "consultation"],
    },
  },
  "research-outputs": {
    name: "research-outputs",
    label: "Research Outputs",
    fields: [
      { name: "research_id", label: "Research", type: "foreignkey", required: true, foreignEntity: "research" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "submission_date", label: "Submission Date", type: "date", required: true },
      { name: "reports", label: "Reports", type: "multifile", required: true },
      { name: "development_status", label: "Development Status", type: "select", required: false, options: ["Concept", "Prototype", "Testing", "Production", "Market Ready"] },
      { name: "applied_for_ip", label: "Applied for IP", type: "boolean", required: true },
      { name: "potential_commercialization_form", label: "Potential Commercialization Form", type: "select", required: false, options: ["Licensing", "Startup", "Joint Venture", "Technology Transfer", "Consultancy"] },
      { name: "research_area_ids", label: "Research Areas", type: "multiforeignkey", required: false, foreignEntity: "research-area" },
      { name: "lead_inventor_id", label: "Lead Inventor", type: "foreignkey", required: false, foreignEntity: "user" },
      { name: "inventors_ids", label: "Inventors", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "applicants_ids", label: "Applicants", type: "multiforeignkey", required: false, foreignEntity: "user" },
    ],
    relationships: {
      parents: ["research", "user", "research-area"],
      children: ["invention-disclosure"],
    },
  },
  "invention-disclosure": {
    name: "invention-disclosure",
    label: "Invention Disclosures",
    fields: [
      { name: "research_id", label: "Research", type: "foreignkey", required: true, foreignEntity: "research" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "disclosure_date", label: "Disclosure Date", type: "date", required: true },
      { name: "short_description", label: "Short Description", type: "text", required: true },
      { name: "long_description", label: "Long Description", type: "textarea", required: true },
      { name: "previous_disclosures", label: "Previous Disclosures", type: "textarea", required: true },
      { name: "applied_for_ip", label: "Applied for IP", type: "boolean", required: true },
    ],
    relationships: {
      parents: ["research"],
      children: ["prior-art-search"],
    },
  },
  "prior-art-search": {
    name: "prior-art-search",
    label: "Prior Art Searches",
    fields: [
      { name: "invention_disclosure_id", label: "Invention Disclosure", type: "foreignkey", required: true, foreignEntity: "invention-disclosure" },
      { name: "is_novel", label: "Is Novel", type: "boolean", required: true },
    ],
    relationships: {
      parents: ["invention-disclosure"],
      children: ["patent-utility", "design-right", "know-how", "tech-assessment", "market-assessment"],
    },
  },
  "patent-utility": {
    name: "patent-utility",
    label: "Patent Utilities",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "type", label: "Type", type: "select", required: true, options: ["Utility", "Provisional", "PCT"] },
      { name: "status", label: "Status", type: "select", required: true, options: ["Filed", "Published", "Granted", "Rejected", "Abandoned"] },
      { name: "publication_number", label: "Publication Number", type: "text", required: true },
      { name: "application_number", label: "Application Number", type: "text", required: true },
      { name: "priority_number", label: "Priority Number", type: "text", required: true },
      { name: "publication_date", label: "Publication Date", type: "date", required: true },
      { name: "abstract", label: "Abstract", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "claims", label: "Claims", type: "textarea", required: true },
      { name: "inventors_ids", label: "Inventors", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "applicants_ids", label: "Applicants", type: "multiforeignkey", required: false, foreignEntity: "user" },
    ],
    relationships: {
      parents: ["prior-art-search", "research"],
      children: ["license", "consultation", "design-right", "know-how"],
    },
  },
  "design-right": {
    name: "design-right",
    label: "Design Rights",
    fields: [
      { name: "user_id", label: "User", type: "foreignkey", required: true, foreignEntity: "user" },
      { name: "prior_art_search_id", label: "Prior Art Search", type: "foreignkey", required: false, foreignEntity: "prior-art-search" },
      { name: "inventors_ids", label: "Inventors", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "applicants_ids", label: "Applicants", type: "multiforeignkey", required: false, foreignEntity: "user" },
    ],
    relationships: {
      parents: ["prior-art-search", "patent-utility", "user"],
      children: ["license"],
    },
  },
  "know-how": {
    name: "know-how",
    label: "Know-How",
    fields: [
      { name: "user_id", label: "User", type: "foreignkey", required: true, foreignEntity: "user" },
      { name: "prior_art_search_id", label: "Prior Art Search", type: "foreignkey", required: false, foreignEntity: "prior-art-search" },
      { name: "inventors_ids", label: "Inventors", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "applicants_ids", label: "Applicants", type: "multiforeignkey", required: false, foreignEntity: "user" },
    ],
    relationships: {
      parents: ["prior-art-search", "patent-utility", "user"],
      children: ["license"],
    },
  },
  license: {
    name: "license",
    label: "Licenses",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "patent_utility_id", label: "Patent Utility", type: "foreignkey", required: false, foreignEntity: "patent-utility" },
      { name: "licensee", label: "Licensee", type: "foreignkey", required: true, foreignEntity: "entity" },
      { name: "start_date", label: "Start Date", type: "date", required: false },
      { name: "end_date", label: "End Date", type: "date", required: false },
      { name: "fees", label: "Fees", type: "text", required: false },
    ],
    relationships: {
      parents: ["patent-utility", "design-right", "know-how", "entity"],
      children: [],
    },
  },
  "tech-assessment": {
    name: "tech-assessment",
    label: "Tech Assessments",
    fields: [
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
      { name: "trl", label: "TRL", type: "number", required: true },
    ],
    relationships: {
      parents: ["research", "prior-art-search", "patent-utility"],
      children: [],
    },
  },
  "market-assessment": {
    name: "market-assessment",
    label: "Market Assessments",
    fields: [
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
      { name: "market_potential", label: "Market Potential", type: "boolean", required: true },
      { name: "potential_commercialization_type", label: "Commercialization Type", type: "select", required: false, options: ["Licensing", "Startup", "Joint Venture", "Direct Sales"] },
    ],
    relationships: {
      parents: ["research", "prior-art-search", "patent-utility"],
      children: [],
    },
  },
  consultation: {
    name: "consultation",
    label: "Consultations",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "consultant", label: "Consultant", type: "foreignkey", required: true, foreignEntity: "user" },
      { name: "company", label: "Company", type: "foreignkey", required: false, foreignEntity: "entity" },
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
      { name: "start_date", label: "Start Date", type: "date", required: false },
      { name: "end_date", label: "End Date", type: "date", required: false },
      { name: "fees", label: "Fees", type: "text", required: false },
    ],
    relationships: {
      parents: ["user", "entity", "research", "patent-utility"],
      children: [],
    },
  },
  equipment: {
    name: "equipment",
    label: "Equipment",
    fields: [
      { name: "name", label: "Name", type: "text", required: false },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "specifications", label: "Specifications", type: "textarea", required: false },
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
      { name: "hosting_entity", label: "Hosting Entities", type: "multiforeignkey", required: false, foreignEntity: "entity" },
      { name: "price", label: "Price", type: "text", required: false },
      { name: "purchase_date", label: "Purchase Date", type: "date", required: false },
    ],
    relationships: {
      parents: ["research", "entity"],
      children: [],
    },
  },
  events: {
    name: "events",
    label: "Events",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
      { name: "individual_organizer", label: "Individual Organizer", type: "foreignkey", required: false, foreignEntity: "user" },
      { name: "entity_organizer", label: "Entity Organizer", type: "foreignkey", required: false, foreignEntity: "entity" },
      { name: "attendees", label: "Attendees", type: "multiforeignkey", required: false, foreignEntity: "user" },
      { name: "location", label: "Location", type: "text", required: false },
      { name: "timestamp", label: "Date & Time", type: "date", required: false },
    ],
    relationships: {
      parents: ["research", "user", "entity"],
      children: [],
    },
  },
  "fund-type": {
    name: "fund-type",
    label: "Fund Types",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
    relationships: {
      parents: [],
      children: ["fund"],
    },
  },
  fund: {
    name: "fund",
    label: "Funds",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "fund_type_id", label: "Fund Type", type: "foreignkey", required: true, foreignEntity: "fund-type" },
      { name: "entity_id", label: "Entity", type: "foreignkey", required: true, foreignEntity: "entity" },
      { name: "amount", label: "Amount", type: "text", required: false },
      { name: "terms", label: "Terms", type: "textarea", required: true },
    ],
    relationships: {
      parents: ["fund-type", "entity"],
      children: ["proposal", "research"],
    },
  },
  proposal: {
    name: "proposal",
    label: "Proposals",
    fields: [
      { name: "fund_id", label: "Fund", type: "foreignkey", required: true, foreignEntity: "fund" },
      { name: "user_id", label: "User", type: "foreignkey", required: false, foreignEntity: "user" },
      { name: "entity_id", label: "Entity", type: "foreignkey", required: false, foreignEntity: "entity" },
      { name: "status", label: "Status", type: "select", required: false, options: ["Draft", "Submitted", "Under Review", "Approved", "Rejected"] },
      { name: "amount", label: "Amount", type: "text", required: false },
      { name: "start_date", label: "Start Date", type: "date", required: false },
      { name: "end_date", label: "End Date", type: "date", required: false },
    ],
    relationships: {
      parents: ["fund", "user", "entity"],
      children: ["research"],
    },
  },
  "industry-challenge": {
    name: "industry-challenge",
    label: "Industry Challenges",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "entity_ids", label: "Entities", type: "multiforeignkey", required: true, foreignEntity: "entity" },
    ],
    relationships: {
      parents: ["entity"],
      children: ["challenge-solution"],
    },
  },
  "challenge-solution": {
    name: "challenge-solution",
    label: "Challenge Solutions",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "industry_challenge_id", label: "Industry Challenge", type: "foreignkey", required: true, foreignEntity: "industry-challenge" },
      { name: "user_id", label: "Solution Provider (User)", type: "foreignkey", required: false, foreignEntity: "user" },
      { name: "entity_id", label: "Solution Provider (Entity)", type: "foreignkey", required: false, foreignEntity: "entity" },
      { name: "solution_description", label: "Solution Description", type: "textarea", required: false },
      { name: "consultation_id", label: "Consultation", type: "foreignkey", required: false, foreignEntity: "consultation" },
      { name: "research_id", label: "Research", type: "foreignkey", required: false, foreignEntity: "research" },
    ],
    relationships: {
      parents: ["industry-challenge", "user", "entity", "consultation", "research"],
      children: [],
    },
  },
};

// Mock Data Generator
function generateMockData(): Record<string, AnyEntity[]> {
  return {
    user: [
      {
        id: "u1",
        name: "Dr. Sarah Johnson",
        title: "Senior Research Scientist",
        email: "sarah.johnson@university.edu",
        phone: "+1-555-0101",
        entity_id: "e1",
        department: "Engineering",
        affiliation_status: "Active",
        username: "sjohnson",
        password: "hashed_password",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-15T10:00:00Z",
      },
      {
        id: "u2",
        name: "Prof. Michael Chen",
        title: "Professor",
        email: "m.chen@university.edu",
        phone: "+1-555-0102",
        entity_id: "e1",
        department: "Computer Science",
        affiliation_status: "Active",
        username: "mchen",
        password: "hashed_password",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-16T10:00:00Z",
      },
      {
        id: "u3",
        name: "Dr. Emily Rodriguez",
        title: "Research Associate",
        email: "e.rodriguez@university.edu",
        phone: "+1-555-0103",
        entity_id: "e1",
        department: "Biotechnology",
        affiliation_status: "Active",
        username: "erodriguez",
        password: "hashed_password",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-17T10:00:00Z",
      },
    ],
    entity: [
      {
        id: "e1",
        name: "Innovation University",
        address: "123 Research Park, Tech City, TC 12345",
        phone: "+1-555-1000",
        email: "info@innovationuni.edu",
        type: "University",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-01T10:00:00Z",
      },
      {
        id: "e2",
        name: "TechCorp Industries",
        address: "456 Innovation Drive, Silicon Valley, CA 94025",
        phone: "+1-555-2000",
        email: "contact@techcorp.com",
        type: "Company",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-02T10:00:00Z",
      },
      {
        id: "e3",
        name: "National Research Institute",
        address: "789 Science Boulevard, Research City, RC 54321",
        phone: "+1-555-3000",
        email: "info@nri.gov",
        type: "Research Institute",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-03T10:00:00Z",
      },
    ],
    "research-area": [
      {
        id: "ra1",
        name: "Artificial Intelligence",
        description: "Research in machine learning, deep learning, and AI applications",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-01T10:00:00Z",
      },
      {
        id: "ra2",
        name: "Biotechnology",
        description: "Research in genetic engineering, bioprocessing, and medical applications",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-02T10:00:00Z",
      },
      {
        id: "ra3",
        name: "Renewable Energy",
        description: "Research in solar, wind, and sustainable energy technologies",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-03T10:00:00Z",
      },
    ],
    research: [
      {
        id: "r1",
        title: "Advanced Machine Learning for Medical Diagnostics",
        detailed_description: "Developing AI algorithms for early disease detection using medical imaging",
        is_funded: true,
        status: "Active",
        start_date: "2024-01-01",
        end_date: "2025-12-31",
        research_team_pi_id: "u1",
        research_team_ids: ["u1", "u2"],
        research_area_ids: ["ra1"],
        creation_user_id: "u1",
        creation_timestamp: "2024-01-10T10:00:00Z",
      },
      {
        id: "r2",
        title: "Sustainable Energy Storage Solutions",
        detailed_description: "Novel battery technologies for renewable energy applications",
        is_funded: true,
        status: "Active",
        start_date: "2024-02-01",
        end_date: "2026-01-31",
        research_team_pi_id: "u2",
        research_team_ids: ["u2", "u3"],
        research_area_ids: ["ra3"],
        creation_user_id: "u2",
        creation_timestamp: "2024-02-01T10:00:00Z",
      },
    ],
    "research-outputs": [
      {
        id: "ro1",
        research_id: "r1",
        name: "AI Diagnostic Algorithm v1.0",
        submission_date: "2024-06-15",
        reports: ["report1.pdf"],
        development_status: "Testing",
        applied_for_ip: true,
        lead_inventor_id: "u1",
        inventors_ids: ["u1", "u2"],
        creation_user_id: "u1",
        creation_timestamp: "2024-06-15T10:00:00Z",
      },
    ],
    "invention-disclosure": [
      {
        id: "id1",
        research_id: "r1",
        title: "Novel AI-based Medical Diagnostic System",
        disclosure_date: "2024-06-20",
        short_description: "AI system for automated disease detection",
        long_description: "A comprehensive AI-based system that uses deep learning to analyze medical images and provide diagnostic recommendations with high accuracy.",
        previous_disclosures: "None",
        applied_for_ip: true,
        creation_user_id: "u1",
        creation_timestamp: "2024-06-20T10:00:00Z",
      },
    ],
    "prior-art-search": [
      {
        id: "pas1",
        invention_disclosure_id: "id1",
        is_novel: true,
        prior_art_report: "pas_report1.pdf",
        creation_user_id: "u1",
        creation_timestamp: "2024-07-01T10:00:00Z",
      },
    ],
    "patent-utility": [
      {
        id: "pu1",
        title: "AI-based Medical Diagnostic System",
        type: "Utility",
        status: "Filed",
        publication_number: "US20240123456",
        application_number: "US2024/001234",
        priority_number: "US63/001234",
        publication_date: "2024-08-15",
        abstract: "A method and system for automated medical diagnostics using artificial intelligence",
        description: "Detailed technical description of the AI diagnostic system",
        claims: "1. A method comprising... 2. The system of claim 1...",
        inventors_ids: ["u1", "u2"],
        applicants_ids: ["u1"],
        creation_user_id: "u1",
        creation_timestamp: "2024-07-15T10:00:00Z",
      },
    ],
    "design-right": [],
    "know-how": [],
    license: [],
    "tech-assessment": [
      {
        id: "ta1",
        research_id: "r1",
        trl: 6,
        trl_report: "trl_report1.pdf",
        creation_user_id: "u1",
        creation_timestamp: "2024-05-01T10:00:00Z",
      },
    ],
    "market-assessment": [
      {
        id: "ma1",
        research_id: "r1",
        market_potential: true,
        potential_commercialization_type: "Licensing",
        market_assessment_report: "market_report1.pdf",
        creation_user_id: "u1",
        creation_timestamp: "2024-05-15T10:00:00Z",
      },
    ],
    consultation: [],
    equipment: [],
    events: [],
    "fund-type": [
      {
        id: "ft1",
        name: "Public Research Fund",
        description: "Government-funded research grants for basic and applied research",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-01T10:00:00Z",
      },
      {
        id: "ft2",
        name: "Corporate Innovation Fund",
        description: "Private sector funding for industry-relevant research",
        creation_user_id: "u1",
        creation_timestamp: "2024-01-02T10:00:00Z",
      },
    ],
    fund: [
      {
        id: "f1",
        name: "AI Research Grant 2024",
        description: "Funding for artificial intelligence research projects",
        fund_type_id: "ft1",
        entity_id: "e3",
        amount: "$500,000",
        terms: "2-year grant with annual reporting requirements",
        terms_files: ["terms1.pdf"],
        creation_user_id: "u1",
        creation_timestamp: "2024-01-15T10:00:00Z",
      },
    ],
    proposal: [
      {
        id: "p1",
        fund_id: "f1",
        user_id: "u1",
        entity_id: "e1",
        status: "Approved",
        amount: "$450,000",
        start_date: "2024-01-01",
        end_date: "2025-12-31",
        creation_user_id: "u1",
        creation_timestamp: "2023-12-01T10:00:00Z",
      },
    ],
    "industry-challenge": [
      {
        id: "ic1",
        title: "Improving Manufacturing Efficiency",
        entity_ids: ["e2"],
        description: { e2: "Need for automated quality control systems" },
        creation_user_id: "u1",
        creation_timestamp: "2024-03-01T10:00:00Z",
      },
    ],
    "challenge-solution": [],
  };
}

export const mockData = generateMockData();

// Helper function to get entity data
export function getEntityData(entityName: string): AnyEntity[] {
  return mockData[entityName] || [];
}

// Helper function to find dependencies
export function findDependencies(entityName: string, id: string): Array<{
  entityName: string;
  fieldName: string;
  records: Array<{ id: string; name?: string }>;
}> {
  const dependencies: Array<{
    entityName: string;
    fieldName: string;
    records: Array<{ id: string; name?: string }>;
  }> = [];
  const metadata = entityMetadata[entityName];
  
  if (!metadata) return dependencies;

  // Check all entities for references to this entity
  Object.keys(entityMetadata).forEach((otherEntity) => {
    const otherData = mockData[otherEntity] || [];
    const otherMetadata = entityMetadata[otherEntity];
    
    otherData.forEach((record: any) => {
      Object.entries(record).forEach(([fieldName, value]) => {
        let hasReference = false;
        
        if (Array.isArray(value)) {
          hasReference = value.includes(id);
        } else {
          hasReference = value === id;
        }
        
        if (hasReference && fieldName !== 'id') {
          // Find or create dependency group for this entity/field combination
          let depGroup = dependencies.find(
            d => d.entityName === otherEntity && d.fieldName === fieldName
          );
          
          if (!depGroup) {
            depGroup = {
              entityName: otherEntity,
              fieldName,
              records: [],
            };
            dependencies.push(depGroup);
          }
          
          // Add record to this dependency group if not already present
          if (!depGroup.records.find(r => r.id === record.id)) {
            depGroup.records.push({
              id: record.id,
              name: record.name || record.title || record.id,
            });
          }
        }
      });
    });
  });

  return dependencies;
}
