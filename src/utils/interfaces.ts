import { TabsListTabNames } from './enums';

export interface TabsProps {
  tabIndex: number;
  tabName: TabsListTabNames | string;
  tabTotal?: number;
}

export interface MerchantDataRow {
  id: number;
  merchantName: string;
  cifNumber: string;
  status: string;
  dateRequested: string;
  total?: number;
  action?: any;
}

export interface DashboardMerchantDataRow {
  id: any;
  merchantName: string;
  accountNumber: string;
  phoneNumber: string;
  dateRequested: string;
  dateCreated?: string;
  dateUpdated: string;
  status: string;
  requestType: string;
  cif: string;
}

export interface AccountDataRow {
  id: number;
  merchantId: string;
  accountNumber: string;
  cif: string;
  status?: string;
  requestType: string;
  dateRequested: string;
}
export interface ProfileDataRow {
  id: number;
  accountId: string;
  userName: string;
  email: string;
  requestType: string;
  dateRequested: string;
}

export interface MandateDataRow {
  id: number;
  accountId: number;
  merchantId: number;
  mandateCode: number;
  mandateType: string;
  status?: string;
  requestType: string;
  dateRequested: string;
}

export interface UserDataRow {
  id: number;
  accountId: number;
  username: string;
  emailAddress: string;
  status: string;
  dateCreated: string;
  dateRequested?: string;
}

export interface AuditDataRow {
  id: number;
  referenceNumber: number;
  accountName: string;
  module: string;
  performedAction: string;
  date: string;
}

export interface TransactionsDataRow {
  id: number;
  accountId: number;
  amount: string;
  date: string;
}

export interface TransactionsReport {
  id: number;
  mandateId: number;
  amount: string;
  date: string;
}

export interface DataTableState {
  resetPaginationToggle: boolean;
  pageSize: number;
  pageNumber: number;
}

export interface MandateRequest {
  mandateId: string;
  merchantId: string;
  accountId: string;
  mandateCode: string;
  productId: string;
  amount: number;
  startDate: string;
  endDate: string;
  dayToApply: string;
  frequency: string;
  service: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
  supportingDocument: string;
  narration: string;
  payerName: string;
  payeeName: string;
  payerEmailAddress: string;
  payerPhoneNumber: string;
  payerAddress: string;
  payeeEmailAddress: string;
  payeePhoneNumber: string;
  payeeAddress: string;
  biller: string;
  billerID: string;
  billerAccountNumber: string;
}

export interface QueryParams {
  mandateCode: string | undefined;
  status: string | undefined;
  pageNo: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  sortOrder: string | undefined;
}
