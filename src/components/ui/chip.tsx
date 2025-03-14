type ChipProps = {
  text: string;
  color?: string;
  background?: string;
  className?: string;
};

const Chip = ({
  text,
  color = "text-white",
  background = "bg-gray-700",
  className = "",
}: ChipProps) => {
  const classNames = [
    `text-xs font-medium rounded-full px-2 py-1 w-fit mt-2 md:mt-0`,
    color,
    background,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  return <span className={classNames}>{text}</span>;
};

export default Chip;
