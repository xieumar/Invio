import { Link, StyleSheet, Text } from "@react-pdf/renderer";

type PdfStyle = ReturnType<typeof StyleSheet.create>[string];

const s = StyleSheet.create({
  pageNumber: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    textAlign: "center",
    fontSize: 8,
    color: "#9CA3AF",
  },
});

/** "Page 2 of 3": only shown when the invoice runs past one page. */
export function PageNumber() {
  return (
    <Text
      fixed
      style={s.pageNumber}
      render={({ pageNumber, totalPages }) =>
        totalPages > 1 ? `Page ${pageNumber} of ${totalPages}` : ""
      }
    />
  );
}

/** Payment value: a clickable link for payment URLs, plain text otherwise. */
export function PaymentValue({
  value,
  isLink,
  style,
  linkColor,
}: {
  value: string;
  isLink: boolean;
  style: PdfStyle;
  linkColor: string;
}) {
  return isLink ? (
    <Link src={value} style={[style, { color: linkColor }]}>
      {value}
    </Link>
  ) : (
    <Text style={style}>{value}</Text>
  );
}
