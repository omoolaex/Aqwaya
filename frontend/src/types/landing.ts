export interface LandingPage {
  id: number;
  name: string;
  createdDate: string;
  status: "Draft" | "Published";
  visits: number;
  conversions: number;
  conversionRate: string;
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
