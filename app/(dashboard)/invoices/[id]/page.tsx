import type { Metadata, NextPage } from "next";
import { InvoiceDetailPage } from "@/components/pages";

interface InvoiceDetailRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InvoiceDetailRouteProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Invoice #${id} | Invio`,
    description: `View and manage invoice #${id}.`,
  };
}

const InvoiceDetailRoute: NextPage<InvoiceDetailRouteProps> = async ({
  params,
}) => {
  const { id } = await params;
  return <InvoiceDetailPage invoiceId={id} />;
};

export default InvoiceDetailRoute;
