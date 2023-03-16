const generateKeyName = (value: string) => {
  return ["DSGG", value];
};

const QUERY_KEYS = {
  SAMPLE_QUERY: generateKeyName("sample-query"),
};

export default QUERY_KEYS;
