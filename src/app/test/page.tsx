"use client";

import ProfileImage from "@assets/andy_2025_v2.jpg";
import GitHubSVG from "@assets/icons/github-icon.svg";
import LinkedInSVG from "@assets/icons/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { ComputerIcon, FolderGit2, UserPen } from "lucide-react";
import Banner from "../../assets/old_pc_banner.jpeg";

export default function TestPage() {
  return (
    <div className="container mx-auto space-y-20 my-auto grid grid-cols-1 xl:grid-cols-[1fr_3fr] gap-6">
      <div className="bg-grad-reverse border-1 border-[#202020] rounded-sm px-8 pt-10 flex flex-col items-center h-full">
        <Image
          src={ProfileImage}
          width={ProfileImage.width / 4}
          height={ProfileImage.height / 4}
          alt="Profile Image"
          className="rounded-full border-4 border-[#202020]"
        />
        <div className="text-center my-5">
          <h2>
            Andy Ashley<span className="text-theme-red-500">.</span>
          </h2>
          <h3 className="text-xl">Software Engineer</h3>
          <p className="my-5 text-left py-5 border-t border-b border-[#262626]">
            I'm a <b>lifelong coder</b> and <b>software engineer</b> skilled in
            modern front-end frameworks, backend systems, and internal tooling,
            with a proven track record of independently owning projects from
            concept to deployment. I'm always looking for ways to level up,
            solve real problems, and support the people I work with.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://github.com/AndyAshley"
            title="GitHub Profile"
            className="transition-transform ease-in-out hover:-translate-y-1"
          >
            <Image src={GitHubSVG} width={30} height={30} alt="Github Icon" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/andy-ashley-b70539204/"
            title="LinkedIn Profile"
            className="transition-all ease-in-out hover:-translate-y-1"
          >
            <Image
              src={LinkedInSVG}
              width={30}
              height={30}
              alt="LinkedIn Icon"
            />
          </Link>
        </div>
      </div>
      <div className="bg-grad-reverse border-1 border-[#202020] rounded-sm px-8 py-10 backdrop-blur-xs h-full">
        <h2 className="mb-10">
          View My <span className="text-primary">&mdash;</span>
        </h2>
        <div className="flex lg:flex-row flex-col justify-evenly gap-5 items-stretch">
          <GlassCard className="p-10 flex flex-col items-center group">
            <div className="flex flex-col items-start gap-4">
              <ComputerIcon
                size="75px"
                className="mb-5 transition-colors duration-200 ease-in-out group-hover:text-primary"
              />
              <h3>Experience</h3>
              <p className="text-sm opacity-90">
                See information about my career, skillset, and the tech stack I
                use every day.
              </p>
              <a
                href="/experience"
                className="text-primary hover:font-bold mt-4"
              >
                View My Credentials &rarr;
              </a>
            </div>
          </GlassCard>
          <GlassCard className="p-10 flex flex-col items-center group">
            <div className="flex flex-col items-start gap-4">
              <FolderGit2
                size="75px"
                className="mb-5 transition-colors duration-200 ease-in-out group-hover:text-primary"
              />
              <h3>Projects</h3>
              <p className="text-sm opacity-90">
                Check out the applications I've built, from internal tools to
                production systems.
              </p>
              <a
                href="/portfolio"
                className="text-primary hover:font-bold mt-4"
              >
                View My Projects &rarr;
              </a>
            </div>
          </GlassCard>
          <GlassCard className="p-10 flex flex-col items-center group">
            <div className="flex flex-col items-start gap-4">
              <UserPen
                size="75px"
                className="mb-5 transition-colors duration-200 ease-in-out group-hover:text-primary"
              />
              <h3>About Me</h3>
              <p className="text-sm opacity-90">
                Learn more about who I am, what drives me, and how I approach
                problem-solving.
              </p>
              <a href="/about" className="text-primary hover:font-bold mt-4">
                Read More &rarr;
              </a>
            </div>
          </GlassCard>
        </div>
        <Image
          src={Banner}
          height={Banner.height}
          width={Banner.width}
          alt="Image of an old PC"
          className="rounded opacity-10 mt-10"
        />
      </div>
    </div>
  );
}
