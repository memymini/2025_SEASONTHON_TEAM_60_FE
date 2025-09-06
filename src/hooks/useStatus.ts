import { useQuery } from "@tanstack/react-query";
import { BADGES_QUERY_KEY } from "@/api/queryKeys";
import { getStatus } from "@/api/status";

export function useStatusQuery() {
  return useQuery({
    queryKey: BADGES_QUERY_KEY.root(),
    queryFn: getStatus,
    select: (res) => res.data,
  });
}
