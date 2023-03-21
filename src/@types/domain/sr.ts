import { Corporation, SearchParamPaging, User } from '@types';

export interface Sr {
  category1?: string;
  category2?: string;
  category3?: string;
  categoryName: string;
  corporation?: Corporation;
  createDate: string;
  finalCategoryId: number;
  priorityStatus: { code: string; name: string };
  projectName: string;
  requesterName: string;
  taskId: number;
  taskStatus: string;
  taskTitle: string;
  updateDate: string;
  updaterName: string;
}
export interface SrDetail {
  id: number;
  description: string;
  title: string;
  createDate: string;
  creatorId: string;
  creatorName: string;
  creatorCorporationName: string;
  updateDate: string;
  updaterName: string;
  updaterCorporationName: string;
  status: string;
  completeDate: string;
  templateType: 'TEXT' | 'GRID';
  context: string;
  expectEndDate?: string;
  approvalLineVoList?: {
    approvalDate?: string;
    approvalChargeUser?: User;
    approvalLineStatus?: string;
    approvalLineStatusName: string;
    approvalLineType: string;
    approvalMessage?: string;
    delegateUser?: User;
    id: number;
    orderNumber: number;
  }[];
  notifierList?: User[];
  ticketUseYn: string;
  taskHistoryVoList: [];
  workflowType: string;
  approvalManagerYn: string;
  filePathList: { [key: string]: number };
  autoRegPerformerYn: string;
  reviewYn: string;
  review: string;
}
export type SrList = Sr[];
export interface SrListSearchParam extends SearchParamPaging {
  title?: string;
  projectId?: string;
  category1Id?: string;
  category2Id?: string;
  category3Id?: string;
  taskStatus?: string[];
  from?: string;
  to?: string;
  flag?: string;
}
export interface SrDashBoardCount {
  TASKPROECSSING: number;
  RECENTFINISH: number;
  RECENTREJECT: number;
  APPROVEREADY: number;
}
export interface SrListByDashBoardSearchParam extends SearchParamPaging {
  dashboardValue: string;
}
export interface AddSrForm {
  approvalChargeUsers?: number[];
  categoryDepth?: number;
  categoryId: number;
  categoryName?: number;
  context?: string;
  expectEndDate?: string;
  fileList?: string[];
  refererUsers?: number[];
  templateType?: string;
  title: string;
}
export interface AddSrForPortalForm {
  categoryId: number;
  context?: string;
  title: string;
}
export interface EditSrForm {
  approvalMessage?: string;
  approvalChargeUsers?: number[];
  approvalYn: 'Y' | 'N';
  context?: string;
  dueEndDate: string;
  fileList?: string[];
  priorityStatus?: { code: string; name: string };
  projectRoleType?: 'SERVICEADMIN' | 'TASKPERFORMERS' | 'SALESPERFORMER';
  refererUsers?: number[];
  taskId: number;
  taskPerformers?: number[];
  taskStatus?:
    | 'REQUEST'
    | 'REVIEW'
    | 'APPROVAL'
    | 'CONFIRMED'
    | 'ASSIGNED'
    | 'PROCESSING'
    | 'COMPLETE'
    | 'REJECT';
  ticketUseYn?: 'Y' | 'N';
  title: string;
}

export interface ApprovalUser {
  id: number | string;
  name: string;
  status?: string;
  statusName?: string;
  approvalDate?: string;
  approvalMessage?: string;
  user?: { id: string };
  department?: string;
}
