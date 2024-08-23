import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { AccountDataRow, MandateDataRow } from 'utils/interfaces';
import { RequestTypes } from 'utils/enums';
import CustomTable from 'components/CustomTable';

const AccountRequestsListTable = ({ rowData }: { rowData: AccountDataRow[] }) => {
  const columns: GridColDef[] = [
    {
      field: 'merchantId',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    {
      field: 'accountNumber',
      headerName: 'Account Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    {
      field: 'cif',
      headerName: 'CIF Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },

    {
      field: 'requestType',
      headerName: 'Request Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.requestType}</span>
          </div>
        );
        switch (params?.row.requestType) {
          case RequestTypes.Creation:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestTypes.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case RequestTypes.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case RequestTypes.Deletion:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params?.row.requestType}</span>;
        }
      },
    },
    {
      field: 'dateRequested',
      headerName: 'Date Requested',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const route =
          params?.row.requestType === RequestTypes.Creation
            ? `/${appRoutes.adminDashboard.requests.accountRequests.accountCreationRequest}`
            : params?.row.requestType === RequestTypes.Deletion
              ? `/${appRoutes.adminDashboard.requests.accountRequests.accountDeletionRequest}`
              : params?.row.requestType === RequestTypes.Update
                ? `/${appRoutes.adminDashboard.requests.accountRequests.accountUpdateRequest}`
                : params?.row.requestType === RequestTypes.Disable
                  ? `/${appRoutes.adminDashboard.requests.accountRequests.accountDisableRequest}`
                  : undefined;
        return (
          <div className="">
            <Link
              className="w-full text-start font-semibold text-lightPurple"
              to={{
                pathname: route,
                search: `?${createSearchParams({ id: params?.row.id })}`,
              }}
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="w-full">
        <CustomTable tableData={rowData} columns={columns} rowCount={20} />
      </div>
    </>
  );
};

export default AccountRequestsListTable;
