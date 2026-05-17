import { SESSIONS } from "@/lib/data";
import { WebSessionDetail } from "@/components/screens/web-session-detail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SESSIONS.map(s => ({ id: s.id }));
}

export default async function WebSessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = SESSIONS.find(s => s.id === id);
  if (!session) notFound();
  return <WebSessionDetail session={session} />;
}
