type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  borderColor?: string;
};

const ContentContainer = ({
  children,
  className,
  noPadding = false,
  borderColor = "border-zinc-700/80",
}: ContentContainerProps) => {
  const padding = noPadding ? "p-0" : "p-6";
  const classNames = [
    "bg-zinc-900/50 shadow-md backdrop-blur rounded border",
    padding,
    borderColor,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  return <div className={classNames}>{children}</div>;
};

export default ContentContainer;
