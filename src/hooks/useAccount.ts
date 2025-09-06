import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "@/api/queryKeys";
import { getAccount } from "@/api/account";

export function useAccountQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEY.root(),
    queryFn: getAccount,
    select: (res) => res.data,
  });
}
