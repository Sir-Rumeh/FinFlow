import ButtonComponent from 'components/FormElements/Button';
import { useRef, useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import appRoutes from 'utils/constants/routes';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import { muiDashboardMerchantsList } from 'utils/constants';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { Button, useMediaQuery } from '@mui/material';

const MerchantManagement = () => {
  const printPdfRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [modals, setModals] = useState({
    confirmDisableMerchant: false,
    disableSuccessful: false,
    confirmEnableMerchant: false,
    enableSuccessful: false,
    confirmDeleteMerchant: false,
    deleteSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      searchMerchantName: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const headers = [
    { label: 'Merchant ID', key: 'id' },
    { label: 'Merchant Name', key: 'merchantName' },
    { label: 'CIF Number', key: 'cif' },
    { label: 'Status', key: 'status' },
    { label: 'Date Requested', key: 'dateRequested' },
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'merchantName',
      headerName: 'Merchant Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
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
      field: 'status',
      headerName: 'Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.status}</span>
          </div>
        );
        switch (params?.row.status) {
          case 'Enabled':
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case 'Disabled':
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params?.row.status}</span>;
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
        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-15}
              translationY={45}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.merchantManagement.editMerchant}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {params?.row.status === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisableMerchant')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {params?.row.status === 'Disabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmEnableMerchant')}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openModal('confirmDeleteMerchant')}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const isSmallWidth = useMediaQuery('(max-width:370px)');

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Merchant Management</h1>
          </div>
          <div className="w-auto">
            <ButtonComponent
              variant="contained"
              color="white"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              type="button"
              title="Onboard Merchant"
              customPaddingX="1.4rem"
              width={isSmallWidth ? '10rem' : undefined}
              onClick={() => {
                navigate({
                  pathname: `/${appRoutes.adminDashboard.merchantManagement.createMerchant}`,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col gap-y-4 border-b pb-3 lg:flex-row lg:items-center">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchMandate'}
                    placeholder={'Search Mandate'}
                    label={'Search Mandate'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => {}}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                  />
                </div>
              </div>
              <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                <ExportBUtton />
              </div>
            </div>

            <div className="mt-6 w-full">
              <div ref={printPdfRef} className="w-full">
                <CustomTable
                  tableData={muiDashboardMerchantsList}
                  columns={columns}
                  rowCount={124}
                  paginationData={paginationData}
                  setPaginationData={setPaginationData}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {modals.confirmDisableMerchant && (
        <ModalWrapper
          isOpen={modals.confirmDisableMerchant}
          setIsOpen={() => closeModal('confirmDisableMerchant')}
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisableMerchant');
            openModal('disableSuccessful');
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnableMerchant && (
        <ModalWrapper
          isOpen={modals.confirmEnableMerchant}
          setIsOpen={() => closeModal('confirmEnableMerchant')}
          title={'Enable Merchant?'}
          info={'You are about to enable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEnableMerchant');
            openModal('enableSuccessful');
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDeleteMerchant && (
        <ModalWrapper
          isOpen={modals.confirmDeleteMerchant}
          setIsOpen={() => closeModal('confirmDeleteMerchant')}
          title={'Delete Merchant?'}
          info={'You are about to delete this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDeleteMerchant');
            openModal('deleteSuccessful');
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
          }}
        />
      )}
    </>
  );
};

export default MerchantManagement;
