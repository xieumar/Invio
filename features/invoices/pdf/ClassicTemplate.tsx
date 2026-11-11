import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { InvoiceView } from "./view";
import { PageNumber, PaymentValue } from "./parts";

const INK = "#222222";
const TEXT = "#444444";
const MUTED = "#8A8A8A";
const PANEL = "#F1F1F1";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 44,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 34,
  },
  logo: { width: 150, height: 56, objectFit: "contain", objectPosition: "left" },
  wordmark: { fontFamily: "Helvetica-Bold", fontSize: 17, color: INK },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 28,
    letterSpacing: 2,
    color: INK,
  },

  panel: {
    backgroundColor: PANEL,
    paddingVertical: 24,
    paddingHorizontal: 22,
    marginBottom: 40,
  },
  panelRow: { flexDirection: "row", justifyContent: "space-between" },
  panelGap: { marginTop: 22 },
  half: { flex: 1, paddingRight: 14 },
  metaBlock: { width: 190 },
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
  metaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: INK,
  },
  metaValue: { color: TEXT },

  tablePad: { paddingHorizontal: 8 },
  thead: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottom: `0.75pt solid ${INK}`,
  },
  th: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", paddingVertical: 9, paddingHorizontal: 4 },
  colName: { flex: 1, paddingRight: 10 },
  colRate: { width: 80, textAlign: "center" },
  colQty: { width: 50, textAlign: "center" },
  colTotal: { width: 80, textAlign: "right" },
  rule: { borderBottom: `0.75pt solid ${INK}`, marginTop: 6 },

  totals: { alignSelf: "flex-end", width: 240, marginTop: 12 },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 8,
  },
  grandLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: INK,
    textTransform: "uppercase",
  },
  grandValue: { fontFamily: "Helvetica-Bold", fontSize: 18, color: INK },

  notes: { marginTop: 40, paddingHorizontal: 8 },
  payRow: { flexDirection: "row", marginBottom: 3 },
  payLabel: { width: 82, color: MUTED },
  payValue: { flex: 1, color: INK },
});

export function ClassicTemplate({ v }: { v: InvoiceView }) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        {v.issuer.logoUrl ? (
          <Image src={v.issuer.logoUrl} style={s.logo} />
        ) : (
          <Text style={s.wordmark}>{v.issuer.name ?? ""}</Text>
        )}
        <Text style={s.title}>INVOICE</Text>
      </View>

      <View style={s.panel} wrap={false}>
        <View style={s.panelRow}>
          <View style={s.half}>
            <Text style={s.label}>Issued to</Text>
            <Text style={[s.strong, s.line]}>{v.clientName}</Text>
            {v.clientAddress.map((l, i) => (
              <Text key={i} style={s.line}>
                {l}
              </Text>
            ))}
            <Text style={s.line}>{v.clientEmail}</Text>
          </View>

          <View style={s.metaBlock}>
            <View style={s.metaRow}>
              <Text style={s.metaLabel}>INVOICE NO:</Text>
              <Text style={[s.metaValue, s.strong]}>{v.id}</Text>
            </View>
            <View style={s.metaRow}>
              <Text style={s.metaLabel}>DATE:</Text>
              <Text style={s.metaValue}>{v.issued}</Text>
            </View>
            <View style={s.metaRow}>
              <Text style={s.metaLabel}>DUE DATE:</Text>
              <Text style={s.metaValue}>{v.due}</Text>
            </View>
            <View style={s.metaRow}>
              <Text style={s.metaLabel}>TERMS:</Text>
              <Text style={s.metaValue}>{v.terms}</Text>
            </View>
            <View style={s.metaRow}>
              <Text style={s.metaLabel}>STATUS:</Text>
              <Text style={s.metaValue}>{v.statusLabel}</Text>
            </View>
          </View>
        </View>

        <View style={[s.panelRow, s.panelGap]}>
          <View style={s.half}>
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

          {v.paymentLines.length > 0 ? (
            <View style={s.metaBlock}>
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
        </View>
      </View>

      <View style={s.tablePad}>
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
      </View>

      {v.notes ? (
        <View style={s.notes} wrap={false}>
          <Text style={s.label}>Notes</Text>
          <Text style={s.line}>{v.notes}</Text>
        </View>
      ) : null}

      <PageNumber />
    </Page>
  );
}
