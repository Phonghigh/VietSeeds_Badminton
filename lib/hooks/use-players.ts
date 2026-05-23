import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Player } from "@/lib/data";

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: () => apiFetch<Player[]>("/players"),
  });
}

export function usePlayer(id: number) {
  return useQuery({
    queryKey: ["players", id],
    queryFn: () => apiFetch<Player>(`/players/${id}`),
    enabled: id > 0,
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiFetch<Player>("/auth/me"),
  });
}
