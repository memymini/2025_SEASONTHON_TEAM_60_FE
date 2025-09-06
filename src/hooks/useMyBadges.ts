import { useQuery } from "@tanstack/react-query";
import { getMyBadge } from "@/api/my-badges";
import { USER_QUERY_KEY } from "@/api/queryKeys";

export function useMyBadgesQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEY.badges(),
    queryFn: getMyBadge,
    select: (res) => res.data,
  });
}
