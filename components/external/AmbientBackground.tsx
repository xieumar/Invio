"use client";

import { Parallax } from "@/components/motion";

interface Blob {
  /** Vertical position down the page */
  top: string;
  /** Horizontal anchor: distance from the left edge */
  left: string;
  size: number;
  /** Any CSS colour; faded to transparent at the edge */
  color: string;
  speed: number;
}

const BLOBS: Blob[] = [
  { top: "-4%", left: "50%", size: 900, color: "var(--color-purple)", speed: 0.15 },
  { top: "14%", left: "-6%", size: 720, color: "var(--color-purple-light)", speed: -0.25 },
  { top: "24%", left: "92%", size: 640, color: "var(--color-paid-text)", speed: 0.3 },
  { top: "46%", left: "10%", size: 760, color: "var(--color-purple)", speed: 0.2 },
  { top: "62%", left: "88%", size: 700, color: "var(--color-pending-text)", speed: -0.2 },
  { top: "82%", left: "40%", size: 820, color: "var(--color-purple-light)", speed: 0.25 },
];

// Fine film-grain texture, tiled; adds tactility so large gradients don't look flat
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

// Fades the whole background out at the top and bottom so it never shows a
// hard edge against the header or footer
const EDGE_FADE =
  "linear-gradient(to bottom, transparent 0, #000 280px, #000 calc(100% - 280px), transparent 100%)";

/**
 * Page-length atmosphere: soft coloured light pools that drift at different
 * speeds as you scroll, under a faint grain. Place inside a `relative isolate`
 * wrapper; it fills the wrapper and sits behind its content.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      {BLOBS.map((blob) => (
        <Parallax
          key={`${blob.top}-${blob.left}`}
          speed={blob.speed}
          className="absolute inset-0"
        >
          <div
            style={{
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle at center, color-mix(in srgb, ${blob.color} 22%, transparent) 0%, transparent 68%)`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        </Parallax>
      ))}

      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-soft-light"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
}
