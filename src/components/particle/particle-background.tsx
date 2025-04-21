"use client";

import { useRef, useEffect } from "react";

const PARTICLE_CONFIG = {
  COUNT: 100, // Total particles
  SIZE_RANGE: [1, 4], // Min & Max particle size
  MAGNETISM: 0.001, // Strength of attraction (Higher = faster pull)
  WOBBLE: 0.0001, // Randomized wobble (Higher = more chaotic movement)
  ATTRACTION_RADIUS: 400, // Distance from mouse where attraction applies
  MOUSE_STOP_TIME: 1500, // Time after which particles stop following mouse
  CONNECT_RADIUS: 200, // Distance threshold for drawing lines between particles
  GLOW_RADIUS: 25, // Distance from mouse where glow effect is maximum
  GLOW_INTENSITY: 2, // Base glow intensity (higher = stronger glow)
  PARTICLE_COLOR: "90,90,90", // Default white particles
  LINE_COLOR: "90,90,90", // Default white lines
  GLOW_COLOR: "255,255,255", // Default white glow
  PROXIMITY_GLOW_BOOST: 3, // Additional glow when near the mouse
  ENERGY_PULSE_SPEED: 0.002, // Speed of the glow pulsing effect
};

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  alpha: number;
  magnetism: number;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; inBounds: boolean } | null>(
    null
  );
  const timeoutRef = useRef<number | null>(null);
  const mouseStoppedRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]); // Store particles persistently

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles only once
    if (particlesRef.current.length === 0) {
      const particleAmount =
        window.screen.width < 768
          ? PARTICLE_CONFIG.COUNT / 3
          : PARTICLE_CONFIG.COUNT;
      particlesRef.current = Array.from({ length: particleAmount }, () =>
        createParticle(canvas.width, canvas.height)
      );
    }

    let animationFrameId: number;

    const updateFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map((p) =>
        updateParticle(
          p,
          canvas.width,
          canvas.height,
          mouseRef.current,
          mouseStoppedRef.current
        )
      );

      particlesRef.current.forEach((p) =>
        drawParticle(ctx, p, particlesRef.current, mouseRef.current)
      );
      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    const handleMouseMove = (event: MouseEvent) => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

      // Check if mouse is within canvas bounds
      const rect = canvas.getBoundingClientRect();
      const inBounds =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        inBounds,
      };

      mouseStoppedRef.current = false;

      timeoutRef.current = window.setTimeout(() => {
        // Only activate attraction if mouse is still in bounds
        if (mouseRef.current?.inBounds) {
          mouseStoppedRef.current = true;
        }
      }, PARTICLE_CONFIG.MOUSE_STOP_TIME);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (mouseRef.current) {
        mouseRef.current.inBounds = false;
      }
      mouseStoppedRef.current = false;
    };

    // Handle window blur/focus to reset mouse tracking
    const handleBlur = () => {
      if (mouseRef.current) {
        mouseRef.current.inBounds = false;
      }
      mouseStoppedRef.current = false;
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mouseout", (e) => {
      // Check if mouse left the window entirely
      if (e.relatedTarget === null) {
        handleBlur();
      }
    });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mouseout", handleBlur);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none opacity-75 -z-10"
    />
  );
};

// Create a new particle
const createParticle = (width: number, height: number): Particle => {
  // Random velocity
  const dx = (Math.random() - 0.5) * 0.5;
  const dy = (Math.random() - 0.5) * 0.5;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    dx,
    dy,
    size:
      Math.random() *
        (PARTICLE_CONFIG.SIZE_RANGE[1] - PARTICLE_CONFIG.SIZE_RANGE[0]) +
      PARTICLE_CONFIG.SIZE_RANGE[0],
    alpha: Math.random() * 0.5 + 0.5,
    magnetism: PARTICLE_CONFIG.MAGNETISM,
  };
};

