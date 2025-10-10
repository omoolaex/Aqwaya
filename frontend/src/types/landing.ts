export interface LandingPage {
  id: string | number;
  name: string;
  createdDate: string;
  status: "Draft" | "Published";
  visits: number;
  conversions: number;
  conversionRate: string;

  // Extra fields for builder
  businessName: string;
  industry: string;
  goal: string;
  targetAudience: string;
  valueProposition: string;
  template: string;
  colorScheme: string;
  aiContent: AIContent | null;
}
export interface LandingPageFormData {
  id?: string;
  pageName: string;
  pageId?: string;
  industry: string;
  businessName: string;
  targetAudience: string;
  valueProposition: string;
  colorScheme?: string;
  template: string;
  goal?: string;
  [key: string]: unknown;
}

export interface Template {
  id: string;
  name: string;
  description: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
}

interface FormField {
  label: string;
  type: "text" | "email" | "tel" | string;
  required: boolean;
}

export interface AIContent {
  headline: string;
  subheadline: string;
  features: string[];
  ctaButton: string;
  testimonial: string;
  formHeadline: string;
  formFields: FormField[];
}