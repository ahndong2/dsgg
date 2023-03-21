export type ValueOfUnion<T extends { [k: string]: unknown }> = T[keyof T];
export type ArrayUnion<T extends ReadonlyArray<any>> = T[number];

type ValueType = string | number | boolean;
export type Union<T extends { [k: string]: ValueType } | ReadonlyArray<ValueType>> =
  T extends ReadonlyArray<ValueType> ? T[number] : T extends { [k: string]: infer U } ? U : never;
