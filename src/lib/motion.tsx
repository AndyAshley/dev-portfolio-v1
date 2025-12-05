"use client";

import { motion } from "framer-motion";

type MotionDivProps = {
  children: React.ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  className?: string;
  delay?: number;
  transition?: { duration?: number; delay?: number };
  exit?: boolean;
  toastId?: number;
};

/**
 * Component to fade in content from a specific direction
 * @returns {React.ReactNode} FadeInContent component
 */
const FadeInContent = ({
  children,
  from = "left",
  className = "",
  delay = 0.2,
  transition = { duration: 0.3, delay },
  exit = false,
  toastId,
}: MotionDivProps) => {
  const getDirection = () => {
    switch (from) {
      case "left":
        return {
          in: { x: -20, y: 0 },
          animate: { x: 0, y: 0 },
          out: { x: -20, y: 0 },
        };
      case "right":
        return {
          in: { x: 20, y: 0 },
          animate: { x: 0, y: 0 },
          out: { x: 20, y: 0 },
        };
      case "top":
        return {
          in: { x: 0, y: -20 },
          animate: { x: 0, y: 0 },
          out: { x: 0, y: -20 },
        };
      case "bottom":
      default:
        return {
          in: { x: 0, y: 20 },
          animate: { x: 0, y: 0 },
          out: { x: 0, y: 20 },
        };
    }
  };

  const direction = getDirection();

  const motionProps = {
    initial: { opacity: 0, ...direction.in },
    animate: { opacity: 1, ...direction.animate },
    ...(exit ? { exit: { opacity: 0, ...direction.out } } : {}),
    transition,
    className,
  };

  return (
    <motion.div key={toastId} {...motionProps}>
      {children}
    </motion.div>
  );
};

export default FadeInContent;
