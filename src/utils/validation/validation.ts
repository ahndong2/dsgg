export const regExpFromString = (q: string): RegExp | null => {
  let flags = q.replace(/.*\/([gimuy]*)$/, '$1');
  if (flags === q) flags = '';
  const pattern = flags ? q.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1') : q;
  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    console.error(`[regExpFromString] regex pattern 이 정상적으로 들어오지 않았습니다.`);
    return null;
  }
};

export const isMatchText = (regex: string, value: string): boolean => {
  if (!regex) {
    console.error(`[isMatchText] regex pattern 이 들어오지 않았습니다.`);
    return false;
  }

  const pattern = new RegExp(regex);
  return pattern.test(value);
};
