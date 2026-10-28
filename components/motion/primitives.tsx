"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

const EASE = [0.22, 1, 0.36, 1] as const;

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Direction the element moves as it appears ("left" slides in from the right) */
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
  /** Also resolve from a blur, for a more cinematic reveal */
  blur?: boolean;
}

/** Fades and slides content in, on mount or as it scrolls into view. */
export function FadeIn({
  children,
  className,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  immediate = false,
  blur = false,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const hidden = {
    opacity: 0,
    ...(reduce ? {} : offsetFor(direction, distance)),
    ...(blur && !reduce ? { filter: "blur(10px)" } : {}),
  };
  const shown = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(blur && !reduce ? { filter: "blur(0px)" } : {}),
  };
  const transition = { duration, delay, ease: EASE };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-80px" } })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance */
  stagger?: number;
  delay?: number;
  immediate?: boolean;
}

/** Container that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  immediate = false,
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: { once: true, margin: "-80px" } })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
  scale = 1,
  hoverLift = false,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  /** Starting scale; below 1 makes the item pop up into place */
  scale?: number;
  /** Rise slightly while hovered */
  hoverLift?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(reduce ? {} : { ...offsetFor(direction, distance), scale }),
    },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      whileHover={hoverLift && !reduce ? { y: -8 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/**
 * A bar or line that draws itself in from one end when scrolled into view.
 * Give it its own size and colour via className.
 */
export function Grow({
  className,
  axis = "x",
  delay = 0,
  duration = 0.9,
}: {
  className?: string;
  axis?: "x" | "y";
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} />;

  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: axis === "x" ? "0% 50%" : "50% 0%" }}
      initial={from}
      whileInView={to}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}

interface FloatProps {
  children: ReactNode;
  className?: string;
  /** Peak vertical travel in px */
  amplitude?: number;
  /** Seconds per full cycle */
  duration?: number;
  delay?: number;
}

/** Endless gentle bobbing for decorative elements. */
export function Float({
  children,
  className,
  amplitude = 8,
  duration = 5,
  delay = 0,
}: FloatProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Moves its children vertically as the element crosses the viewport, so they
 * drift at a different pace than the page. Positive speed lags behind the
 * scroll; negative speed runs ahead of it.
 */
export function Parallax({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-200 * speed, 200 * speed]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/**
 * Lifts the content and fades it out as it scrolls off the top of the page.
 * Wrap the hero text with it so it recedes while the preview comes forward.
 */
export function ScrollFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, opacity, scale }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Starts tilted back and flattens to face the viewer as it scrolls into
 * view — a scroll-linked 3D reveal for product screenshots.
 */
export function ScrollTilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div
        style={
          reduce ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Thin brand-coloured bar across the top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-100 h-[3px] bg-linear-to-r from-purple via-purple-light to-purple"
    />
  );
}

/** Counts up from zero to `to` the first time it scrolls into view. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const formatted = value.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/** Smoothly expands and collapses its content (accordions, disclosures). */
export function Collapse({
  open,
  children,
  className,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          className={className}
          style={{ overflow: "hidden" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Subtle lift + scale on hover/tap for cards and buttons. */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
