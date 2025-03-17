"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Components
import { Link as LinkIcon } from "lucide-react";
import ContentContainer from "@ui/content-container";

const messages = [
  {
    title: "No such file or directory",
    description: [
      "$ whoami",
      "Not the owner of this page.",
      "Have you tried grepping for it?",
    ],
  },
  {
    title: "404 | Page Not Found",
    description: [
      "Have you tried `sudo`?",
      "No?",
      "Then this page isn't coming back.",
    ],
  },
  {
    title: "[ERROR] 404: Process Terminated",
    description: [
      "The requested script has crashed due to insufficient RAM. Consider upgrading your home server.",
    ],
  },
];

export default function NotFound() {
  const [message, setMessage] = useState<{
    title: string;
    description: string[];
  } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  // Avoid hydration mismatches by showing nothing until the random message is set
  if (!message) return null;

  return (
    <section className="flex items-center justify-center h-full w-full">
      <ContentContainer>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-3">{message.title}</h1>
          {message.description.map((line: string, index: number) => (
            <span key={index} className="text-left">
              {line}
            </span>
          ))}
          <div className="flex items-center mt-4 text-cyber-green-200 underline underline-offset-2">
            <LinkIcon className="w-4 h-4 mr-2" />
            <Link href="/">Return to safety</Link>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
