type HamburgerPropsType = {
  isOpen: boolean;
  onClick: () => void;
};

/**
 * Hamburger toggle button for the main navigation
 * @param {HamburgerPropsType} props - The props of the component
 * @param {boolean} props.isOpen - The state of the menu
 * @param {() => void} props.onClick - The function to toggle the menu
 * @returns  {JSX.Element} - The hamburger button
 */
const Hamburger = ({ isOpen, onClick }: HamburgerPropsType) => {
  const sharedClasses = `h-[2px] ${
    isOpen
      ? "bg-ember-500 group-hover:bg-ember-400"
      : "bg-white group-hover:bg-ember-500"
  } transition-all duration-200 ease-linear`;

  return (
    <button
      className="group cursor-pointer"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      <div
        className={`flex flex-col items-start justify-center transition-all duration-400 ease-in-out ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <div
          className={`w-6 ${sharedClasses} opacity-100 mb-1.5
        ${isOpen ? "rotate-45 translate-y-2" : ""}
        `}
        ></div>
        <div
          className={`${sharedClasses} mb-1.5
        ${isOpen ? "opacity-0" : "w-5 opacity-100 group-hover:w-6 mb-1.5"}
        `}
        ></div>
        <div
          className={`${sharedClasses} opacity-100
        ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4 group-hover:w-6"}
        `}
        ></div>
      </div>
    </button>
  );
};

export default Hamburger;
