"use client";

import { useState } from "react";
import ContentContainer from "@/components/ui/content-container";
import Divider from "@/components/ui/divider";
import ButtonTabs from "./components/button-tabs";
import ProjectCard from "./components/project-card";

import { projectData, Project } from "./components/section-data";

import FadeInContent from "@/lib/motion";

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All Projects");

  const tabs = ["All Projects", "Web Apps", "Utility Apps", "Backend"];

  const filteredProjects =
    activeTab === "All Projects"
      ? projectData
      : projectData.filter(
          (project: Project) => project.category === activeTab
        );

  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <FadeInContent from="left" className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Featured Projects</h1>
          <Divider />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto pb-12">
            A selection of my recent work showcasing my skills and experience in
            modern applications.
          </p>

          <ButtonTabs
            tabs={tabs}
            activeTab={activeTab}
            handleClick={setActiveTab}
          />
        </FadeInContent>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
            {filteredProjects.length === 0 && (
              <ContentContainer className="text-center mx-auto my-auto col-span-3">
                <h2 className="text-xl">No projects found for this category</h2>
                <Divider />
                <p className="text-balance">
                  I'm actively working on adding more projects, so check back
                  soon!
                </p>
              </ContentContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
