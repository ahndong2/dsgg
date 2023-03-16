import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";

const sampleQueryFunction = (params: any) => {};

export const useSampleQuery = (params: any) =>
  useQuery(
    [QUERY_KEYS.SAMPLE_QUERY, params.id],
    () => sampleQueryFunction(params),
    {
      retry: false,
      // staleTime: Infinity,
      // cacheTime: Infinity,
      // enabled: false,
    }
  );
