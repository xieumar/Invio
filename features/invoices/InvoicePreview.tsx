"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { InvoiceView } from "./pdf/view";

/**
 * On-screen versions of the three PDF layouts. They take the same
 * InvoiceView the PDF templates use, so what you see here matches the
 * downloaded PDF. Kept in step with features/invoices/pdf/*Template.tsx.
 */

const PAGE_W = 595;
const A4_H = 842;

/**
 * Lays children out on a 595px-wide page and scales it to fit the container.
 * `fixedA4` crops to one A4 page (for thumbnails); otherwise the page grows
 * with its content (for the real invoice).
 */
export function ScaledPage({
  children,
  fixedA4 = false,
  className,
}: {
  children: React.ReactNode;
  fixedA4?: boolean;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [contentH, setContentH] = useState(A4_H);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      setScale(o.clientWidth / PAGE_W);
      setContentH(Math.max(i.scrollHeight, A4_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  const pageH = fixedA4 ? A4_H : contentH;

  return (
    <div
      ref={outer}
      className={cn(
        "relative w-full overflow-hidden rounded-md border border-border bg-white shadow-sm",
        className
      )}
      style={{ height: pageH * scale }}
    >
      <div
        ref={inner}
        style={{
          width: PAGE_W,
          minHeight: fixedA4 ? undefined : A4_H,
          height: fixedA4 ? A4_H : undefined,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 9.5,
          lineHeight: 1.5,
          color: "#4B5563",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Logo({ v, style }: { v: InvoiceView; style?: React.CSSProperties }) {
  if (!v.issuer.logoUrl) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- data URL from the business profile
    <img
      src={v.issuer.logoUrl}
      alt=""
      style={{ objectFit: "contain", ...style }}
    />
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </>
  );
}

function PayValue({
  line,
  color,
}: {
  line: InvoiceView["paymentLines"][number];
  color: string;
}) {
  return (
    <span style={{ color, wordBreak: "break-word" }}>
      {line.isLink ? (
        <a
          href={line.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color }}
        >
          {line.value}
        </a>
      ) : (
        line.value
      )}
    </span>
  );
}

/* ----------------------------- Minimal ----------------------------- */

function MinimalLayout({ v }: { v: InvoiceView }) {
  const INK = "#1F2937";
  const MUTED = "#9CA3AF";
  const label: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
    marginBottom: 7,
  };
  const meta = [
    ["INVOICE NO", v.id],
    ["DATE", v.issued],
    ["DUE DATE", v.due],
    ["TERMS", v.terms],
    ["STATUS", v.statusLabel],
  ];

  return (
    <div style={{ padding: "56px 52px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 56,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 5,
            color: INK,
          }}
        >
          INVOICE
        </div>
        {v.issuer.logoUrl ? (
          <Logo
            v={v}
            style={{ width: 140, height: 60, objectPosition: "right" }}
          />
        ) : (
          <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>
            {v.issuer.name}
          </div>
        )}
      </div>

      <div style={{ display: "flex", marginBottom: 44 }}>
        <div style={{ flex: 1, paddingRight: 14 }}>
          <div style={label}>Issued to</div>
          <div style={{ fontWeight: 700, color: INK }}>{v.clientName}</div>
          <Lines lines={[...v.clientAddress, v.clientEmail]} />
        </div>
        <div style={{ flex: 1, paddingRight: 14 }}>
          <div style={label}>From</div>
          {v.issuer.name && (
            <div style={{ fontWeight: 700, color: INK }}>{v.issuer.name}</div>
          )}
          <Lines lines={[...v.issuer.address, ...v.issuerContact]} />
        </div>
        <div style={{ width: 170 }}>
          {meta.map(([k, val]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 8, letterSpacing: 1, color: MUTED }}>
                {k}
              </span>
              <span style={{ fontWeight: 700, color: INK }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          paddingBottom: 9,
          borderBottom: `1px solid ${INK}`,
          ...label,
          marginBottom: 0,
        }}
      >
        <div style={{ flex: 1 }}>Description</div>
        <div style={{ width: 80, textAlign: "center" }}>Rate</div>
        <div style={{ width: 50, textAlign: "center" }}>Qty</div>
        <div style={{ width: 80, textAlign: "right" }}>Total</div>
      </div>
      {v.items.map((it) => (
        <div key={it.id} style={{ display: "flex", padding: "9px 0" }}>
          <div style={{ flex: 1, paddingRight: 10 }}>{it.name}</div>
          <div style={{ width: 80, textAlign: "center" }}>{it.price}</div>
          <div style={{ width: 50, textAlign: "center" }}>{it.quantity}</div>
          <div style={{ width: 80, textAlign: "right" }}>{it.amount}</div>
        </div>
      ))}
      <div style={{ borderBottom: `1px solid ${INK}`, marginTop: 4 }} />

      <div style={{ marginLeft: "auto", width: 230, marginTop: 14 }}>
        {v.adjustments.map((a) => (
          <div
            key={a.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "3px 0",
            }}
          >
            <span>{a.label}</span>
            <span>{a.value}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
            paddingTop: 10,
            borderTop: `1px solid ${INK}`,
          }}
        >
          <span style={{ ...label, fontSize: 9, marginBottom: 0 }}>
            {v.totalLabel}
          </span>
          <span style={{ fontWeight: 700, fontSize: 18, color: INK }}>
            {v.total}
          </span>
        </div>
      </div>

      {(v.paymentLines.length > 0 || v.notes) && (
        <div style={{ display: "flex", marginTop: 44 }}>
          {v.paymentLines.length > 0 && (
            <div style={{ flex: 1, paddingRight: 20 }}>
              <div style={label}>Payment info</div>
              {v.paymentLines.map((l) => (
                <div key={l.key} style={{ display: "flex", marginBottom: 3 }}>
                  <span style={{ width: 82, color: MUTED, flexShrink: 0 }}>
                    {l.label}
                  </span>
                  <PayValue line={l} color={INK} />
                </div>
              ))}
            </div>
          )}
          {v.notes && (
            <div style={{ flex: 1 }}>
              <div style={label}>Notes</div>
              <div style={{ whiteSpace: "pre-wrap" }}>{v.notes}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Classic ----------------------------- */

function ClassicLayout({ v }: { v: InvoiceView }) {
  const INK = "#222222";
  const MUTED = "#8A8A8A";
  const label: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
    marginBottom: 7,
  };
  const meta = [
    ["INVOICE NO:", v.id],
    ["DATE:", v.issued],
    ["DUE DATE:", v.due],
    ["TERMS:", v.terms],
    ["STATUS:", v.statusLabel],
  ];

  return (
    <div style={{ padding: "48px 44px", color: "#444" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
          marginBottom: 34,
        }}
      >
        {v.issuer.logoUrl ? (
          <Logo
            v={v}
            style={{ width: 150, height: 56, objectPosition: "left" }}
          />
        ) : (
          <div style={{ fontWeight: 700, fontSize: 17, color: INK }}>
            {v.issuer.name}
          </div>
        )}
        <div
          style={{
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 2,
            color: INK,
          }}
        >
          INVOICE
        </div>
      </div>

      <div
        style={{
          background: "#F1F1F1",
          padding: "24px 22px",
          marginBottom: 40,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, paddingRight: 14 }}>
            <div style={label}>Issued to</div>
            <div style={{ fontWeight: 700, color: INK }}>{v.clientName}</div>
            <Lines lines={[...v.clientAddress, v.clientEmail]} />
          </div>
          <div style={{ width: 190 }}>
            {meta.map(([k, val]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 8,
                    letterSpacing: 1,
                    color: INK,
                  }}
                >
                  {k}
                </span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 22,
          }}
        >
          <div style={{ flex: 1, paddingRight: 14 }}>
            <div style={label}>From</div>
            {v.issuer.name && (
              <div style={{ fontWeight: 700, color: INK }}>{v.issuer.name}</div>
            )}
            <Lines lines={[...v.issuer.address, ...v.issuerContact]} />
          </div>
          {v.paymentLines.length > 0 && (
            <div style={{ width: 190 }}>
              <div style={label}>Payment info</div>
              {v.paymentLines.map((l) => (
                <div key={l.key} style={{ display: "flex", marginBottom: 3 }}>
                  <span style={{ width: 62, color: MUTED, flexShrink: 0 }}>
                    {l.label}
                  </span>
                  <PayValue line={l} color={INK} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "0 8px" }}>
        <div
          style={{
            display: "flex",
            paddingBottom: 10,
            borderBottom: `1px solid ${INK}`,
            ...label,
            marginBottom: 0,
          }}
        >
          <div style={{ flex: 1 }}>Description</div>
          <div style={{ width: 80, textAlign: "center" }}>Rate</div>
          <div style={{ width: 50, textAlign: "center" }}>Qty</div>
          <div style={{ width: 80, textAlign: "right" }}>Total</div>
        </div>
        {v.items.map((it) => (
          <div key={it.id} style={{ display: "flex", padding: "9px 4px" }}>
            <div style={{ flex: 1, paddingRight: 10 }}>{it.name}</div>
            <div style={{ width: 80, textAlign: "center" }}>{it.price}</div>
            <div style={{ width: 50, textAlign: "center" }}>{it.quantity}</div>
            <div style={{ width: 80, textAlign: "right" }}>{it.amount}</div>
          </div>
        ))}
        <div style={{ borderBottom: `1px solid ${INK}`, marginTop: 6 }} />
        <div style={{ marginLeft: "auto", width: 240, marginTop: 12 }}>
          {v.adjustments.map((a) => (
            <div
              key={a.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "3px 0",
              }}
            >
              <span>{a.label}</span>
              <span>{a.value}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 6,
              paddingTop: 8,
            }}
          >
            <span style={{ ...label, fontSize: 11, marginBottom: 0 }}>
              {v.totalLabel}
            </span>
            <span style={{ fontWeight: 700, fontSize: 18, color: INK }}>
              {v.total}
            </span>
          </div>
        </div>
      </div>

      {v.notes && (
        <div style={{ marginTop: 40, padding: "0 8px" }}>
          <div style={label}>Notes</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{v.notes}</div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Bold ------------------------------- */

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  paid: { bg: "#D1FAE5", fg: "#065F46" },
  pending: { bg: "#FEF3C7", fg: "#92400E" },
  overdue: { bg: "#FEE2E2", fg: "#991B1B" },
  draft: { bg: "#E5E7EB", fg: "#374151" },
  cancelled: { bg: "#E5E7EB", fg: "#374151" },
};

function BoldLayout({ v }: { v: InvoiceView }) {
  const NAVY = "#1E2139";
  const ACCENT = "#7C5DFA";
  const SOFT = "#F3F0FF";
  const INK = "#111827";
  const MUTED = "#6B7280";
  const status = STATUS_COLORS[v.status] ?? STATUS_COLORS.pending;
  const label: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 1.2,
    color: ACCENT,
    textTransform: "uppercase",
    marginBottom: 7,
  };
  const name: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 11,
    color: INK,
    marginBottom: 3,
  };
  const details = [
    ["Issued", v.issued],
    ["Due", v.due],
    ["Terms", v.terms],
    ...(v.description ? [["Project", v.description]] : []),
  ];

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          background: NAVY,
          borderRadius: 10,
          padding: "26px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {v.issuer.logoUrl ? (
          <div style={{ background: "#fff", borderRadius: 8, padding: 8 }}>
            <Logo
              v={v}
              style={{ width: 110, height: 40, objectPosition: "left" }}
            />
          </div>
        ) : (
          <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>
            {v.issuer.name}
          </div>
        )}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 3,
              color: "#fff",
            }}
          >
            INVOICE
          </div>
          <div style={{ fontSize: 10.5, color: "#C4B5FD", marginTop: 4 }}>
            #{v.id}
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "3px 9px",
              borderRadius: 10,
              background: status.bg,
              color: status.fg,
              fontWeight: 700,
              fontSize: 7.5,
              letterSpacing: 0.8,
            }}
          >
            {v.statusLabel}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: 30 }}>
        <div style={{ flex: 1, paddingRight: 14 }}>
          <div style={label}>From</div>
          {v.issuer.name && <div style={name}>{v.issuer.name}</div>}
          <Lines lines={[...v.issuer.address, ...v.issuerContact]} />
        </div>
        <div style={{ flex: 1, paddingRight: 14 }}>
          <div style={label}>Bill to</div>
          <div style={name}>{v.clientName}</div>
          <Lines lines={[...v.clientAddress, v.clientEmail]} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={label}>Details</div>
          {details.map(([k, val]) => (
            <div key={k} style={{ display: "flex", marginBottom: 4 }}>
              <span style={{ width: 54, color: MUTED, flexShrink: 0 }}>
                {k}
              </span>
              <span style={{ fontWeight: 700, color: INK }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          background: SOFT,
          borderRadius: 5,
          padding: "9px 12px",
          color: ACCENT,
          fontWeight: 700,
          fontSize: 8,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        <div style={{ flex: 1 }}>Description</div>
        <div style={{ width: 44, textAlign: "center" }}>Qty</div>
        <div style={{ width: 86, textAlign: "right" }}>Unit price</div>
        <div style={{ width: 86, textAlign: "right" }}>Amount</div>
      </div>
      {v.items.map((it) => (
        <div
          key={it.id}
          style={{
            display: "flex",
            padding: "11px 12px",
            borderBottom: "0.5px solid #E5E7EB",
          }}
        >
          <div
            style={{ flex: 1, paddingRight: 10, fontWeight: 700, color: INK }}
          >
            {it.name}
          </div>
          <div style={{ width: 44, textAlign: "center" }}>{it.quantity}</div>
          <div style={{ width: 86, textAlign: "right" }}>{it.price}</div>
          <div
            style={{
              width: 86,
              textAlign: "right",
              fontWeight: 700,
              color: INK,
            }}
          >
            {it.amount}
          </div>
        </div>
      ))}

      <div style={{ marginLeft: "auto", width: 250, marginTop: 14 }}>
        {v.adjustments.map((a) => (
          <div
            key={a.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 12px",
            }}
          >
            <span>{a.label}</span>
            <span style={{ fontWeight: 700, color: INK }}>{a.value}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: ACCENT,
            borderRadius: 8,
            padding: "13px 14px",
            marginTop: 8,
            color: "#fff",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 9.5,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {v.totalLabel}
          </span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>{v.total}</span>
        </div>
      </div>

      {(v.paymentLines.length > 0 || v.notes) && (
        <div style={{ display: "flex", marginTop: 30 }}>
          {v.paymentLines.length > 0 && (
            <div
              style={{
                flex: 1.3,
                background: SOFT,
                borderRadius: 8,
                padding: 15,
              }}
            >
              <div style={label}>How to pay</div>
              {v.paymentLines.map((l) => (
                <div key={l.key} style={{ display: "flex", marginBottom: 4 }}>
                  <span style={{ width: 80, color: MUTED, flexShrink: 0 }}>
                    {l.label}
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    <PayValue line={l} color={l.isLink ? ACCENT : INK} />
                  </span>
                </div>
              ))}
            </div>
          )}
          {v.notes && (
            <div style={{ flex: 1, padding: "15px 18px" }}>
              <div style={label}>Notes</div>
              <div style={{ whiteSpace: "pre-wrap" }}>{v.notes}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Public ------------------------------ */

export function InvoicePreview({
  view,
  template,
  fixedA4 = false,
  className,
}: {
  view: InvoiceView;
  template: InvoiceTemplate;
  fixedA4?: boolean;
  className?: string;
}) {
  return (
    <ScaledPage fixedA4={fixedA4} className={className}>
      {template === "classic" ? (
        <ClassicLayout v={view} />
      ) : template === "bold" ? (
        <BoldLayout v={view} />
      ) : (
        <MinimalLayout v={view} />
      )}
    </ScaledPage>
  );
}
