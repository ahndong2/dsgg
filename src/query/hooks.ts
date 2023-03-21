import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { sampleRecords, Game } from "./sample";

const record = sampleRecords;
const sampleQueryFunction = (params: any) =>
  new Promise<{ date: string; games: Game[] }[]>((resolve) =>
    setTimeout(() => {
      return resolve(record);
    }, 5000)
  );

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
