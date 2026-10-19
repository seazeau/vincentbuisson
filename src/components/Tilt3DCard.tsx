import React from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function Tilt3DCard({
  children,
  className = "",
}: Tilt3DCardProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
