/**
 * Footer Component
 * Displays copyright information and social links.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="p-3 bg-[#151515] flex items-center justify-center gap-3 w-full z-10">
      <div className="flex gap-3 align-items-center tracking-wide text-xs">
        <span className="text-white">&copy; {year} Andy Ashley</span>
        <span className="text-white">|</span>
        <a
          href="https://github.com/AndyAshley"
          className="text-white hover:text-primary-hover text-xs"
          aria-label="GitHub Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/andy-ashley-b70539204/"
          className="text-white hover:text-primary-hover text-xs"
          aria-label="LinkedIn Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
