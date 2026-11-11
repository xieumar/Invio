import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { InvoiceView } from "./view";
import { PageNumber, PaymentValue } from "./parts";

const INK = "#1F2937";
const TEXT = "#4B5563";
const MUTED = "#9CA3AF";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    backgroundColor: "#FFFFFF",
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 52,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 56,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 30,
    letterSpacing: 5,
    color: INK,
  },
  logo: {
    width: 140,
    height: 60,
    objectFit: "contain",
    objectPosition: "right",
  },
  wordmark: { fontFamily: "Helvetica-Bold", fontSize: 16, color: INK },

  info: { flexDirection: "row", marginBottom: 44 },
  col: { flex: 1, paddingRight: 14 },
  metaCol: { width: 170 },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  strong: { fontFamily: "Helvetica-Bold", color: INK },
  line: { lineHeight: 1.55 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  metaLabel: { fontSize: 8, letterSpacing: 1, color: MUTED },
  metaValue: { fontFamily: "Helvetica-Bold", color: INK },

  thead: {
    flexDirection: "row",
    paddingBottom: 9,
    borderBottom: `1pt solid ${INK}`,
  },
  th: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", paddingVertical: 9 },
  colName: { flex: 1, paddingRight: 10 },
  colRate: { width: 80, textAlign: "center" },
  colQty: { width: 50, textAlign: "center" },
  colTotal: { width: 80, textAlign: "right" },
  rule: { borderBottom: `1pt solid ${INK}`, marginTop: 4 },

  totals: { alignSelf: "flex-end", width: 230, marginTop: 14 },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 10,
    borderTop: `1pt solid ${INK}`,
  },
  grandLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
  },
  grandValue: { fontFamily: "Helvetica-Bold", fontSize: 18, color: INK },

  lower: { flexDirection: "row", marginTop: 44 },
  lowerCol: { flex: 1, paddingRight: 20 },
  payRow: { flexDirection: "row", marginBottom: 3 },
  payLabel: { width: 82, color: MUTED },
  payValue: { flex: 1, color: INK },
});

export function MinimalTemplate({ v }: { v: InvoiceView }) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Text style={s.title}>INVOICE</Text>
        {v.issuer.logoUrl ? (
          <Image src={v.issuer.logoUrl} style={s.logo} />
        ) : (
          <Text style={s.wordmark}>{v.issuer.name ?? ""}</Text>
        )}
      </View>

      <View style={s.info}>
        <View style={s.col}>
          <Text style={s.label}>Issued to</Text>
          <Text style={[s.strong, s.line]}>{v.clientName}</Text>
          {v.clientAddress.map((l, i) => (
            <Text key={i} style={s.line}>
              {l}
            </Text>
          ))}
          <Text style={s.line}>{v.clientEmail}</Text>
        </View>

        <View style={s.col}>
          <Text style={s.label}>From</Text>
          {v.issuer.name ? (
            <Text style={[s.strong, s.line]}>{v.issuer.name}</Text>
          ) : null}
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

        <View style={s.metaCol}>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>INVOICE NO</Text>
            <Text style={s.metaValue}>{v.id}</Text>
          </View>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>DATE</Text>
            <Text style={s.metaValue}>{v.issued}</Text>
          </View>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>DUE DATE</Text>
            <Text style={s.metaValue}>{v.due}</Text>
          </View>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>TERMS</Text>
            <Text style={s.metaValue}>{v.terms}</Text>
          </View>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>STATUS</Text>
            <Text style={s.metaValue}>{v.statusLabel}</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={s.thead} wrap={false}>
          <View style={s.colName}>
            <Text style={s.th}>Description</Text>
          </View>
          <View style={s.colRate}>
            <Text style={s.th}>Rate</Text>
          </View>
          <View style={s.colQty}>
            <Text style={s.th}>Qty</Text>
          </View>
          <View style={s.colTotal}>
            <Text style={s.th}>Total</Text>
          </View>
        </View>

        {v.items.map((item) => (
          <View key={item.id} style={s.row} wrap={false}>
            <View style={s.colName}>
              <Text>{item.name}</Text>
            </View>
            <View style={s.colRate}>
              <Text>{item.price}</Text>
            </View>
            <View style={s.colQty}>
              <Text>{item.quantity}</Text>
            </View>
            <View style={s.colTotal}>
              <Text>{item.amount}</Text>
            </View>
          </View>
        ))}
        <View style={s.rule} />
      </View>

      <View style={s.totals} wrap={false}>
        {v.adjustments.map((a) => (
          <View key={a.label} style={s.totalsRow}>
            <Text>{a.label}</Text>
            <Text>{a.value}</Text>
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
            <View style={s.lowerCol}>
              <Text style={s.label}>Payment info</Text>
              {v.paymentLines.map((line) => (
                <View key={line.key} style={s.payRow}>
                  <Text style={s.payLabel}>{line.label}</Text>
                  <PaymentValue
                    value={line.value}
                    isLink={line.isLink}
                    style={s.payValue}
                    linkColor={INK}
                  />
                </View>
              ))}
            </View>
          ) : null}
          {v.notes ? (
            <View style={s.lowerCol}>
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
