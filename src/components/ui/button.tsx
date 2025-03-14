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
      ? "bg-cyber-green-400 text-shadow-green-800 hover:lg:bg-cyber-green-200"
      : "bg-transparent text-cyber-green-200 hover:lg:bg-cyber-green-200 hover:lg:text-shadow-green-800";

  const alignSelf = `self-${align}`;

  const classNames = [
    "flex items-center w-fit cursor-pointer px-4 py-2 font-bold rounded-md border-2 border-gray-700 transition-all duration-500 ease-in-out hover:lg:-translate-y-1",
    buttonMode,
    alignSelf,
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
