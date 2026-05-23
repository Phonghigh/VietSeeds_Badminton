import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { ActivityItem } from "@/lib/data";

export function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: () => apiFetch<ActivityItem[]>("/activity"),
  });
}