const updateParticle = (
  particle: Particle,
  width: number,
  height: number,
  mouse: { x: number; y: number; inBounds: boolean } | null,
  mouseStopped: boolean
): Particle => {
  let { x, y, dx, dy } = particle;

  // Mouse attraction
  if (mouse && mouseStopped && mouse.inBounds) {
    const dxToMouse = mouse.x - x;
    const dyToMouse = mouse.y - y;
    const distance = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);

    if (distance < PARTICLE_CONFIG.ATTRACTION_RADIUS) {
      dx += (dxToMouse / distance) * particle.magnetism;
      dy += (dyToMouse / distance) * particle.magnetism;

      // Slight random wobble
      dx += (Math.random() - 0.5) * PARTICLE_CONFIG.WOBBLE;
      dy += (Math.random() - 0.5) * PARTICLE_CONFIG.WOBBLE;
    }
  }

  // Move particle
  x += dx;
  y += dy;

  // Simple bounce - flip velocity
  if (x + particle.size > width) {
    x = width - particle.size;
    dx = -dx;
  } else if (x - particle.size < 0) {
    x = particle.size;
    dx = -dx;
  }

  if (y + particle.size > height) {
    y = height - particle.size;
    dy = -dy;
  } else if (y - particle.size < 0) {
    y = particle.size;
    dy = -dy;
  }

  return { ...particle, x, y, dx, dy };
};

// Draw particle
const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  particles: Particle[],
  mouse: { x: number; y: number; inBounds: boolean } | null
) => {
  ctx.save();

  let glowBoost = 0;
  let alphaBoost = 0;
  let lineBoost = 0;

  // Default (particles start dim)
  const baseAlpha = 0.2; // Lower initial brightness
  let baseGlow = 5; // Lower default glow

  if (mouse && mouse.inBounds) {
    const dxToMouse = mouse.x - particle.x;
    const dyToMouse = mouse.y - particle.y;
    const distanceToMouse = Math.sqrt(dxToMouse ** 2 + dyToMouse ** 2);

    // Check if within Glow Radius
    if (distanceToMouse < PARTICLE_CONFIG.GLOW_RADIUS) {
      const proximityFactor = 1 - distanceToMouse / PARTICLE_CONFIG.GLOW_RADIUS;
      glowBoost = PARTICLE_CONFIG.PROXIMITY_GLOW_BOOST * proximityFactor;
      alphaBoost = Math.min(0.8, glowBoost * 0.5);
      lineBoost = Math.min(0.5, glowBoost * 0.3);
      baseGlow = 20 + glowBoost * 50;
    }
  }

  // Pulsating effect
  const pulse = Math.sin(Date.now() * PARTICLE_CONFIG.ENERGY_PULSE_SPEED) * 3;

  // Apply glow only when inside Glow Radius
  ctx.shadowBlur = baseGlow + pulse;
  ctx.shadowColor = `rgba(${PARTICLE_CONFIG.GLOW_COLOR}, ${
    baseAlpha + alphaBoost
  })`;

  // Set particle opacity based on proximity
  const dynamicAlpha = baseAlpha + alphaBoost;

  // Draw particle
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${PARTICLE_CONFIG.PARTICLE_COLOR}, ${dynamicAlpha})`;
  ctx.fill();

  ctx.restore();

  for (const other of particles) {
    if (particle === other) continue;

    const dx = particle.x - other.x;
    const dy = particle.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only connect if within Connect Radius
    if (distance < PARTICLE_CONFIG.CONNECT_RADIUS) {
      const baseLineOpacity = 0.05;
      const proximityOpacity = Math.max(
        0,
        (1 - distance / PARTICLE_CONFIG.CONNECT_RADIUS) * 0.5
      );

      // Increase opacity near the mouse
      const lineOpacity = baseLineOpacity + lineBoost * proximityOpacity;

      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(other.x, other.y);
      ctx.strokeStyle = `rgba(${PARTICLE_CONFIG.LINE_COLOR}, ${lineOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
};

export default ParticleBackground;
