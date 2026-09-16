"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate for non-touch fine pointer devices (desktop mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(212, 255, 0, 0.045), transparent 70%)`;
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .group")
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animId: number;
    const animate = () => {
      // Smooth lerp for ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Global Ambient Spotlight that reveals textures & dark borders */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      />

      {/* 2. Magnetic Outer Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-5 -mt-5 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "w-14 h-14 -ml-7 -mt-7 border-[#d4ff00] bg-[#d4ff00]/10 scale-110"
            : isPressed
            ? "w-8 h-8 -ml-4 -mt-4 border-[#d4ff00] bg-[#d4ff00]/20 scale-90"
            : "w-10 h-10 border-white/35 bg-transparent"
        }`}
      />

      {/* 3. Ultra-responsive Center Volt Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 ${
          isHovered ? "bg-[#d4ff00] scale-150 shadow-[0_0_12px_#d4ff00]" : "bg-white"
        }`}
      />
    </>
  );
}
