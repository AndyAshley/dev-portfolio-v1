import Image from "next/image";

// Components
import FadeInContent from "@/lib/motion";
import { LinkButton } from "@/components/ui/link-button";
import ContentContainer from "@/components/ui/content-container";
import Chip from "@/components/ui/chip";

// Icons
import { ExternalLink, Github } from "lucide-react";

// Types
import { Project } from "./section-data";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <FadeInContent delay={index * 0.1} from="bottom" className="group h-full">
      <ContentContainer className="group flex flex-col h-full" noPadding>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* flex-1 makes this section fill remaining height */}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="font-secondary text-xl font-bold mb-2 tracking-normal">
            {project.title}
          </h2>

          {/* clamp here if you want to avoid super tall cards */}
          <p className="mb-4 flex-1 line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <Chip
                key={techIndex}
                background="bg-transparent"
                color="text-primary"
                className="border-2 border-zinc-700/80"
                text={tech}
              />
            ))}
          </div>

          {/* mt-auto pushes this all the way to the bottom */}
          <div className="flex space-x-3 mt-auto">
            {project.liveUrl && (
              <LinkButton
                href={project.liveUrl}
                mode="primary"
                className="text-sm font-medium"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Site
              </LinkButton>
            )}
            {project.githubUrl && (
              <LinkButton
                href={project.githubUrl}
                mode="secondary"
                className="text-sm font-medium"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </LinkButton>
            )}
          </div>
        </div>
      </ContentContainer>
    </FadeInContent>
  );
}

export default ProjectCard;
