export const commaFormat = (str: string | number) => {
  if (!str) return 0;
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
