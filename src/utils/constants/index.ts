import { TabsListTabNames } from 'utils/enums';
import {
  MerchantDataRow,
  DashboardMerchantDataRow,
  MandateDataRow,
  TabsProps,
  AccountDataRow,
  ProfileDataRow,
  TransactionsDataRow,
  UserDataRow,
  AuditDataRow,
  TransactionsReport,
  StaffUserDataRow,
} from 'utils/interfaces';

export const statusDropdownOptions = [
  { value: 'All', label: 'All' },
  { value: 'Enabled', label: 'Enabled' },
  { value: 'Disabled', label: 'Disabled' },
];

export const merchantsList: MerchantDataRow[] = [
  {
    id: 1,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 1,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 1,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    merchantName: 'Fair Money',
    cifNumber: '1267378',
    status: 'Active',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const mandateRequestsList: MandateDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Fixed',
    status: 'Enabled',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    status: 'Disabled',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Fixed',
    status: 'Disabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    status: 'Disabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Fixed',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Fixed',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Fixed',
    status: 'Disabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const accountRequestsList: AccountDataRow[] = [
  {
    id: 1,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Disabled',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Disabled',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Disabled',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    merchantId: '123455',
    accountNumber: '9874126473',
    cif: '123890',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const profileRequestsList: ProfileDataRow[] = [
  {
    id: 1,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    accountId: '123455',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];
export const staffUsersList: StaffUserDataRow[] = [
  {
    id: 1,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Syscon',
    status: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Syscon',
    status: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Syscon',
    status: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Syscon',
    status: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    employeeId: '123455',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateAdded: '2015-03-25T12:00:00-06:30',
  },
];

export const muiDashboardMerchantsList: DashboardMerchantDataRow[] = [
  {
    id: '1234',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1235',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Disabled',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1236',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Enabled',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1237',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Disabled',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1238',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Enabled',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1239',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Disabled',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1243',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Enabled',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1240',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Disabled',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1241',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Enabled',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1242',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Disabled',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateCreated: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
];

export const rejectedDashboardMerchantsList: DashboardMerchantDataRow[] = [
  {
    id: '1234',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1235',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1236',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1237',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1238',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1239',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1240',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1241',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1242',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1243',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Rejected',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
];

export const pendingDashboardMerchantsList: DashboardMerchantDataRow[] = [
  {
    id: '1234',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1235',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1236',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Creation',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1237',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1238',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Deletion',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1239',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1240',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1241',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Update',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1242',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
  {
    id: '1243',
    merchantName: 'Fair Money',
    accountNumber: '1234567890',
    phoneNumber: '0810283789',
    status: 'Pending',
    requestType: 'Disable',
    dateRequested: '2024-03-25T12:00:00-06:30',
    dateUpdated: '2024-03-25T12:00:00-06:30',
    cif: '1267378',
  },
];

export const mandateList: MandateDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Enabled',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const pendingMandateList: MandateDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const approvedMandateList: MandateDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const rejectedMandateList: MandateDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const profileManagementList: UserDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    username: 'John Doe',
    emailAddress: 'johndoe@gmail.com',
    status: 'Enabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126479,
    username: 'James Doe',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126474,
    username: 'Amaka Cynthia',
    emailAddress: 'johndoe@gmail.com',
    status: 'Enabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const transactionHistory: TransactionsDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    mandateId: 126473,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126474,
    mandateId: 126474,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126475,
    mandateId: 126475,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    accountId: 126476,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
];

export const transactionReports: TransactionsReport[] = [
  {
    id: 1,
    mandateId: 126473,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    mandateId: 126474,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    mandateId: 126475,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    mandateId: 126476,
    amount: '50,000',
    date: '2015-03-25T12:00:00-06:30',
  },
];

export const UserManagementList: UserDataRow[] = [
  {
    id: 1,
    accountId: 126473,
    username: 'John Doe',
    emailAddress: 'johndoe@gmail.com',
    status: 'Enabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126479,
    username: 'James Doe',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126474,
    username: 'Amaka Cynthia',
    emailAddress: 'johndoe@gmail.com',
    status: 'Enabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126475,
    username: 'Tolani Akinsola',
    emailAddress: 'johndoe@gmail.com',
    status: 'Disabled',
    dateCreated: '2015-03-25T12:00:00-06:30',
  },
];

export const auditTrailList: AuditDataRow[] = [
  {
    id: 1,
    referenceNumber: 126473,
    accountName: 'John Doe',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    referenceNumber: 126474,
    accountName: 'John Doe',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    referenceNumber: 126479,
    accountName: 'Benahi Kalu',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    referenceNumber: 126480,
    accountName: 'Lebron James',
    module: 'Mandates',
    performedAction: 'Modification',
    date: '2015-03-25T12:00:00-06:30',
  },
];
