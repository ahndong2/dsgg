import { Corporation, CodeName, Role, SearchParamPaging } from '@types';
export interface User {
  id: number;
  loginId: string;
  name: string;
  department: string;
  email: string;
  position: string;
  phone: string;
  corporation: Corporation;
  roles: Role[];
  status: CodeName;
  delegateFromDate: string;
  delegateId: string;
  delegateToDate: string;
  regDate: string;
  lastPasswordModifyDate: string;
  lastLoginDate: string;
}
export interface UserCondition {
  userId: number;
  name: string;
  corporationId?: number;
  corporation: string;
  department: string;
}
export interface UserSearchParam extends SearchParamPaging {
  id?: number;
  name?: string;
  corporation?: string;
  department?: string;
}

export interface UserChangePassword {
  loginId: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface UserCheckPassword {
  loginId: string;
  password: string;
}

export interface UserTerms {
  loginId: string;
  personalInformationYn: boolean;
  termsOfUseYn: boolean;
}
