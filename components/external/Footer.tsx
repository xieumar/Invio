import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-[#141625] text-white mt-24">
      {/* Pre-footer Newsletter / Quick CTA strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12">
        <div
          className="
            bg-purple text-white 
            rounded-3xl p-8 sm:p-12 
            shadow-xl 
            flex flex-col lg:flex-row lg:items-center lg:justify-between 
            gap-8
          "
        >
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Get Started in Minutes
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Automate your billing and master your cash flow.
            </h3>
            <p className="mt-2 text-white/80 text-[15px] leading-relaxed">
              Create professional invoices, import transaction CSVs, and let AI
              categorize your small business finances.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              asChild
              className="
                rounded-full bg-white hover:bg-[#f8f8fb] text-purple 
                font-bold text-[15px] px-6 h-12 shadow-sm 
                transition-all duration-200
              "
            >
              <Link
                href="/invoices"
                className="no-underline flex items-center gap-2"
              >
                <span>Explore Live Workspace</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Info (Spans 2 columns on desktop) */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline group w-fit"
            >
              <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Invio"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Invio<span className="text-purple">.</span>
              </span>
            </Link>
            <p className="text-[14px] text-[#888eb0] leading-relaxed max-w-sm">
              The AI-powered invoicing and small-business finance workspace.
              Eliminate manual paperwork, track expenses, and get paid faster.
            </p>
            <div className="flex items-center gap-4 text-[#888eb0] pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Community"
                className="hover:text-purple transition-colors p-1"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@invio.app"
                aria-label="Email Support"
                className="hover:text-purple transition-colors p-1"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Share"
                className="hover:text-purple transition-colors p-1"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-bold tracking-wider text-white uppercase">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-[#888eb0] list-none p-0 m-0">
              <li>
                <Link
                  href="/features"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/invoices"
                  className="hover:text-purple-light transition-colors no-underline flex items-center gap-1.5"
                >
                  <span>Live App</span>
                  <span className="text-[10px] bg-purple/20 text-purple-light font-bold px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-bold tracking-wider text-white uppercase">
              Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-[#888eb0] list-none p-0 m-0">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@invio.app"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  support@invio.app
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-bold tracking-wider text-white uppercase">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-[#888eb0] list-none p-0 m-0">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-purple-light transition-colors no-underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Status */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#888eb0]">
          <p>© 2026 Invio. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-paid-text animate-pulse" />
              <span className="text-[#dfe3fa] text-[12px] font-medium">
                Systems Operational
              </span>
            </div>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors no-underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors no-underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
