"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useBusinessProfile } from "@/features/onboarding/useBusinessProfile";
import { InvoiceDocument } from "./InvoiceDocument";
import { DEFAULT_INVOICE_TEMPLATE } from "./templates";

export function useDownloadInvoicePdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { data: profile } = useBusinessProfile();

  /** Uses the template chosen in Settings unless one is passed explicitly. */
  async function downloadPdf(invoice: Invoice, template?: InvoiceTemplate) {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <InvoiceDocument
          invoice={invoice}
          profile={profile}
          template={
            template ?? profile?.invoiceTemplate ?? DEFAULT_INVOICE_TEMPLATE
          }
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoice.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }

  return { downloadPdf, isGenerating };
}
