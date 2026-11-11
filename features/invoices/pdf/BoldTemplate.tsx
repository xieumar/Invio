import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { InvoiceView } from "./view";
import { PageNumber, PaymentValue } from "./parts";

const NAVY = "#1E2139";
const ACCENT = "#7C5DFA";
const ACCENT_SOFT = "#F3F0FF";
const INK = "#111827";
const TEXT = "#4B5563";
const MUTED = "#6B7280";
const LINE = "#E5E7EB";

const STATUS_COLORS: Record<InvoiceStatus, { bg: string; fg: string }> = {
  paid: { bg: "#D1FAE5", fg: "#065F46" },
  pending: { bg: "#FEF3C7", fg: "#92400E" },
  overdue: { bg: "#FEE2E2", fg: "#991B1B" },
  draft: { bg: "#E5E7EB", fg: "#374151" },
  cancelled: { bg: "#E5E7EB", fg: "#374151" },
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingBottom: 64,
    paddingHorizontal: 40,
  },

  banner: {
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 26,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logoChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
  },
  logo: {
    width: 110,
    height: 40,
    objectFit: "contain",
    objectPosition: "left",
  },
  wordmark: { fontFamily: "Helvetica-Bold", fontSize: 18, color: "#FFFFFF" },
  titleBlock: { alignItems: "flex-end" },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    letterSpacing: 3,
    color: "#FFFFFF",
  },
  invoiceId: { fontSize: 10.5, color: "#C4B5FD", marginTop: 4 },
  badge: {
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 10,
  },
  badgeText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    letterSpacing: 0.8,
  },

  parties: { flexDirection: "row", marginBottom: 30 },
  party: { flex: 1, paddingRight: 14 },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: ACCENT,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: INK,
    marginBottom: 3,
  },
  line: { lineHeight: 1.55 },
  detailRow: { flexDirection: "row", marginBottom: 4 },
  detailLabel: { width: 54, color: MUTED },
  detailValue: { flex: 1, fontFamily: "Helvetica-Bold", color: INK },

  thead: {
    flexDirection: "row",
    backgroundColor: ACCENT_SOFT,
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  th: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: ACCENT,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderBottom: `0.5pt solid ${LINE}`,
  },
  colName: { flex: 1, paddingRight: 10 },
  colQty: { width: 44, textAlign: "center" },
  colPrice: { width: 86, textAlign: "right" },
  colAmount: { width: 86, textAlign: "right" },
  strong: { fontFamily: "Helvetica-Bold", color: INK },

  totals: { alignSelf: "flex-end", width: 250, marginTop: 14 },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop: 8,
  },
  grandLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    letterSpacing: 1,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  grandValue: { fontFamily: "Helvetica-Bold", fontSize: 18, color: "#FFFFFF" },

  lower: { flexDirection: "row", marginTop: 30 },
  pay: {
    flex: 1.3,
    backgroundColor: ACCENT_SOFT,
    borderRadius: 8,
    padding: 15,
  },
  payRow: { flexDirection: "row", marginBottom: 4 },
  payLabel: { width: 80, color: MUTED },
  payValue: { flex: 1, fontFamily: "Helvetica-Bold", color: INK },
  notes: { flex: 1, paddingVertical: 15, paddingHorizontal: 18 },
});

export function BoldTemplate({ v }: { v: InvoiceView }) {
  const status = STATUS_COLORS[v.status] ?? STATUS_COLORS.pending;

  return (
    <Page size="A4" style={s.page}>
      <View style={s.banner}>
        {v.issuer.logoUrl ? (
          <View style={s.logoChip}>
            <Image src={v.issuer.logoUrl} style={s.logo} />
          </View>
        ) : (
          <Text style={s.wordmark}>{v.issuer.name ?? ""}</Text>
        )}
        <View style={s.titleBlock}>
          <Text style={s.title}>INVOICE</Text>
          <Text style={s.invoiceId}>#{v.id}</Text>
          <View style={[s.badge, { backgroundColor: status.bg }]}>
            <Text style={[s.badgeText, { color: status.fg }]}>
              {v.statusLabel}
            </Text>
          </View>
        </View>
      </View>

      <View style={s.parties}>
        <View style={s.party}>
          <Text style={s.label}>From</Text>
          {v.issuer.name ? <Text style={s.name}>{v.issuer.name}</Text> : null}
          {v.issuer.address.map((l, i) => (
            <Text key={i} style={s.line}>
              {l}
            </Text>
          ))}
          {v.issuerContact.map((l, i) => (
            <Text key={`c${i}`} style={s.line}>
              {l}
            </Text>
          ))}
        </View>

        <View style={s.party}>
          <Text style={s.label}>Bill to</Text>
          <Text style={s.name}>{v.clientName}</Text>
          {v.clientAddress.map((l, i) => (
            <Text key={i} style={s.line}>
              {l}
            </Text>
          ))}
          <Text style={s.line}>{v.clientEmail}</Text>
        </View>

        <View style={[s.party, { paddingRight: 0 }]}>
          <Text style={s.label}>Details</Text>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Issued</Text>
            <Text style={s.detailValue}>{v.issued}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Due</Text>
            <Text style={s.detailValue}>{v.due}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Terms</Text>
            <Text style={s.detailValue}>{v.terms}</Text>
          </View>
          {v.description ? (
            <View style={s.detailRow}>
              <Text style={s.detailLabel}>Project</Text>
              <Text style={s.detailValue}>{v.description}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View>
        <View style={s.thead} wrap={false}>
          <View style={s.colName}>
            <Text style={s.th}>Description</Text>
          </View>
          <View style={s.colQty}>
            <Text style={s.th}>Qty</Text>
          </View>
          <View style={s.colPrice}>
            <Text style={s.th}>Unit price</Text>
          </View>
          <View style={s.colAmount}>
            <Text style={s.th}>Amount</Text>
          </View>
        </View>
        {v.items.map((item) => (
          <View key={item.id} style={s.row} wrap={false}>
            <View style={s.colName}>
              <Text style={s.strong}>{item.name}</Text>
            </View>
            <View style={s.colQty}>
              <Text>{item.quantity}</Text>
            </View>
            <View style={s.colPrice}>
              <Text>{item.price}</Text>
            </View>
            <View style={s.colAmount}>
              <Text style={s.strong}>{item.amount}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={s.totals} wrap={false}>
        {v.adjustments.map((a) => (
          <View key={a.label} style={s.totalsRow}>
            <Text>{a.label}</Text>
            <Text style={s.strong}>{a.value}</Text>
          </View>
        ))}
        <View style={s.grand}>
          <Text style={s.grandLabel}>{v.totalLabel}</Text>
          <Text style={s.grandValue}>{v.total}</Text>
        </View>
      </View>

      {v.paymentLines.length > 0 || v.notes ? (
        <View style={s.lower} wrap={false}>
          {v.paymentLines.length > 0 ? (
            <View style={s.pay}>
              <Text style={s.label}>How to pay</Text>
              {v.paymentLines.map((line) => (
                <View key={line.key} style={s.payRow}>
                  <Text style={s.payLabel}>{line.label}</Text>
                  <PaymentValue
                    value={line.value}
                    isLink={line.isLink}
                    style={s.payValue}
                    linkColor={ACCENT}
                  />
                </View>
              ))}
            </View>
          ) : null}
          {v.notes ? (
            <View style={s.notes}>
              <Text style={s.label}>Notes</Text>
              <Text style={s.line}>{v.notes}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <PageNumber />
    </Page>
  );
}
