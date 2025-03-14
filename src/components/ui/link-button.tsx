import Link from "next/link";

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  label?: string;
  mode?: "primary" | "secondary";
  className?: string;
};

/**
 * LinkButton component is a button for internal and external links across the site.
 * It can be styled as primary or secondary.
 * @param children - The text to display in the button.
 * @param href - The URL to link to.
 * @param mode - The style of the button. Defaults to "primary".
 * @param className - Additional classes to apply to the button.
 */
export const LinkButton = ({
  children,
  href,
  label,
  mode = "primary",
  className,
}: LinkButtonProps) => {
  const buttonMode =
    mode === "primary"
      ? "bg-cyber-green-400 text-shadow-green-800 hover:lg:bg-cyber-green-200"
      : "bg-transparent text-cyber-green-200 hover:lg:bg-cyber-green-200 hover:lg:text-shadow-green-800";

  const classNames = [
    "flex items-center w-fit cursor-pointer px-4 py-2 font-bold rounded-md border-2 border-gray-700 transition-all duration-500 ease-in-out hover:lg:-translate-y-1",
    buttonMode,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const isExternal = href.startsWith("http");

  return isExternal ? (
    <a
      href={href}
      className={classNames}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
};
