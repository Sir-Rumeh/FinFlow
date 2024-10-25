import { useMediaQuery } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import CustomTable from 'components/CustomTable';
import ButtonComponent from 'components/FormElements/Button';
import { useNavigate } from 'react-router-dom';
import { rolePermissionList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';

const RolePermission = () => {
  const navigate = useNavigate();
  const isSmallWidth = useMediaQuery('(max-width:370px)');

  const rolePermissionColumns: GridColDef[] = [
    {
      field: 'groupName',
      headerName: 'Group Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'hasAccessTo',
      headerName: 'Has Access to',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      // valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
        <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
          <h2 className="text-xl font-bold">Role Permission (5)</h2>

          <div className="w-auto">
            <ButtonComponent
              variant="contained"
              color="white"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              type="button"
              title="Add Role Permission"
              customPaddingX="1.4rem"
              width={isSmallWidth ? '10rem' : undefined}
              onClick={() => {
                navigate({
                  pathname: `/${appRoutes.adminDashboard.rolesPermission.addRolePermission}`,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-1 w-full rounded-md border px-3 pt-2">
          <div className="mt-4 w-full">
            <CustomTable
              tableData={rolePermissionList}
              columns={rolePermissionColumns}
              rowCount={73}
              defaultAnimation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermission;
