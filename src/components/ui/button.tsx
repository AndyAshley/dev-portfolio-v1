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
      ? "bg-ember-400 text-zinc-800 hover:lg:bg-ember-500 border-ember-600"
      : "bg-transparent text-ember-500 border-ember-500  hover:lg:bg-ember-400 hover:lg:text-zinc-800";

  const classNames = [
    "flex items-center w-fit cursor-pointer px-4 py-2 font-bold rounded-md border-2  transition-all duration-500 ease-in-out hover:lg:-translate-y-1",
    buttonMode,
    (align && "align-items-" + align) || "",
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
