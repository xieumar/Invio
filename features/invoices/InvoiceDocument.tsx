import { Document } from "@react-pdf/renderer";
import { buildInvoiceDocument } from "@/lib/invoice-document";
import { buildInvoiceView } from "./pdf/view";
import { MinimalTemplate } from "./pdf/MinimalTemplate";
import { ClassicTemplate } from "./pdf/ClassicTemplate";
import { BoldTemplate } from "./pdf/BoldTemplate";
import { DEFAULT_INVOICE_TEMPLATE } from "./templates";

interface InvoiceDocumentProps {
  invoice: Invoice;
  profile?: BusinessProfile | null;
  template?: InvoiceTemplate;
}

export function InvoiceDocument({
  invoice,
  profile,
  template = DEFAULT_INVOICE_TEMPLATE,
}: InvoiceDocumentProps) {
  const view = buildInvoiceView(invoice, profile);
  const author = buildInvoiceDocument(invoice, profile).issuer.name;

  return (
    <Document
      title={`Invoice ${invoice.id}`}
      author={author ?? undefined}
    >
      {template === "classic" ? (
        <ClassicTemplate v={view} />
      ) : template === "bold" ? (
        <BoldTemplate v={view} />
      ) : (
        <MinimalTemplate v={view} />
      )}
    </Document>
  );
}
