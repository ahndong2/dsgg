import { User } from '@types';
export interface Service {
  createDate: string;
  id: number;
  name: string;
  nameList: null;
  projectStatus: 'ACTIVE' | 'INACTIVE';
  serviceAdminIds: number[];
  taskPerformerIds: number[];
  ticketSystem: string;
  updateDate: string;
  updateUser: User;
}
export interface Category {
  categoryStatus: 'ACTIVE' | 'INACTIVE';
  id: number;
  isFinalDepth: 'Y' | 'N';
  level: number;
  name: string;
  parentId: number | null;
  project: Service;
}
export type ServiceList = Service[];
export type CategoryList = Category[];

export interface ServiceItem {
  id: string;
  type?: number;
  kind?: string;
  name: string;
  title: string;
  description: string;
  status: string;
}
export type ServiceItemList = ServiceItem[];
