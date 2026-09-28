"use client";

import { useState } from "react";
import { Mail, Building, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "support",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pt-8 sm:pt-14 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
          We&apos;re here to <span className="text-purple">help</span>
        </h1>
        <p className="text-text-secondary mt-3.5 text-base sm:text-lg leading-relaxed">
          Have a question about billing, custom studio deployments, or feature
          requests? Send us a message and our engineering team will get back to
          you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Channels & SLA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-7 sm:p-8 border border-border shadow-card flex flex-col gap-6">
            <h3 className="text-xl font-extrabold text-text-primary">
              Contact Channels
            </h3>

            {/* Email Channel */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple/10 text-purple flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-bold text-text-secondary uppercase">
                  General & Support
                </span>
                <a
                  href="mailto:support@invio.app"
                  className="text-base font-extrabold text-text-primary hover:text-purple transition-colors block mt-0.5"
                >
                  support@invio.app
                </a>
                <span className="text-xs text-text-secondary mt-0.5 block">
                  Response within 24 hours
                </span>
              </div>
            </div>

            {/* Sales Channel */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-paid-text/15 text-paid-text flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-bold text-text-secondary uppercase">
                  Studio & Agency Sales
                </span>
                <a
                  href="mailto:sales@invio.app"
                  className="text-base font-extrabold text-text-primary hover:text-purple transition-colors block mt-0.5"
                >
                  sales@invio.app
                </a>
                <span className="text-xs text-text-secondary mt-0.5 block">
                  Custom invoicing & domains
                </span>
              </div>
            </div>
          </div>

          {/* Quick Security Assurance Card */}
          <div className="bg-surface rounded-2xl p-6 border border-border flex items-center gap-4 text-xs text-text-secondary shadow-xs">
            <ShieldCheck className="w-6 h-6 text-paid-text shrink-0" />
            <p>
              Your contact details are encrypted and kept strictly confidential.
              We never share customer communications with third parties.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="bg-surface rounded-3xl p-7 sm:p-10 border border-border shadow-card">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-paid-text/15 text-paid-text flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-extrabold text-text-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We&apos;ve
                  received your inquiry and will follow up at{" "}
                  <strong>{formData.email}</strong> shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      topic: "support",
                      message: "",
                    });
                  }}
                  className="mt-4 rounded-full font-bold px-6"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-xl font-extrabold text-text-primary mb-1">
                  Send Us a Direct Message
                </h3>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold text-text-primary uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Alexander Whitfield"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="px-4 py-3 bg-surface-alt dark:bg-surface-alt/40 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold text-text-primary uppercase tracking-wider"
                    >
                      Work Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@studio.io"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="px-4 py-3 bg-surface-alt dark:bg-surface-alt/40 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                    />
                  </div>
                </div>

                {/* Topic Selector */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label
                    htmlFor="contact-topic"
                    className="text-xs font-bold text-text-primary uppercase tracking-wider"
                  >
                    Inquiry Topic
                  </label>
                  <Select
                    value={formData.topic}
                    onValueChange={(val) =>
                      setFormData({ ...formData, topic: val })
                    }
                  >
                    <SelectTrigger
                      id="contact-topic"
                      className="w-full data-[size=default]:h-11 h-11 px-4 py-3 bg-surface-alt dark:bg-surface-alt/40 border border-border rounded-xl text-sm text-text-primary outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all font-medium cursor-pointer"
                    >
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border border-border shadow-card rounded-xl text-text-primary">
                      <SelectItem
                        value="support"
                        className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-surface-alt"
                      >
                        General Product Support
                      </SelectItem>
                      <SelectItem
                        value="sales"
                        className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-surface-alt"
                      >
                        Studio & Agency Sales
                      </SelectItem>
                      <SelectItem
                        value="feature"
                        className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-surface-alt"
                      >
                        Feature Request & Feedback
                      </SelectItem>
                      <SelectItem
                        value="billing"
                        className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-surface-alt"
                      >
                        Billing & Invoicing Question
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-bold text-text-primary uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us what you need help with..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="px-4 py-3 bg-surface-alt dark:bg-surface-alt/40 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-purple hover:bg-purple-light text-white font-bold h-12 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
