import { useQuery } from "@tanstack/react-query";
import { getMyBadge } from "@/api/my-badges";

export function useMyBadgesQuery() {
  return useQuery({
    queryKey: ["my-badge"],
    queryFn: getMyBadge,
    select: (res) => res.data,
  });
}
