"use client";

import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

interface GlassCardProps {
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Content to render inside the glass card */
  children: ReactNode;
}

/**
 * A glass morphism container with an animated spotlight effect that follows the mouse.
 *
 * The spotlight uses requestAnimationFrame for smooth easing and only activates on hover.
 * Works best on larger screens - spotlight is disabled below xl breakpoint.
 *
 * @example
 * ```tsx
 * <GlassCard className="p-8 max-w-md">
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </GlassCard>
 * ```
 */
export const GlassCard = ({ className = "", children }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Track animation frame ID so we can cancel it on unmount
  const animationRef = useRef<number | null>(null);

  // Using refs to avoid triggering re-renders during animation loop
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Update target position as mouse moves
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const element = cardRef.current;
    if (!element) return;

    const frame = element.getBoundingClientRect();
    targetRef.current = {
      x: event.clientX - frame.left,
      y: event.clientY - frame.top,
    };
  }, []);

  // Initialize position on mouse enter to prevent spotlight jump
  const handleMouseEnter = useCallback((event: MouseEvent) => {
    const element = cardRef.current;
    if (!element) return;

    const frame = element.getBoundingClientRect();
    const initialX = event.clientX - frame.left;
    const initialY = event.clientY - frame.top;

    targetRef.current = { x: initialX, y: initialY };
    currentRef.current = { x: initialX, y: initialY };
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Lower = smoother but slower follow. Higher = more responsive but jittery
    const ease = 0.1;

    const animate = () => {
      if (isHovering) {
        // Smooth easing towards target position
        currentRef.current.x +=
          (targetRef.current.x - currentRef.current.x) * ease;
        currentRef.current.y +=
          (targetRef.current.y - currentRef.current.y) * ease;

        setPosition({
          x: currentRef.current.x,
          y: currentRef.current.y,
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={`glass-card-spotlight relative rounded bg-grad border-1 border-[#202020] backdrop-blur-[3px] overflow-hidden transition-all duration-100 xl:hover:border-white/10 ${className}`}
      data-mouseover={isHovering}
      style={
        {
          "--x": `${position.x}px`,
          "--y": `${position.y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
