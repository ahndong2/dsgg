export interface Menu {
  id?: number;
  name?: string;
  type?: string;
  parentId?: number;
  level?: number;
  orderNumber?: number;
  status?: string;
  description?: string;
  value?: string;
  url?: string;
  menuList: Menu[];
  component?: string;
  login?: boolean;
  active?: boolean;
  expanded?: boolean;
}

export interface AppRoutePageUnit {
  url: string;
  login?: boolean;
}
export interface AppRoutePage {
  [key: string]: AppRoutePageUnit;
}
