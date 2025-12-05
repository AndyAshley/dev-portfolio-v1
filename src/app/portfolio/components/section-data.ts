import { StaticImageData } from "next/image";

// images
import PortfolioSite from "@assets/portfolio/portfolio-2025v2.png";
import DislinkedSite from "@assets/portfolio/dislinked.png"
import FrazerDMS from "@assets/portfolio/frazer-dms.png";
import FrazerPortal from "@assets/portfolio/frazer-portal.png";
import ReviewParser from "@assets/portfolio/review-parser.png";

export type Project = {
  title: string;
  description: string;
  image: StaticImageData | string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: "Web Apps" | "Utility Apps" | "Backend";
};

/**
 * Array of project data to be displayed on the Portfolio page.
 */
export const projectData: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website showcasing my projects, skills, and experience as a software engineer.",
    image: PortfolioSite,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "/",
    githubUrl: "https://github.com/AndyAshley/dev-portfolio-v1",
    category: "Web Apps",
  },
{
  title: "disLINKED",
  description:
    "A satirical tech-themed web app parodying corporate culture. Features include PostLibs (Mad Lib-style LinkedIn posts), randomized sarcastic quotes, dark/light mode persistence, and an authentically unprofessional aesthetic.",
  image: DislinkedSite,
  technologies: ["Next.js", "TypeScript", "Tailwind CSS v4", "Supabase"],
  liveUrl: "https://www.dislinked.dev",
  githubUrl: "",
  category: "Web Apps",
},

  {
    title: "Frazer DMS Website",
    description:
      "Public-facing marketing site for Frazer, a dealership management software company. Built from the ground up with a focus on responsive design, clean code, and lead-generation strategy. Features include custom forms, SEO optimization, and integrated third-party services for support and analytics.",
    image: FrazerDMS, 
    technologies: ["Next.js", "Bootstrap 5", "Responsive Design", "Custom Forms", "API Handlers"],
    liveUrl: "https://www.frazer.com",
    githubUrl: "",
    category: "Web Apps",
  },
  {
    title: "Frazer Customer Portal",
    description:
      "A full-featured customer account dashboard for Frazer dealership clients, built from the ground up as a secure React SPA. Customers can manage subscriptions, update billing details, add new products, and upload ownership documents.",
    image: FrazerPortal,
    technologies: ["React", "Vite", "Go"],
    liveUrl: "https://portal.frazer.com",
    githubUrl: "",
    category: "Web Apps",
  },
  {
    title: "Google Takeout Parser",
    description:
      "Internal Java desktop tool for converting zipped Google Takeout review data into brand-aware CSVs. Includes recursive zip extraction, JSON parsing, log export, and a user-friendly Swing UI built for non-technical staff.",
    image: ReviewParser,
    technologies: ["Java", "Swing", "Java AWT", "Desktop UI", "File I/O"],
    liveUrl: "",
    githubUrl: "",
    category: "Utility Apps",
  },
  
];