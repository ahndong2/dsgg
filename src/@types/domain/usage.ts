export interface UsageSearchParam {
  bizAccountId?: number | string;
  bizAccountSubId?: number | string;
  projectId?: number | string;
  productId?: number | string;
  status?: string;
  year?: string;
  month?: string;
  fromDate?: string;
  toDate?: string;
  period?: string;
}
export interface UsageDailySearchParam extends UsageSearchParam {
  bizAccountId: number;
  productId: number;
}
export interface UsageDashboardSearchParam extends UsageSearchParam {
  productId: number;
}
export interface UsageMonthlySearchParam extends UsageSearchParam {
  bizAccountId: number;
  productId: number;
}
export interface UsageTotalSearchParam extends UsageSearchParam {
  bizAccountId: number;
  productId: number;
}
export interface UsageDetailSearchParam {
  bizAccountId: number;
  bizAccountSubId?: number;
  projectId: number;
  productId: number;
  from: string;
  to: string;
}
export interface UsageServicetabSearchParam extends UsageSearchParam {
  bizAccountId: number;
}
export interface UsageExcelSearchParam extends UsageSearchParam {
  projectId: number;
  year: string;
}
export interface BizAccountSubUsageMilage {
  bizAccountSubId: number;
  bizAccountSubName: string;
  milage: number;
  ratePerTotalUsage: number;
  usageDate: string;
}
export interface ModalProjectData {
  projectId: number;
  projectName: string;
}
export interface UsageBizAccountDetail {
  bizAccountSubs: UsageBizAccountSummary[];
  period: string;
  totalSum: number;
}

export interface UsageBizAccountSummary {
  bizAccountSubId: number;
  bizAccountSubName: string;
  oneDayUsage?: number | string;
  period: string;
}

export interface ProductWithAuthKey {
  projectName: string;
  productName: string;
  bardAuthenticationList: { [key: string]: string }[];
  bizAccountName: string;
  bizAccountSubName: string;
  contractProductId: string;
}
