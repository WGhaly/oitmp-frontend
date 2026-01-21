// Base Types
export interface BaseEntity {
  id: string;
  creation_user_id: string;
  creation_timestamp: string;
}

// User and Entity Types
export interface User extends BaseEntity {
  name: string;
  title?: string;
  phone?: string;
  work_phone?: string;
  mobile?: string;
  email: string;
  work_email?: string;
  entity_id?: string;
  department?: string;
  sub_department_1?: string;
  sub_department_2?: string;
  sub_department_3?: string;
  sub_department_4?: string;
  affiliation_status?: string;
  joining_date?: string;
  leave_date?: string;
  username: string;
  password: string;
}

export interface Entity extends BaseEntity {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  type?: string;
  policies?: string[];
  parent_entity?: string;
  fund_id?: string;
}

// Research Entities
export interface ResearchArea extends BaseEntity {
  name: string;
  description: string;
}

export interface Research extends BaseEntity {
  title: string;
  detailed_description?: string;
  is_funded?: boolean;
  proposal_id?: string;
  start_date?: string;
  end_date?: string;
  amount?: string;
  status?: string;
  research_area_ids?: string[];
  research_team_pi_id?: string;
  research_team_ids?: string[];
  fund_id?: string;
}

export interface ResearchOutputs extends BaseEntity {
  research_id: string;
  name: string;
  submission_date: string;
  reports: string[];
  development_status?: string;
  applied_for_ip: boolean;
  potential_commercialization_form?: string;
  research_area_ids?: string[];
  lead_inventor_id?: string;
  inventors_ids?: string[];
  contribution_percentage?: Record<string, number>;
  contribution_description?: Record<string, string>;
  applicants_ids?: string[];
  applicants_percentage?: Record<string, number>;
}

// IP Entities
export interface InventionDisclosure extends BaseEntity {
  research_id: string;
  disclosure_date: string;
  title: string;
  short_description: string;
  long_description: string;
  previous_disclosures: string;
  development_status?: string;
  applied_for_ip: boolean;
  potential_clients?: string;
}

export interface PriorArtSearch extends BaseEntity {
  invention_disclosure_id: string;
  is_novel: boolean;
  prior_art_report: string;
}

export interface PatentUtility extends BaseEntity {
  type: string;
  prior_art_search_id?: string;
  patent_utility_id?: string;
  research_id?: string;
  title: string;
  status: string;
  publication_number: string;
  application_number: string;
  priority_number: string;
  publication_date: string;
  cpc?: string;
  ipc: string;
  abstract: string;
  description: string;
  claims: string;
  drawings?: string[];
  original_document?: string;
  inventors_ids?: string[];
  applicants_ids?: string[];
  applicants_percentage?: Record<string, number>;
}

export interface DesignRight extends BaseEntity {
  user_id: string;
  original_document: string[];
  prior_art_search_id?: string;
  patent_utility_id?: string;
  inventors_ids?: string[];
  applicants_ids?: string[];
  applicants_percentage?: Record<string, number>;
}

export interface KnowHow extends BaseEntity {
  user_id: string;
  original_document: string[];
  prior_art_search_id?: string;
  patent_utility_id?: string;
  inventors_ids?: string[];
  applicants_ids?: string[];
  applicants_percentage?: Record<string, number>;
}

export interface License extends BaseEntity {
  title: string;
  description?: string;
  patent_utility_id?: string;
  design_right_id?: string;
  know_how_id?: string;
  individual_licensor?: string;
  entity_licensor?: string;
  licensee: string;
  licensing_document: string;
  start_date?: string;
  end_date?: string;
  fees?: string;
}

// Assessment Entities
export interface TechAssessment extends BaseEntity {
  research_id?: string;
  prior_art_search_id?: string;
  patent_utility_id?: string;
  trl: number;
  trl_report: string;
}

export interface MarketAssessment extends BaseEntity {
  research_id?: string;
  prior_art_search_id?: string;
  patent_utility_id?: string;
  market_potential: boolean;
  potential_commercialization_type?: string;
  market_assessment_report: string;
}

// Supporting Entities
export interface Consultation extends BaseEntity {
  title: string;
  description?: string;
  patent_utility_id?: string;
  consultant: string;
  company?: string;
  research_id?: string;
  contract?: string[];
  start_date?: string;
  end_date?: string;
  fees?: string;
}

export interface Equipment extends BaseEntity {
  name?: string;
  description?: string;
  specifications?: string;
  research_id?: string;
  hosting_entity?: string[];
  price?: string;
  purchase_date?: string;
}

export interface Events extends BaseEntity {
  title: string;
  description?: string;
  research_id?: string;
  individual_organizer?: string;
  entity_organizer?: string;
  attendees?: string[];
  location?: string;
  timestamp?: string;
}

// Funding Entities
export interface FundType extends BaseEntity {
  name: string;
  description: string;
}

export interface Fund extends BaseEntity {
  name: string;
  description: string;
  fund_type_id: string;
  entity_id: string;
  amount?: string;
  terms: string;
  terms_files: string[];
  comments?: string;
}

export interface Proposal extends BaseEntity {
  fund_id: string;
  user_id?: string;
  entity_id?: string;
  proposal_files?: string[];
  status?: string;
  comments?: string;
  contract?: string[];
  amount?: string;
  start_date?: string;
  end_date?: string;
  research_area_ids?: string[];
  research_team_pi_id?: string;
  research_team_ids?: string[];
}

// Industry Collaboration
export interface IndustryChallenge extends BaseEntity {
  entity_ids: string[];
  title: string;
  description: Record<string, string>;
  industry_challenge_id?: string;
  fund_id?: string;
}

export interface ChallengeSolution extends BaseEntity {
  title: string;
  user_id?: string;
  entity_id?: string;
  industry_challenge_id: string;
  solution_description?: string;
  consultation_id?: string;
  associated_ip_ids?: string[];
  research_id?: string;
}

// Field Metadata for Dynamic Forms
export interface FieldMetadata {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect' | 'textarea' | 'file' | 'multifile' | 'foreignkey' | 'multiforeignkey';
  required: boolean;
  options?: string[];
  foreignEntity?: string;
  multiple?: boolean;
  placeholder?: string;
  description?: string;
}

export interface EntityMetadata {
  name: string;
  label: string;
  fields: FieldMetadata[];
  relationships: {
    parents: string[];
    children: string[];
  };
}

// Generic Entity Type
export type AnyEntity = 
  | User 
  | Entity 
  | Research 
  | ResearchArea 
  | ResearchOutputs 
  | InventionDisclosure 
  | PriorArtSearch 
  | PatentUtility 
  | DesignRight 
  | KnowHow 
  | License 
  | TechAssessment 
  | MarketAssessment 
  | Consultation 
  | Equipment 
  | Events 
  | FundType 
  | Fund 
  | Proposal 
  | IndustryChallenge 
  | ChallengeSolution;
