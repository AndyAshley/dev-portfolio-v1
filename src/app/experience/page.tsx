import { Metadata } from "next";

// Components
import ExperienceSection from "./components/experience-section";
import SkillSection from "./components/skill-section";

// Metadata
export const metadata: Metadata = {
  title: "Experience & Skills",
  description:
    "Years of engineering, problem-solving, and building. My professional work experience and the skills I bring to the table.",
};

export default function Experience() {
  return (
    <div className="container mx-auto space-y-20">
      <ExperienceSection />
      <SkillSection />
    </div>
  );
}
