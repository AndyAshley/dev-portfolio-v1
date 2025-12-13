"use client";

import { useState, useEffect } from "react";

// Components
import Image from "next/image";
import FadeInContent from "@/lib/motion";
import { LinkButton } from "@/components/ui/link-button";

// Icons
import { MoveRight, ChevronsRight } from "lucide-react";

// Images
import AndyHeadshot from "@assets/andy_2025_v2.jpg";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Software Engineer";
  const typingSpeed = 90;

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <section className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-6 md:px-12 h-full">
      <FadeInContent
        from="left"
        className="relative flex justify-center md:justify-start"
      >
        <div className="relative w-[50vw] max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] aspect-square rounded-full overflow-hidden ring-2 ring-ember-800 border-2 border-zinc-800 shadow-lg">
          <Image
            src={AndyHeadshot}
            alt="Andy Ashley"
            className="w-full h-full object-cover"
            height={500}
            width={500}
            priority
          />
        </div>
      </FadeInContent>

      <FadeInContent
        from="bottom"
        className="flex flex-col space-y-6 text-center md:text-left justify-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-0">
          Andy A<span className="text-ember-500 ml-1">.</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-4xl font-medium font-secondary h-8">
          {typedText}
        </h2>

        <p className="text-lg font-bold">
          I build fast, scalable, and maintainable applications.
        </p>

        <p className="leading-relaxed text-balance max-w-2xl text-gray-300">
          Full-stack apps, internal tools, or something completely new—I make
          sure they run smooth. Front-end, backend, or anywhere in between, I
          solve real business problems.
        </p>

        <div className="mt-5 flex gap-4 justify-center md:justify-start">
          <LinkButton
            href="/portfolio"
            className="flex items-center text-sm md:text-base gap-2 px-5 py-3"
          >
            View My Work
            <MoveRight size={18} />
          </LinkButton>
          <LinkButton
            mode="secondary"
            href="/contact"
            className="flex items-center text-sm md:text-base gap-2 px-5 py-3"
          >
            Contact Me
            <ChevronsRight size={18} />
          </LinkButton>
        </div>
      </FadeInContent>
    </section>
  );
};

export default HeroSection;
