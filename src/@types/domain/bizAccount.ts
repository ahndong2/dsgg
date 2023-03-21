import { SearchParamPaging } from '../common';
import { Corporation } from '@types';

export interface bizAccountRoleType {
  code?: string;
  name?: string;
}
export interface BizAccountListSearchParam extends SearchParamPaging {
  bizAccountName?: string;
  departmentName?: string;
  ownerName?: string;
}
export interface BizAccountMember {
  bizAccountId?: number;
  userId?: number;
  userName?: string;
  corporation?: Corporation;
  department?: string;
  departmentName?: string;
  bizAccountRoleType?: string;
}

export interface BizAccountSubProduct {
  productId?: number;
  productName?: string;
  productOptionName?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  billingStartDate?: string;
  status?: string;
}
export interface BizAccountSubProject {
  projectId?: number;
  projectName?: string;
  products?: BizAccountSubProduct[];
}
export interface BizAccountSubDetail {
  bizAccountId?: number;
  bizAccountSubId?: number;
  bizAccountSubName?: string;
  projects: BizAccountSubProject[];
}

export interface BizAccountSub {
  bizAccountId?: number;
  bizAccountSubId?: number;
  bizAccountSubName?: string;
  productLinkageYn?: string;
  projectId?: number;
  projectName?: string;
  productId?: number;
  productName?: string;
  productOptionName?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  billingStartDate?: string;
  status?: string;
}

export interface BizAccountInfo {
  bizAccountId?: number | null;
  bizAccountName: string;
  corporation?: Corporation;
  corporationName: string;
  departmentName: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  ownerName?: string;
  memberCount?: number;
}
export type BizAccountList = BizAccountInfo[];
export interface BizAccount extends BizAccountInfo {
  bizAccountMembers?: BizAccountMember[];
  bizAccountSubs?: BizAccountSub[];
}

export interface BizAccountAdd {
  bizAccountName: string;
  corporationName: string;
  departmentName: string;
  bizAccountMembers: number[];
}
