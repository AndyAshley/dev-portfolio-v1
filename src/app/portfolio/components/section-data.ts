import { StaticImageData } from "next/image";

// images
import PortfolioSite from "@assets/portfolio/portfolio-2025.png";

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
];