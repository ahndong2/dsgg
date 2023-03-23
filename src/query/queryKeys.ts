const generateKeyName = (value: string) => {
  return ["DSGG", value];
};

export const QUERY_KEYS = {
  SAMPLE_QUERY: generateKeyName("sample-query"),
  CHAMPION_LIST: generateKeyName("champion-list"),
};

export default QUERY_KEYS;
