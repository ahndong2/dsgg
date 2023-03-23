import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/query/queryKeys";
import { getChampion } from "@/api/champion";

export const useGetChampionQuery = (query: string) =>
  useQuery([QUERY_KEYS.CHAMPION_LIST, query], () => getChampion(query), {
    retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    enabled: false,
  });
