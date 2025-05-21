'use client';

import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Set viewport height on mount
    setViewportHeight(window.innerHeight);

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - viewportHeight;
      const progress = window.scrollY / (totalHeight || 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize progress
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewportHeight]);

  // Calculate rocket vertical position
  const rocketY = scrollProgress * viewportHeight;

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-full bg-green-500 transform origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Rocket icon follows scroll */}
      <div
        className="fixed left-4 z-50"
        style={{
          transform: `translateY(${rocketY}px) rotate(${scrollProgress > 0.5 ? 180 : 0}deg)`,
          filter: `hue-rotate(${scrollProgress * 360}deg)`,
        }}
      >
        <Rocket className="text-primary" size={40} />
      </div>
    </>
  );
}
