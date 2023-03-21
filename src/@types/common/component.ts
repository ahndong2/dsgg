export interface PropsBase {
  id?: string;
  name?: string;
  value?: any;
  style?: object;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  hidden?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface CustomEventTarget {
  id?: string;
  name?: string;
  label?: string;
  value?: any;
  checkedList?: [];
  [key: string]: any;
}

export interface LabelValue {
  label: string;
  value: any;
}

export type divEventType =
  | React.MouseEvent<HTMLDivElement>
  | React.FocusEvent<HTMLDivElement>;

export interface MutableRefObject<T> {
  current: T;
}

export interface RefObject<T> {
  readonly current: T | null;
}

export interface AppRoutePageUnit {
  url: string;
  login?: boolean;
}
export interface AppRoutePage {
  [key: string]: AppRoutePageUnit;
}
