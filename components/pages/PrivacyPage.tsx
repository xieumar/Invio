import { LegalDocument, LegalSection } from "@/components/external";

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          At Invio (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;),
          we collect only the information necessary to provide our invoicing,
          client collaboration, and financial reconciliation services.
        </p>
        <p>
          <strong>Account & Contact Data:</strong> When you register for an
          account, we collect your name, business email address, company name,
          billing address, and authentication credentials.
        </p>
        <p>
          <strong>Invoice & Transaction Data:</strong> When creating invoices,
          recording payments, or importing bank statement CSVs, we process
          customer names, line-item descriptions, amounts, currencies, due
          dates, and payment statuses.
        </p>
        <p>
          <strong>Usage & Device Metrics:</strong> We collect non-identifiable
          telemetry such as browser type, operating system, and feature
          interaction statistics to improve platform responsiveness and
          stability.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          We process your personal and business data strictly for the following
          operational purposes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Delivering, maintaining, and improving the Invio invoicing suite and
            client payment portals.
          </li>
          <li>
            Generating PDF invoices, dispatching scheduled payment reminders,
            and logging read receipts.
          </li>
          <li>
            Powering optional AI copilot capabilities (such as invoice draft
            autocompletion and line-item categorization).
          </li>
          <li>
            Preventing fraudulent transactions and ensuring system uptime and
            platform security.
          </li>
          <li>
            Providing responsive customer support and resolving technical
            inquiries.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-data-privacy",
    title: "AI Features & Copilot Privacy",
    content: (
      <>
        <p>
          Invio integrates machine learning algorithms to assist with natural
          language invoice generation, smart line-item suggestions, and bank
          statement categorization.
        </p>
        <p>
          <strong>No Model Training on Private Invoices:</strong> Your financial
          data, invoices, client contacts, and monetary amounts are{" "}
          <em>never</em> used to train public or shared foundation models.
        </p>
        <p>
          All AI inference queries are processed in isolated, stateless
          enterprise environments with zero-data-retention agreements in place.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing-disclosure",
    title: "Data Sharing & Third-Party Disclosure",
    content: (
      <>
        <p>
          We do not sell, rent, or monetize your personal or financial data to
          advertising networks, data brokers, or marketing partners.
        </p>
        <p>
          We share data only with verified sub-processors required to provide
          the core services:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Cloud Infrastructure Providers:</strong> Secure enterprise
            hosting (AWS/Vercel) located in ISO 27001 certified data centers.
          </li>
          <li>
            <strong>Payment Processors:</strong> Stripe and banking API gateways
            for secure card billing, payment link handling, and webhook
            confirmations.
          </li>
          <li>
            <strong>Transactional Email Services:</strong> Encrypted relay
            providers for sending invoice PDFs and receipts to your clients.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security-retention",
    title: "Data Security & Retention",
    content: (
      <>
        <p>
          We implement rigorous administrative, technical, and physical
          safeguards. All data in transit is protected using TLS 1.3 encryption,
          and sensitive database columns are encrypted at rest using AES-256.
        </p>
        <p>
          We retain your invoice history and financial records for as long as
          your account remains active or as required by statutory financial and
          tax auditing regulations. You may request account deletion at any
          time.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices (GDPR & CCPA)",
    content: (
      <>
        <p>
          Regardless of your geographic jurisdiction, Invio provides you with
          the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Access, review, and export all invoices and client records in
            standard formats (JSON or CSV).
          </li>
          <li>
            Correct or update inaccurate company or billing profile information.
          </li>
          <li>
            Request permanent deletion of your account and associated personal
            data (&ldquo;Right to be Forgotten&rdquo;).
          </li>
          <li>
            Opt out of non-essential communications and transactional updates at
            any time.
          </li>
        </ul>
        <p>
          To exercise any of these statutory rights, please submit a request to
          our data protection officer at{" "}
          <a
            href="mailto:privacy@invio.app"
            className="text-purple font-bold hover:underline"
          >
            privacy@invio.app
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "contact-privacy",
    title: "Contact & Inquiries",
    content: (
      <>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or
          our data handling practices, please contact us:
        </p>
        <div className="p-4 rounded-2xl bg-surface-alt dark:bg-surface-alt/40 border border-border/80">
          <p className="font-extrabold text-text-primary">
            Invio Legal & Security Team
          </p>
          <p className="text-sm mt-1">
            Email:{" "}
            <a
              href="mailto:privacy@invio.app"
              className="text-purple font-bold hover:underline"
            >
              privacy@invio.app
            </a>
          </p>
          <p className="text-sm">
            Response Time: Within 48 hours for data subject inquiries
          </p>
        </div>
      </>
    ),
  },
];

export function PrivacyPage() {
  return (
    <div className="w-full flex flex-col pb-24 overflow-hidden">
      <LegalDocument
        badge="Legal & Compliance"
        title="Privacy Policy"
        subtitle="We take the privacy and confidentiality of your billing data seriously. Learn how we collect, safeguard, and process your financial records."
        lastUpdated="March 2026"
        sections={PRIVACY_SECTIONS}
      />
    </div>
  );
}

export default PrivacyPage;
