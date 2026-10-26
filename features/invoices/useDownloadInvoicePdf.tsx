"use client";

import { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from "@react-pdf/renderer";
import { toMajorUnits } from "@/lib/money";

// Register font (optional: falls back to Helvetica if unavailable)
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2", fontWeight: 700 },
  ],
});

const PURPLE = "#7C5DFA";
const DARK = "#0C0E16";
const MUTED = "#6B7280";
const SURFACE = "#F9FAFB";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: DARK,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    backgroundColor: WHITE,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: `1pt solid #E5E7EB`,
  },
  logo: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: PURPLE,
    marginBottom: 8,
  },
  senderAddress: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.6,
  },
  invoiceIdBlock: {
    alignItems: "flex-end",
  },
  invoiceId: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 4,
  },
  invoiceDescription: {
    fontSize: 10,
    color: MUTED,
  },

  // Meta grid
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 2,
  },
  metaAddress: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.6,
  },

  // Table
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: `1pt solid #E5E7EB`,
    paddingBottom: 8,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottom: `0.5pt solid #F3F4F6`,
  },
  tableRowAlt: {
    backgroundColor: SURFACE,
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 2, textAlign: "right" },
  colTotal: { flex: 2, textAlign: "right" },
  cellText: {
    fontSize: 10,
    color: DARK,
  },

  // Totals
  totalsWrapper: {
    alignSelf: "flex-end",
    width: 240,
    marginBottom: 32,
    borderRadius: 6,
    overflow: "hidden",
    border: `1pt solid #E5E7EB`,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottom: `0.5pt solid #F3F4F6`,
  },
  totalsLabel: {
    fontSize: 10,
    color: MUTED,
  },
  totalsValue: {
    fontSize: 10,
    color: DARK,
    fontFamily: "Helvetica-Bold",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#1E2139",
  },
  grandTotalLabel: {
    fontSize: 12,
    color: WHITE,
    fontFamily: "Helvetica-Bold",
  },
  grandTotalValue: {
    fontSize: 14,
    color: WHITE,
    fontFamily: "Helvetica-Bold",
  },

  // Notes
  notes: {
    borderTop: `1pt solid #E5E7EB`,
    paddingTop: 14,
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 8,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 10,
    color: MUTED,
    lineHeight: 1.6,
  },
});

function formatAmount(minor: number, decimals = 2): string {
  return `£${toMajorUnits(minor, decimals).toFixed(decimals)}`;
}

function formatSimple(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

interface InvoiceDocumentProps {
  invoice: Invoice;
}

function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  const showTax = !!(invoice.taxRate && invoice.taxRate > 0 && invoice.taxAmount);
  const showDiscount = !!(invoice.discountAmount && invoice.discountAmount > 0);
  const showSubtotal = showTax || showDiscount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Invio</Text>
            <View style={styles.senderAddress}>
              {invoice.senderAddress.street ? <Text>{invoice.senderAddress.street}</Text> : null}
              {invoice.senderAddress.city ? <Text>{invoice.senderAddress.city}</Text> : null}
              {invoice.senderAddress.postCode ? <Text>{invoice.senderAddress.postCode}</Text> : null}
              {invoice.senderAddress.country ? <Text>{invoice.senderAddress.country}</Text> : null}
            </View>
          </View>
          <View style={styles.invoiceIdBlock}>
            <Text style={styles.invoiceId}>#{invoice.id}</Text>
            <Text style={styles.invoiceDescription}>{invoice.description}</Text>
          </View>
        </View>

        {/* Meta */}
        <View style={styles.metaGrid}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Invoice Date</Text>
            <Text style={styles.metaValue}>{invoice.createdAt}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Payment Due</Text>
            <Text style={styles.metaValue}>{invoice.paymentDue}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Bill To</Text>
            <Text style={styles.metaValue}>{invoice.clientName}</Text>
            <View style={styles.metaAddress}>
              {invoice.clientAddress.street ? <Text>{invoice.clientAddress.street}</Text> : null}
              {invoice.clientAddress.city ? <Text>{invoice.clientAddress.city}</Text> : null}
              {invoice.clientAddress.postCode ? <Text>{invoice.clientAddress.postCode}</Text> : null}
              {invoice.clientAddress.country ? <Text>{invoice.clientAddress.country}</Text> : null}
            </View>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Sent To</Text>
            <Text style={styles.metaValue}>{invoice.clientEmail}</Text>
          </View>
        </View>

        {/* Items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.colName}><Text style={styles.tableHeaderCell}>Item Name</Text></View>
            <View style={styles.colQty}><Text style={[styles.tableHeaderCell, { textAlign: "center" }]}>QTY</Text></View>
            <View style={styles.colPrice}><Text style={[styles.tableHeaderCell, { textAlign: "right" }]}>Price</Text></View>
            <View style={styles.colTotal}><Text style={[styles.tableHeaderCell, { textAlign: "right" }]}>Total</Text></View>
          </View>

          {invoice.items.map((item, i) => (
            <View key={item.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
              <View style={styles.colName}><Text style={styles.cellText}>{item.name}</Text></View>
              <View style={styles.colQty}><Text style={[styles.cellText, { textAlign: "center" }]}>{item.quantity}</Text></View>
              <View style={styles.colPrice}><Text style={[styles.cellText, { textAlign: "right" }]}>{formatSimple(item.price)}</Text></View>
              <View style={styles.colTotal}><Text style={[styles.cellText, { textAlign: "right" }]}>{formatSimple(item.total)}</Text></View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsWrapper}>
          {showSubtotal && invoice.subtotal !== undefined && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>{formatAmount(invoice.subtotal)}</Text>
            </View>
          )}
          {showTax && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax ({invoice.taxRate}%)</Text>
              <Text style={styles.totalsValue}>{formatAmount(invoice.taxAmount!)}</Text>
            </View>
          )}
          {showDiscount && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Discount</Text>
              <Text style={styles.totalsValue}>-{formatAmount(invoice.discountAmount!)}</Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Amount Due</Text>
            <Text style={styles.grandTotalValue}>{formatSimple(invoice.total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export function useDownloadInvoicePdf() {
  const [isGenerating, setIsGenerating] = useState(false);

  async function downloadPdf(invoice: Invoice) {
    setIsGenerating(true);
    try {
      const blob = await pdf(<InvoiceDocument invoice={invoice} />).toBlob();
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
