import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Quest } from "@/lib/data";

export function useQuests(playerId: number) {
  return useQuery({
    queryKey: ["quests", playerId],
    queryFn: () => apiFetch<Quest[]>(`/players/${playerId}/quests`),
    enabled: playerId > 0,
  });
}
