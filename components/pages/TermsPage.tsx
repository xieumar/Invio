import { LegalDocument, LegalSection } from "@/components/external";

const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By creating an account, accessing, or using Invio
          (&ldquo;Service&rdquo;), you agree to be bound by these Terms of
          Service (&ldquo;Terms&rdquo;) and all applicable laws and regulations.
        </p>
        <p>
          If you do not agree with any of these terms, you are prohibited from
          using or accessing this service. Continued use of Invio confirms your
          unconditional agreement to these terms.
        </p>
      </>
    ),
  },
  {
    id: "user-accounts",
    title: "User Accounts & Security",
    content: (
      <>
        <p>
          To access the platform, you must register for an account using
          authentic and accurate personal or organizational credentials.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials and API tokens.
          </li>
          <li>
            You are liable for all actions, invoices generated, and transactions
            initiated under your credentials.
          </li>
          <li>
            You must immediately notify Invio at{" "}
            <a
              href="mailto:security@invio.app"
              className="text-purple font-bold hover:underline"
            >
              security@invio.app
            </a>{" "}
            if you discover unauthorized access.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "billing-and-payments",
    title: "Subscriptions, Fees & Invoicing",
    content: (
      <>
        <p>
          Certain features of Invio are billed on a recurring subscription basis
          (&ldquo;Starter&rdquo;, &ldquo;Professional&rdquo;,
          &ldquo;Studio&rdquo;).
        </p>
        <p>
          <strong>Payment Terms:</strong> Subscription fees are billed in
          advance on a monthly or annual billing cycle. All payments are
          non-refundable except as specified under our 14-day money-back
          satisfaction guarantee.
        </p>
        <p>
          <strong>Automatic Renewal:</strong> Unless cancelled prior to your
          renewal date, your subscription will automatically renew under
          identical pricing conditions.
        </p>
        <p>
          <strong>Invoice Processing Fees:</strong> If you use integrated
          third-party payment processing (e.g. Stripe) for your client invoices,
          payment processing fees established by Stripe will apply directly to
          transactions.
        </p>
      </>
    ),
  },
  {
    id: "permitted-use",
    title: "Acceptable Use & Prohibited Activities",
    content: (
      <>
        <p>
          You agree not to use Invio for any unlawful, deceptive, or prohibited
          activities, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Issuing fraudulent invoices, deceptive billing notices, or unlawful
            payment demands.
          </li>
          <li>
            Transmitting malicious software, worms, or unauthorized scripts
            through invoice attachments or client portals.
          </li>
          <li>
            Attempting to bypass authentication, probe security vulnerabilities,
            or reverse-engineer the platform code.
          </li>
          <li>
            Engaging in harassment, defamation, or unsolicited mass email
            distribution through the reminder mechanism.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property & Ownership",
    content: (
      <>
        <p>
          <strong>Your Content:</strong> You retain complete ownership and
          intellectual property rights over all logos, invoice designs, client
          lists, line items, and financial records uploaded to Invio.
        </p>
        <p>
          <strong>Invio IP:</strong> The Invio platform, source code, UI
          designs, brand marks, and documentation are the exclusive property of
          Invio and protected by copyright and international intellectual
          property laws.
        </p>
      </>
    ),
  },
  {
    id: "warranty-disclaimer",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>
          Invio is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis without warranties of any kind, whether express
          or implied, including fitness for a particular purpose or
          non-infringement.
        </p>
        <p>
          While we strive for 99.98% platform uptime, we do not warrant that the
          service will be uninterrupted, error-free, or entirely bug-free at all
          times. Invio does not provide certified legal or professional tax
          counsel.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          In no event shall Invio, its directors, employees, or partners be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, including loss of profits, client revenues, or
          business goodwill.
        </p>
        <p>
          Our total aggregate liability under these terms shall not exceed the
          amount paid by you to Invio during the twelve (12) month period
          immediately preceding the event giving rise to liability.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination & Modification",
    content: (
      <>
        <p>
          You may terminate your account at any time through the workspace
          settings. Upon termination, your right to use the platform ceases
          immediately.
        </p>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these Terms with reasonable prior notice, or immediately in the case
          of severe fraudulent activity.
        </p>
        <p>
          Questions about these Terms may be directed to{" "}
          <a
            href="mailto:legal@invio.app"
            className="text-purple font-bold hover:underline"
          >
            legal@invio.app
          </a>
          .
        </p>
      </>
    ),
  },
];

export function TermsPage() {
  return (
    <div className="w-full flex flex-col pb-24 overflow-hidden">
      <LegalDocument
        badge="Legal & Compliance"
        title="Terms of Service"
        subtitle="Please read these terms and conditions carefully before using the Invio platform, client portals, and billing automation services."
        lastUpdated="March 2026"
        sections={TERMS_SECTIONS}
      />
    </div>
  );
}

export default TermsPage;
