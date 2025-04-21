import { StaticImageData } from "next/image";

// images
import PortfolioSite from "@assets/portfolio/portfolio-2025v2.png";
import TourismWebsite from "@assets/portfolio/tourism-website.png";

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
    title: "Tourism Website",
    description:
      "UI/UX Design project for a fictional tourism website, focusing on user experience design",
    image: TourismWebsite,
    technologies: ["React", "TypeScript", "Bootstrap", "SCSS"],
    liveUrl: "https://aashley-d479-taniti.netlify.app/",
    githubUrl: "https://github.com/AndyAshley/d479-prototype",
    category: "Web Apps",
    },
];