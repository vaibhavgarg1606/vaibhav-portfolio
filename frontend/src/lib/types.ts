export type SkillDomain = {
  id: number;
  name: string;
  slug: string;
  skills: string[];
  order: number;
};

export type Experience = {
  id: number;
  year_label: string;
  commit_type: string;
  title: string;
  organization: string;
  summary: string;
  details: string;
  technologies: string[];
  order: number;
};

export type TimelineMilestone = {
  id: number;
  year: string;
  title: string;
  summary: string;
  order: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  category_label: string;
  tech_stack: string[];
  image_url: string;
  github_url: string;
  demo_url: string;
  case_study_url: string;
  featured: boolean;
  order: number;
};

export type ExplorationArea = {
  id: number;
  name: string;
  connections: string[];
  order: number;
};

export type BuildQueueItem = {
  id: number;
  title: string;
  done: boolean;
  order: number;
};

export type SiteMetric = {
  id: number;
  total_projects: number;
  repositories: number;
  technologies_used: number;
  contributions: number;
};

export type PortfolioSnapshot = {
  skills: SkillDomain[];
  experiences: Experience[];
  timeline: TimelineMilestone[];
  projects: Project[];
  exploration: ExplorationArea[];
  build_queue: BuildQueueItem[];
  certifications: unknown[];
  metrics: SiteMetric[];
};

export type GithubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
};
