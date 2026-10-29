"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TourStep {
  /** CSS selector for the element to highlight. Omit for a centred step. */
  target?: string;
  title: string;
  body: string;
}

interface ProductTourProps {
  steps: TourStep[];
  onClose: (completed: boolean) => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;
const CARD_WIDTH = 340;
const GAP = 14;

const MARGIN = 16;
const SMALL_SCREEN = 640;

/**
 * Returns the part of a step's target that is inside the viewport, or null if
 * the target isn't rendered. Clipping keeps the highlight and the card from
 * being laid out relative to off-screen parts of a tall element.
 */
function measure(step: TourStep): Rect | null {
  if (!step.target) return null;
  const el = document.querySelector<HTMLElement>(step.target);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;

  const top = Math.max(r.top, PADDING);
  const left = Math.max(r.left, PADDING);
  const bottom = Math.min(r.bottom, window.innerHeight - PADDING);
  const right = Math.min(r.right, window.innerWidth - PADDING);
  if (bottom <= top || right <= left) {
    // Scrolled out of view: still available, just not visible right now
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }
  return { top, left, width: right - left, height: bottom - top };
}

/** Pick a card position that stays fully inside the viewport. */
function placeCard(
  rect: Rect | null,
  card: { width: number; height: number },
  vw: number,
  vh: number
): React.CSSProperties {
  const maxHeight = vh - MARGIN * 2;
  const base = { maxHeight, width: card.width };

  if (!rect) {
    return {
      ...base,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const clampLeft = (x: number) =>
    Math.min(Math.max(MARGIN, x), vw - card.width - MARGIN);
  const clampTop = (y: number) =>
    Math.min(Math.max(MARGIN, y), vh - card.height - MARGIN);

  // Small screens: the target is scrolled to the top, so dock the card to the
  // bottom edge as a sheet
  if (vw < SMALL_SCREEN) {
    return {
      ...base,
      bottom: `calc(${MARGIN}px + env(safe-area-inset-bottom))`,
      left: clampLeft((vw - card.width) / 2),
    };
  }

  const below = rect.top + rect.height + PADDING + GAP;
  const above = rect.top - PADDING - GAP - card.height;
  const rightX = rect.left + rect.width + PADDING + GAP;
  const leftX = rect.left - PADDING - GAP - card.width;
  const alignedLeft = clampLeft(rect.left);
  const alignedTop = clampTop(rect.top);

  if (below + card.height <= vh - MARGIN) {
    return { ...base, top: below, left: alignedLeft };
  }
  if (above >= MARGIN) {
    return { ...base, top: above, left: alignedLeft };
  }
  if (rightX + card.width <= vw - MARGIN) {
    return { ...base, top: alignedTop, left: rightX };
  }
  if (leftX >= MARGIN) {
    return { ...base, top: alignedTop, left: leftX };
  }
  // Target is too large to sit beside: float the card over its lower edge
  return { ...base, bottom: MARGIN, left: clampLeft(rect.left) };
}

function isAvailable(step: TourStep): boolean {
  return !step.target || measure(step) !== null;
}

export function ProductTour({ steps, onClose }: ProductTourProps) {
  // Steps whose target isn't rendered (e.g. desktop nav on mobile) are skipped
  const [available] = useState(() => steps.filter(isAvailable));
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [cardHeight, setCardHeight] = useState(220);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const step = available[index];
  const isLast = index === available.length - 1;

  const next = useCallback(() => {
    if (isLast) onClose(true);
    else setIndex((i) => i + 1);
  }, [isLast, onClose]);

  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // Keep the highlight aligned with its target
  useLayoutEffect(() => {
    if (!step) return;
    const update = () => setRect(measure(step));

    if (step.target) {
      const el = document.querySelector<HTMLElement>(step.target);
      if (el) {
        const r = el.getBoundingClientRect();
        const small = window.innerWidth < SMALL_SCREEN;
        // Below the lg breakpoint a fixed top bar covers the first ~80px
        const topOffset = window.innerWidth >= 1024 ? 24 : 96;
        const tall = r.height > window.innerHeight * 0.6;
        // Phones: pin the target under the top bar so the bottom sheet has
        // room. Desktop: centre it, unless it's too tall to centre.
        const delta =
          small || tall
            ? r.top - topOffset
            : r.top + r.height / 2 - window.innerHeight / 2;
        window.scrollBy({ top: delta, behavior: "auto" });
      }
    }
    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step]);

  // Focus management: move focus into the card, restore it on close
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    return () => previouslyFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    cardRef.current?.focus();
  }, [index]);

  // Measure the card so placement uses its real height
  useLayoutEffect(() => {
    const h = cardRef.current?.offsetHeight;
    if (h && h !== cardHeight) setCardHeight(h);
  }, [index, rect, cardHeight]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose(false);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      back();
    } else if (e.key === "Tab") {
      // Trap focus inside the card
      const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled])"
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (!step) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardWidth = Math.min(CARD_WIDTH, vw - MARGIN * 2);
  const cardStyle = placeCard(
    rect,
    { width: cardWidth, height: Math.min(cardHeight, vh - MARGIN * 2) },
    vw,
    vh
  );

  return (
    <div className="fixed inset-0 z-300" onKeyDown={onKeyDown}>
      {/* Blocks interaction with the page behind the tour */}
      <div className="absolute inset-0" aria-hidden="true" />

      {rect ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-xl ring-2 ring-purple motion-safe:transition-all motion-safe:duration-200"
          style={{
            top: rect.top - PADDING,
            left: rect.left - PADDING,
            width: rect.width + PADDING * 2,
            height: rect.height + PADDING * 2,
            boxShadow: "0 0 0 9999px rgba(15, 17, 28, 0.65)",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(15,17,28,0.65)]"
        />
      )}

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        aria-describedby="tour-body"
        tabIndex={-1}
        className="absolute overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-2xl outline-none sm:p-5"
        style={cardStyle}
      >
        <div className="mb-1 flex items-start justify-between gap-3">
          <h2
            id="tour-title"
            className="text-base font-bold tracking-tight text-text-primary"
          >
            {step.title}
          </h2>
          <button
            type="button"
            onClick={() => onClose(false)}
            aria-label="Skip tour"
            className="-mr-1 -mt-1 rounded-md p-1 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-purple"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p
          id="tour-body"
          className="text-[13px] leading-relaxed text-text-secondary sm:text-sm"
        >
          {step.body}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
          <span
            className="text-xs font-semibold text-text-muted"
            aria-live="polite"
          >
            Step {index + 1} of {available.length}
          </span>
          <div className="flex items-center gap-2">
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={back}
                className="h-9 rounded-full px-4 text-xs font-bold"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={next}
              className="h-9 rounded-full bg-purple px-5 text-xs font-bold text-white hover:bg-purple-light"
            >
              {isLast ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
