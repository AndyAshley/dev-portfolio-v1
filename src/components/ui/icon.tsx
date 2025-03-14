import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  icon: IconDefinition; // FontAwesome icon definition
  size?: SizeProp; // Optional size override
  color?: string; // Optional color override
  className?: string; // Optional additional styles
  href?: string; // Optional link URL
  label?: string; // Optional label for screen readers
};

/**
 * A wrapper around FontAwesomeIcon to standardize icon sizing and styling.
 */
const Icon = ({
  icon,
  color,
  size = "lg",
  className,
  href,
  label,
}: IconProps) => {
  // Merge default size with any additional classes
  const classNames = ["h-6 w-6", className].filter(Boolean).join(" ");

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <FontAwesomeIcon
        icon={icon}
        size={size}
        className={classNames}
        color={color}
      />
    </a>
  ) : (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      className={classNames}
      color={color}
    />
  );
};

export default Icon;
