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

    let animId: number | null = null;
    let isRunning = false;

    const animate = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      ringPos.current.x += dx * 0.18;
      ringPos.current.y += dy * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
        animId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
        animId = null;
      }
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      startAnimation();
    };

    // Use event delegation for hover detection (only triggers on element enter/leave, not every pixel)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .group")
      );
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Global Ambient Spotlight: hardware-accelerated translation of a single GPU layer (no full-screen canvas/gradient repaints) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 -ml-[325px] -mt-[325px] w-[650px] h-[650px] rounded-full z-30 transition-opacity duration-300 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(212, 255, 0, 0.045) 0%, transparent 70%)",
        }}
      />

      {/* 2. Magnetic Outer Ring: GPU scale transform avoiding layout reflow */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-5 -mt-5 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-150 ease-out will-change-transform ${
          isHovered
            ? "border-[#d4ff00] bg-[#d4ff00]/10 scale-140"
            : isPressed
            ? "border-[#d4ff00] bg-[#d4ff00]/20 scale-85"
            : "border-white/35 bg-transparent scale-100"
        }`}
      />

      {/* 3. Ultra-responsive Center Volt Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 will-change-transform ${
          isHovered ? "bg-[#d4ff00] scale-150 shadow-[0_0_12px_#d4ff00]" : "bg-white"
        }`}
      />
    </>
  );
}
