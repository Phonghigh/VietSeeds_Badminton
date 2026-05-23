import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Achievement } from "@/lib/data";

export function useAchievements(playerId?: number) {
  return useQuery({
    queryKey: ["achievements", playerId ?? "all"],
    queryFn: () =>
      apiFetch<Achievement[]>(
        playerId ? `/players/${playerId}/achievements` : "/achievements"
      ),
  });
}
