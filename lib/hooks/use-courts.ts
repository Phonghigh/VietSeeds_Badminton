import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Court } from "@/lib/data";

export function useCourts() {
  return useQuery({
    queryKey: ["courts"],
    queryFn: () => apiFetch<Court[]>("/courts"),
  });
}
