type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

const ContentContainer = ({
  children,
  className,
  noPadding = false,
}: ContentContainerProps) => {
  const padding = noPadding ? "p-0" : "p-6";
  const classNames = [
    "bg-steel-grey-800/75 rounded shadow-lg border border-gray-700",
    padding,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  return <div className={classNames}>{children}</div>;
};

export default ContentContainer;
