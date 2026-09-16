"use client";

import React, { useRef, useState } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees, default 12
  glare?: boolean;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 10,
  glare = true,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const tiltX = ((y / rect.height) - 0.5) * -maxTilt * 2;
    const tiltY = ((x / rect.width) - 0.5) * maxTilt * 2;

    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });

    if (glare) {
      setGlarePosition({ x: xPercent, y: yPercent, opacity: 0.18 });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative transform-style-3d ${className}`}
    >
      {children}

      {/* Dynamic Specular 3D Glare */}
      {glare && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(227, 255, 13, 0.25) 0%, transparent 60%)`,
            opacity: glarePosition.opacity,
          }}
        />
      )}
    </div>
  );
}
