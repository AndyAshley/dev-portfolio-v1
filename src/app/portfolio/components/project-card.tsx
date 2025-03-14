import Image from "next/image";

// Components
import FadeInContent from "@/lib/motion";
import { LinkButton } from "@/components/ui/link-button";
import ContentContainer from "@/components/ui/content-container";

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
    <FadeInContent delay={index * 0.1} from="bottom" className="group">
      <ContentContainer className="group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 tracking-wider">
            {project.title}
          </h3>
          <p className="mb-4 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3 mt-auto">
            <LinkButton
              href={project.liveUrl}
              mode="primary"
              className="text-sm font-medium"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </LinkButton>
            <LinkButton
              href={project.githubUrl}
              mode="secondary"
              className="text-sm font-medium"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </LinkButton>
          </div>
        </div>
      </ContentContainer>
    </FadeInContent>
  );
}

export default ProjectCard;
