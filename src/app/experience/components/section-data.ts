// Next Image Type
import { StaticImageData } from "next/image";

// Images
import CompTIAITF from "@assets/badges/comptia-itf.png";
import WGUCFED from "@assets/badges/wgu-cfed.png";
import NSLS from "@assets/badges/nsls-cert.png";


// Type Definitions
type WorkExperience = {
  title: string;
  company: string;
  parentCompany?: string;
  period: string;
  description: string;
  technologies: string[];
};

type Education = {
  degree: string;
  institution: string;
  period: string;
  description: string;
};

type Badge = {
  image: StaticImageData;
  url: string;
  issuer: string;
};

type SkillGroup = {
    category: string;
    items: string[];
};

export const WORK_EXPERIENCE: WorkExperience[]  = [
  {
    title: "Application Software Developer III",
    company: "LeadVenture®",
    period: "2024 - Present",
    description:
      "Lead development for the corporate marketing team, building and maintaining brand websites, internal tools, and prototypes to enhance workflow and brand consistency.",
    technologies: [
      "React",
      "Next.js",
      "WordPress",
      "TypeScript",
      "AWS",
      "Docker",
      "C#",
      "Java",
    ],
  },
  {
    title: "Software Engineer",
    company: "Frazer Computing, LLC",
    parentCompany: "LeadVenture®",
    period: "2022 - 2024",
    description:
      "Built internal tools, maintained the in-house CRM, and worked on REST APIs, proxy servers, and database solutions. Led a full Next.js website redesign and built the Frazer Dealer Portal to streamline account management.",
    technologies: [
      "React",
      "Next.js",
      "Go",
      "PostgreSQL",
      "Clarion",
      "Tauri",
      "Rust",
      "AWS",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Frazer Computing, LLC",
    parentCompany: "LeadVenture®",
    period: "2019 - 2022",
    description:
      "Developed and optimized responsive web applications, implemented design systems for consistency, and enhanced performance through efficient asset management.",
    technologies: ["React", "Next.js", "PHP", "HTML", "CSS"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "Western Governors University",
    period: "2024 - Present",
    description:
      "Currently pursuing a Bachelor's degree in Software Engineering, specializing in backend development through the Java track.",
  },
];

export const BADGES: Badge[] = [
  {
    image: CompTIAITF,
    url: "https://www.credly.com/badges/8786d6df-6dc5-492b-a462-d2bf2ff6e45e",
    issuer: "CompTIA",
  },
  {
    image: WGUCFED,
    url: "https://badgr.com/public/assertions/CazXppb8Q8ugLtTkODFxeA",
    issuer: "Western Governors University",
  },
  {
    image: NSLS,
    url: "https://www.nsls.org/",
    issuer: "NSLS Honor Society",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "MUI",
      "Redux",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Go", "Java", "Spring Boot", "Rust", "C#", "REST API"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "pgAdmin", "Normalization", "Database Design"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "AWS", "CI/CD"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Postman", "Photoshop", "Neovim"],
  },
];
