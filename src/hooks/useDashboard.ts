import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/api/dashboard";
import { DASHBOARD_QUERY_KEY } from "@/api/queryKeys";

export function useDashboardQuery() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY.root(),
    queryFn: getDashboard,
    select: (res) => res.data,
  });
}
