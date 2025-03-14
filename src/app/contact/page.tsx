import { Metadata } from "next";

// Components
import { LinkButton } from "@ui/link-button";
import { ContactForm } from "./components/contact-form";
import FadeInContent from "@/lib/motion";

// Icons
import { Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Want to work together, ask a question, or start a conversation? Reach out.",
};

export default function Contact() {
  return (
    <section className="max-w-lg mx-auto my-auto h-full flex flex-col md:flex-row gap-10 items-center justify-center">
      <FadeInContent from="left" className="space-y-2 text-center md:text-left">
        <h1>Contact Me</h1>
        <div>
          <p className="leading-relaxed mb-5">
            If you would like to get in touch with me, please feel free to use
            the form below. I will get back to you as soon as possible.
          </p>
          <p className="leading-relaxed">
            If this is for freelance work, please include as much detail as
            possible about the project, including the technologies you would
            like to use, the timeline, and any other relevant information.
          </p>
        </div>
        <div>
          <div className="w-2/3 mx-auto md:mx-0 bg-cyber-green-800 h-0.5 my-5"></div>
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <h2>Socials //</h2>
            <LinkButton
              href="https://github.com/AndyAshley"
              label="GitHub Profile"
              mode="secondary"
            >
              <Github />
            </LinkButton>
            <LinkButton
              href="https://www.linkedin.com/in/andy-ashley-b70539204/"
              label="LinkedIn Profile"
              mode="secondary"
            >
              <Linkedin />
            </LinkButton>
          </div>
        </div>
      </FadeInContent>
      <FadeInContent from="bottom" className="w-full">
        <ContactForm />
      </FadeInContent>
    </section>
  );
}
