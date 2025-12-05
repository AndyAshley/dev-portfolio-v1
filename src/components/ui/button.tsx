type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  align?: "start" | "center" | "end";
  mode?: "primary" | "secondary";
  disabled?: boolean;
};

export const Button = ({
  children,
  type = "button",
  className = "",
  mode = "primary",
  align = "start",
  disabled = false,
}: ButtonProps) => {
  const buttonMode =
    mode === "primary"
      ? "bg-primary border-primary text-zinc-800 hover:lg:bg-primary-hover hover:lg:border-primary-hover"
      : "bg-transparent text-primary border-primary hover:lg:bg-primary-hover hover:lg:text-zinc-800";

  const classNames = [
    "flex items-center w-fit cursor-pointer px-4 py-2 font-bold rounded-md border-2  transition-all duration-500 ease-in-out hover:lg:-translate-y-1",
    buttonMode,
    (align && "items-" + align) || "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const buttonProps = {
    className: classNames,
    type,
    disabled,
  };
  return <button {...buttonProps}>{children}</button>;
};
