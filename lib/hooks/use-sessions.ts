import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Session } from "@/lib/data";

export function useSessions(status?: Session["status"]) {
  return useQuery({
    queryKey: ["sessions", status ?? "all"],
    queryFn: () =>
      apiFetch<Session[]>(`/sessions${status ? `?status=${status}` : ""}`),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: ["sessions", id],
    queryFn: () => apiFetch<Session>(`/sessions/${id}`),
    enabled: !!id,
  });
}
