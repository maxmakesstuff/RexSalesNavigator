export interface Contact {
  position: string;
  first_name: string;
  last_name: string;
  mobile: string;
  phone: string;
  email: string;
  mail_consent: boolean;
  phone_consent: boolean;
  notes: string;
}

export interface Company {
  company: string;
  source_sheet?: string;
  industry: string;
  contacts: Contact[];
  notes: string[];
  score?: number;
  tier?: string;
  score_breakdown?: {
    industry: number;
    brand: number;
    relationship: number;
    readiness: number;
    geo: number;
  };
  matched_brand_pattern?: string | null;
  suggested_hook?: string;
}

export interface AgentTask {
  name?: string;
  title: string;
  prompt: string;
  context?: string;
  createdAt?: string;
  type?: 'research' | 'draft_email' | 'analysis' | 'other';
}

export interface AgentResult {
  name: string;
  mtime: string;
  content: string;
}

export interface Note {
  id?: string;
  createdAt?: string;
  account?: string;
  body: string;
  tags?: string[];
}
