"use client";
import { useState, useEffect } from "react";

// Components
import Link from "next/link";
import Image from "next/image";
import Hamburger from "./components/hamburger";
import { usePathname } from "next/navigation";
import Logo from "../../assets/aa_web_logo_nav.png";

/**
 * Header component for the website
 * @returns {JSX.Element} - The header component
 */
export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [headerBg, setHeaderBg] = useState("bg-transparent");
  const path = usePathname();

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const checkPath = (currentPath: string) => {
    if (path === currentPath) return "after:left-0 after:w-full";
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (navOpen && window.innerWidth < 768) {
      // Change header background color when mobile menu is open
      setHeaderBg("bg-cyber-black/80 backdrop-blur");
      document.body.style.overflow = "hidden";
    } else {
      setHeaderBg("bg-transparent");
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navOpen]);

  const paths = [
    "/",
    "/about",
    "/experience",
    "/posts",
    "/portfolio",
    "/contact",
  ];

  return (
    <>
      <header
        className={`max-w-2xl w-full mx-auto ${headerBg} py-3 z-50 px-5 pt-6`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 row-start-1 col-start-1 justify-self-start">
            <Link href="/">
              <Image
                alt="Logo"
                src={Logo}
                width={200}
                height={173}
                style={{ maxHeight: "50px", width: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Desktop */}
          <div className="relative flex items-center">
            <div className="absolute md:-top-1.5 top-11.5 -right-4 md:right-7 flex items-center md:flex-row flex-col">
              <nav
                className={`hidden md:flex justify-center md:justify-end md:mr-5 transition-all duration-300 ease-in-out md:mt-0 overflow-hidden ${
                  navOpen
                    ? "opacity-100 md:bg-transparent"
                    : "mt-0 opacity-0 md:opacity-100"
                }`}
              >
                <ul
                  className={`flex flex-col md:flex-row gap-3  mt-1 transition-all duration-400 ease-in-out overflow-hidden text-center md:text-left list-none m-0 h-8 ${
                    navOpen
                      ? "md:max-w-[100%] w-full opacity-100 pl-25 md:pl-0"
                      : "max-w-0 opacity-0"
                  }`}
                >
                  {paths.map((pathItem) => (
                    <li key={pathItem} className="ml-0">
                      <Link
                        href={pathItem}
                        className={`pb-1 underline-animation ${checkPath(
                          pathItem
                        )}`}
                      >
                        {pathItem === "/"
                          ? "Home"
                          : pathItem.slice(1).charAt(0).toUpperCase() +
                            pathItem.slice(2)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <Hamburger isOpen={navOpen} onClick={toggleNav} />
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-21.5 bg-gradient-to-b from-cyber-black/80 from-0%  to-steel-grey-800 to-50% z-40 transform transition-transform duration-400 ease-in-out md:hidden backdrop-blur ${
          navOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start">
          <nav className="w-full">
            <ul className="flex flex-col gap-6 items-center  text-xl list-none p-0">
              {paths.map((pathItem) => (
                <li key={pathItem} className="w-full text-center">
                  <Link
                    href={pathItem}
                    className={`pb-1 px-4 py-2 block ${
                      pathItem === path
                        ? "font-bold underline decoration-ember-500 underline-offset-6"
                        : ""
                    }`}
                    onClick={toggleNav}
                  >
                    {pathItem === "/"
                      ? "Home"
                      : pathItem.slice(1).charAt(0).toUpperCase() +
                        pathItem.slice(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
