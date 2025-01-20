import { useEffect, useState } from 'react';
import TableFilter from 'components/TableFilter';
import { QueryParams, TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import { SearchTypes, TabsListTabNames } from 'utils/enums';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { RequestTypes } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import { useFormik } from 'formik';
import { useMediaQuery } from '@mui/material';
import {
  getStaffUsersRequests,
  getStaffUsersRequestsStatistics,
} from 'config/actions/staff-user-actions';
import { useQuery } from '@tanstack/react-query';
import { requestTypeDropdownOptions } from 'utils/constants';

const StaffUserRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(TabsListTabNames.Pending);
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const formik = useFormik({
    initialValues: {
      searchStaffUser: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchStaffUser,
      }));
      refetch();
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: activeTab,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchStaffUser,
    searchType: SearchTypes.SearchStaffUser,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: activeTab,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      searchFilter: formik.values.searchStaffUser,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  }, [activeTab, paginationData]);

  const handleOptionsFilter = () => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const columns: GridColDef[] = [
    {
      field: 'staffId',
      headerName: 'Staff ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'userName',
      headerName: 'Staff Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return <>{`${params?.row.firstName} ${params?.row.lastName}`}</>;
      },
    },
    {
      field: 'email',
      headerName: 'Email Address',
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
          case RequestTypes.Enable:
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
      field: 'dateCreated',
      headerName: 'Date Created',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const route =
          params?.row.requestType === RequestTypes.Creation
            ? `/${appRoutes.adminDashboard.staffUserRequests.staffUserCreationRequest}`
            : params?.row.requestType === RequestTypes.Deletion
              ? `/${appRoutes.adminDashboard.staffUserRequests.staffUserDeletionRequest}`
              : params?.row.requestType === RequestTypes.Update
                ? `/${appRoutes.adminDashboard.staffUserRequests.staffUserUpdateRequest}`
                : params?.row.requestType === RequestTypes.Enable
                  ? `/${appRoutes.adminDashboard.staffUserRequests.staffUserEnableRequest}`
                  : params?.row.requestType === RequestTypes.Disable
                    ? `/${appRoutes.adminDashboard.staffUserRequests.staffUserDisableRequest}`
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

  const { data, refetch } = useQuery({
    queryKey: ['staffuserRequests', queryParams],
    queryFn: ({ queryKey }) => getStaffUsersRequests(queryKey[1] as QueryParams),
  });

  const { data: statisticsData } = useQuery({
    queryKey: ['staffuserRequests'],
    queryFn: ({ queryKey }) => getStaffUsersRequestsStatistics(),
  });

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: statisticsData ? statisticsData?.responseData?.totalPending : 0,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: statisticsData ? statisticsData?.responseData?.totalApproved : 0,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Declined,
      tabTotal: statisticsData ? statisticsData?.responseData?.totalRejected : 0,
    },
  ];
  const isLargeWidth = useMediaQuery('(min-width:1320px)');
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Staff User Requests</h1>
          </div>
        </div>
        <div className="">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col justify-between gap-y-4 border-b pb-3 2xl:flex-row 2xl:items-center">
              <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10 lg:w-[50%]">
                <CustomTabs
                  tabs={tabsList}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  performExtraAction={() =>
                    setPaginationData((prev) => {
                      return {
                        ...prev,
                        pageNumber: 1,
                      };
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                <div className="">
                  <TableFilter
                    name={'searchStaffUser'}
                    placeholder={'Search Staff User'}
                    label={'Search Staff User'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={handleOptionsFilter}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    translationX={isLargeWidth ? 350 : undefined}
                    isRequestsFilter
                    dropdownOptions={requestTypeDropdownOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 w-full">
              <CustomTable
                tableData={data?.responseData?.items}
                columns={columns}
                rowCount={data?.responseData?.totalCount}
                paginationData={paginationData}
                setPaginationData={setPaginationData}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaffUserRequests;
