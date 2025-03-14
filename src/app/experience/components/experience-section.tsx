"use client";

// Components
import Image from "next/image";
import Chip from "@/components/ui/chip";
import Divider from "@/components/ui/divider";
import FadeInContent from "@/lib/motion";
import ContentContainer from "@ui/content-container";

// Icons
import { BriefcaseBusiness, GraduationCap, BadgeCheck } from "lucide-react";

// Data
import { WORK_EXPERIENCE, EDUCATION, BADGES } from "./section-data";

const ExperienceSection = () => {
  return (
    <section id="experience">
      <FadeInContent from="left" className="mb-16 text-center">
        <h2 className="font-bold mb-4">Experience & Education</h2>
        <Divider />
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          My professional journey and educational background that have shaped my
          expertise in software engineering.
        </p>
      </FadeInContent>

      <div className="grid md:grid-cols-3 gap-12">
        <FadeInContent from="left" className="md:col-span-2">
          <div className="flex items-center md:justify-start justify-center mb-8">
            <BriefcaseBusiness className="mr-3 text-cyber-green-400" />
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </div>

          <div className="space-y-6">
            {WORK_EXPERIENCE.map((job, index) => (
              <FadeInContent from="left" key={index}>
                {/* <Card> */}
                <ContentContainer>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{job.title}</h4>
                      <p className="text-foreground/70">
                        {job.company}{" "}
                        {job.parentCompany && (
                          <small className="text-gray-400">
                            - A {job.parentCompany} Company
                          </small>
                        )}{" "}
                      </p>
                    </div>
                    <Chip
                      background="bg-cyber-green-200"
                      color="text-shadow-green-800"
                      text={job.period}
                    />
                  </div>
                  <p className="mb-4 text-foreground/80">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        background="bg-cyber-green-200"
                        color="text-shadow-green-800"
                        text={tech}
                      />
                    ))}
                  </div>
                </ContentContainer>
              </FadeInContent>
            ))}
          </div>
        </FadeInContent>

        <FadeInContent from="bottom">
          <div className="flex items-center md:justify-start justify-center mb-8">
            <GraduationCap className="mr-3 text-cyber-green-400" />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <div className="space-y-6">
            {EDUCATION.map((edu, index) => (
              <FadeInContent
                from="left"
                key={index}
                transition={{ delay: index * 0.1 }}
              >
                <ContentContainer className="pb-5">
                  <div className="mb-4 space-y-3">
                    <h4 className="text-xl font-bold text-gray-100">
                      {edu.degree}
                    </h4>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                    <p className="text-lg">{edu.institution} </p>
                    <Chip
                      background="bg-cyber-green-200"
                      color="text-shadow-green-800"
                      text={edu.period}
                    />
                  </div>
                  <p>{edu.description}</p>
                </ContentContainer>
              </FadeInContent>
            ))}
          </div>

          <div className="flex items-center md:justify-start justify-center my-8">
            <BadgeCheck className="mr-3 text-cyber-green-400" />
            <h3 className="text-2xl font-bold">Certificates</h3>
          </div>
          <div className="space-y-6 flex flex-wrap gap-6 justify-evenly">
            {BADGES.map((badge, index) => (
              <a
                href={badge.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-2 text-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={badge.image}
                  alt={`Badge from ${badge.issuer}`}
                  width={100}
                  height={100}
                  className="mx-auto"
                />
                <p className="text-sm text-foreground/80">{badge.issuer}</p>
              </a>
            ))}
          </div>
        </FadeInContent>
      </div>
    </section>
  );
};

export default ExperienceSection;
