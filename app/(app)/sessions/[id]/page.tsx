import { SessionDetail } from "@/components/screens/session-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionPage({ params }: Props) {
  const { id } = await params;
  return <SessionDetail sessionId={id} />;
}
