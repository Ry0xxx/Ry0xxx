export type Language = 'ja' | 'en';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  deliverables: string[];
  deliverablesEn: string[];
  technologies: string[];
  duration: string;
  durationEn: string;
  highlight: string;
  highlightEn: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  titleEn: string;
  client: string;
  category: 'fintech' | 'lifestyle' | 'mobility' | 'saas';
  categoryLabel: string;
  categoryLabelEn: string;
  year: string;
  image: string;
  summary: string;
  summaryEn: string;
  metrics: {
    label: string;
    labelEn: string;
    value: string;
  }[];
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  results: string[];
  resultsEn: string[];
  techStack: string[];
}

export interface EstimateOptions {
  projectType: string;
  scale: string;
  options: string[];
}

export interface EstimateResult {
  minPrice: number;
  maxPrice: number;
  minWeeks: number;
  maxWeeks: number;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  simulatorDetails?: string;
}
