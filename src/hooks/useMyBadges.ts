import { useQuery } from "@tanstack/react-query";
import { getMyBadge } from "@/api/my-badges";
import { MY_BADGES_QUERY_KEY } from "@/api/queryKeys";

export function useMyBadgesQuery() {
  return useQuery({
    queryKey: MY_BADGES_QUERY_KEY.root(),
    queryFn: getMyBadge,
    select: (res) => res.data,
  });
}
