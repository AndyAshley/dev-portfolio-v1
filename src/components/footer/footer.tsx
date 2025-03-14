// Icons
import { Github, Linkedin } from "lucide-react";

/**
 * Footer Component
 * Displays copyright information and social links.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="p-3 bg-cyber-black flex items-center justify-center gap-3 w-full z-10 border-t-1 border-gray-800">
      <small>&copy; {year} Andy Ashley</small> *
      <div className="flex gap-1">
        <a
          href="https://github.com/AndyAshley"
          className="text-cyber-green-400"
          aria-label="GitHub Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/andy-ashley-b70539204/"
          className="text-cyber-green-400"
          aria-label="LinkedIn Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
