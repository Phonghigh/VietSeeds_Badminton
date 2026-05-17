import { notFound } from "next/navigation";
import { SESSIONS } from "@/lib/data";
import { SessionDetail } from "@/components/screens/session-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionPage({ params }: Props) {
  const { id } = await params;
  const session = SESSIONS.find(s => s.id === id);
  if (!session) notFound();
  return <SessionDetail session={session} />;
}

export function generateStaticParams() {
  return SESSIONS.map(s => ({ id: s.id }));
}
