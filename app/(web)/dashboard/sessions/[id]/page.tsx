import { WebSessionDetail } from "@/components/screens/web-session-detail";

export default async function WebSessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WebSessionDetail sessionId={id} />;
}
