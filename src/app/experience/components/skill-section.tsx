// Components
import FadeInContent from "@/lib/motion";
import { ChevronRight, Computer } from "lucide-react";
import ContentContainer from "@/components/ui/content-container";
import Divider from "@/components/ui/divider";

// Data
import { SKILLS } from "./section-data";

const SkillSection = () => {
  return (
    <FadeInContent from="bottom">
      <div className="flex flex-row items-center justify-center">
        <Computer className="mr-2 text-ember-500" />
        <h2 className="font-bold">My Skills</h2>
      </div>

      <Divider />

      <p className="text-center mb-8">
        Here are some of the technologies and tools I have experience with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SKILLS.map(({ category, items }, index) => (
          <ContentContainer key={index}>
            <h3 className="font-bold mb-2 pb-2 border-b border-zinc-700/80">
              {category}
            </h3>
            <ul className="gap-2 list-none m-0">
              {items.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight size={18} className="text-ember-400" />
                  {skill}
                </li>
              ))}
            </ul>
          </ContentContainer>
        ))}
      </div>
    </FadeInContent>
  );
};

export default SkillSection;
