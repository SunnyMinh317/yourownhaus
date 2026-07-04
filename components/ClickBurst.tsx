"use client";

import { useEffect, useState } from "react";

type Burst = { id: number; x: number; y: number };

const PARTICLE_COUNT = 6;
const PARTICLE_DISTANCE = 26; // px each particle travels outward

export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    let id = 0;
    const onClick = (e: MouseEvent) => {
      const burst = { id: id++, x: e.clientX, y: e.clientY };
      setBursts((prev) => [...prev, burst]);
      // Clean up after the longest animation finishes.
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burst.id));
      }, 600);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {bursts.map((burst) => (
        <div key={burst.id} style={{ position: "absolute", left: burst.x, top: burst.y }}>
          {/* Expanding ring */}
          <span
            className="burst-ring"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 44,
              height: 44,
              borderRadius: "9999px",
              border: "2px solid var(--color-theme)",
            }}
          />
          {/* Radiating particles */}
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
            const dx = Math.cos(angle) * PARTICLE_DISTANCE;
            const dy = Math.sin(angle) * PARTICLE_DISTANCE;
            return (
              <span
                key={i}
                className="burst-particle"
                style={
                  {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "9999px",
                    backgroundColor: "var(--color-theme)",
                    "--dx": `${dx}px`,
                    "--dy": `${dy}px`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
