"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  Clock,
  FileText,
  ChevronRight,
} from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalDocumentProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalDocument({
  badge,
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalDocumentProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <article className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pt-8 sm:pt-14 pb-20">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-purple transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mb-12 sm:mb-16">
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          {badge}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
          {title}
        </h1>
        <p className="text-text-secondary mt-3.5 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
        <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-text-secondary">
          <Clock className="w-4 h-4 text-purple" />
          <span>Last modified: {lastUpdated}</span>
        </div>
      </header>

      {/* Main Layout: Sticky Sidebar TOC + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-card">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border text-text-primary font-extrabold text-sm">
              <FileText className="w-4 h-4 text-purple" />
              <span>Table of Contents</span>
            </div>
            <nav
              className="flex flex-col gap-1.5"
              aria-label="Table of contents"
            >
              {sections.map((section, idx) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                      isActive
                        ? "bg-purple text-white shadow-sm"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-alt dark:hover:bg-surface-alt/50"
                    }`}
                  >
                    <span className="truncate">
                      {idx + 1}. {section.title}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive
                          ? "text-white"
                          : "text-text-secondary/50 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3 text-xs text-text-secondary">
              <ShieldCheck className="w-4 h-4 text-paid-text shrink-0" />
              <span>GDPR, CCPA & SOC-2 compliance certified</span>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <div className="lg:col-span-8 flex flex-col gap-12 bg-surface rounded-3xl p-6 sm:p-12 border border-border shadow-card">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 flex flex-col gap-4 text-text-secondary text-sm sm:text-base leading-relaxed"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight flex items-center gap-3">
                <span className="text-purple text-base font-extrabold bg-purple/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{section.title}</span>
              </h2>
              <div className="space-y-4 pt-1">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

export default LegalDocument;
