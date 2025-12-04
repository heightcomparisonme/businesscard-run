export enum CardTheme {
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC',
  MINIMALIST = 'MINIMALIST',
  CREATIVE = 'CREATIVE',
  TECH = 'TECH',
  ELEGANT = 'ELEGANT',
  BOLD = 'BOLD',
  GEOMETRIC = 'GEOMETRIC',
  HORIZON = 'HORIZON',
  MONOGRAM = 'MONOGRAM',
  NEON = 'NEON',
  GRID = 'GRID',
}

export interface CardData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  tagline: string;
  theme: CardTheme;
  primaryColor: string;
}

export interface AISuggestionResponse {
  tagline: string;
  jobTitleTweaked?: string;
  theme?: CardTheme;
  primaryColor?: string;
}

// Extend Window interface for html2canvas
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  }
}
