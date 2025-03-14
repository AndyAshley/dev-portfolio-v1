import { Metadata } from "next";

// Components
import FadeInContent from "@/lib/motion";
import Divider from "@/components/ui/divider";
import ContentContainer from "@/components/ui/content-container";

// Metadata
export const metadata: Metadata = {
  title: "About",
  description:
    "I build things, break things, and occasionally pretend I know what I'm doing. If it runs, I'll optimize it. If it breaks, I probably meant to do that.",
};

export default function About() {
  return (
    <section className="flex flex-col gap-15 w-full h-full items-center justify-center">
      <FadeInContent from="left">
        <div className="max-w-200 flex flex-col md:flex-row mx-auto items-center text-center">
          <h1 className="md:text-right font-bold mb-3 border-cyber-green-800">
            About Me
          </h1>
          <p className="text-lg col-span-2 md:text-left md:border-l-2 border-cyber-green-800 md:pl-5 md:ml-5 md:text-wrap text-balance">
            <strong>I'm a lifelong coder</strong> with over 5 years of
            professional experience building modern web applications. I
            specialize in full-stack engineering with a focus on creating
            scalable, maintainable, and user-friendly applications.
          </p>
        </div>
      </FadeInContent>
      <FadeInContent from="bottom">
        <ContentContainer className="md:max-w-4xl w-full">
          <h2 className="font-bold mb-4 text-center">My Journey</h2>
          <Divider />
          <div className="space-y-4 text-xl text-left">
            <p className="text-md">
              <strong>Curiosity has always driven me</strong>. Knowing that
              something works has never been enough, I need to understand
              <em> why</em> it works... <em>how</em> it works. That mindset
              sparked my fascination with computers when I was 7, tinkering with
              the family Tandy 1000RL, exploring DOS commands and playing video
              games. When I was around 10, that curiosity evolved into learning
              programming. I've been creating, breaking, fixing, and rebuilding
              things ever since.
            </p>

            <p className="text-md">
              I started out with video game mods (heyyy StarCraft!), then moved
              on to web development, building my first website at 11. I've been
              hooked ever since. I've spent years learning, experimenting, and
              building, from personal projects to professional work. I've used a
              variety of technologies, languages, and platforms, always pushing
              myself to learn more, do more, and create more.
            </p>

            <p className="text-md">
              For me, coding isn't just about writing functions or shipping
              features. It's about engineering solutions, building systems, and
              transforming ideas into reality. Whether I'm solving a problem,
              architecting new solutions, or exploring a new technology, I'm
              driven by the need to push boundaries and refine my craft.
            </p>

            <p className="text-md">
              I've worked professionaly across web and desktop development, not
              just adapting to different technologies but learning how to make
              them work for me. I don't build things because I have to; I build
              because I can't <em>not</em> build. Curiosity and creativity drive
              me, and tinkering is second nature. Whether it's a new framework,
              a new system, or just a random idea that pops into my head at 2
              AM, I'm always ready to take it apart, reshape it, and see where
              it can go.
            </p>
          </div>
        </ContentContainer>
      </FadeInContent>
    </section>
  );
}
