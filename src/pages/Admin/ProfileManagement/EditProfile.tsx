import { Link, useLocation, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronDown from 'assets/icons/ChevronDown';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import FormSelect from 'components/FormElements/FormSelect';
import { useQuery } from '@tanstack/react-query';
import { getMerchants } from 'config/actions/merchant-actions';
import { QueryParams } from 'utils/interfaces';
import { getAccounts } from 'config/actions/account-actions';
import { formatApiDataForDropdown } from 'utils/helpers';
import { userLevel } from 'utils/constants';

function EditProfile() {
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    confirmEdit: false,
    editSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      openModal('confirmEdit');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const { data: accountData } = useQuery({
    queryKey: ['accounts', queryParams],
    queryFn: ({ queryKey }) => getAccounts(queryKey[1] as QueryParams),
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.profileManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Profile Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Edit Profile</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Modify Profile Details</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  <FormSelect
                    labelFor="merchantId"
                    label="Merchant ID"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(data?.responseData?.items, 'id')}
                  />
                  <FormSelect
                    labelFor="merchantName"
                    label="Merchant Name"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(data?.responseData?.items, 'merchantName')}
                  />
                  <FormSelect
                    labelFor="accountId"
                    label="Account Id"
                    formik={formik}
                    options={formatApiDataForDropdown(accountData?.responseData?.items, 'id')}
                  />
                  <FormSelect
                    labelFor="accountNumber"
                    label="Account Number"
                    formik={formik}
                    options={formatApiDataForDropdown(
                      accountData?.responseData?.items,
                      'accountNumber',
                    )}
                  />
                  <CustomInput
                    labelFor="firstName"
                    label="First Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="lastName"
                    label="Last Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="email"
                    label="Email Address"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="password"
                    label="Password"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <div className="">
                    <FormSelect
                      labelFor="role"
                      label="Assign Role"
                      formik={formik}
                      useTouched
                      options={userLevel}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="submit"
                    title="Save"
                    customPaddingX="1.4rem"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {modals.confirmEdit && (
        <ModalWrapper
          isOpen={modals.confirmEdit}
          setIsOpen={() => closeModal('confirmEdit')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this profile, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEdit');
            openModal('editSuccessful');
          }}
        />
      )}

      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('editSuccessful');
            navigate(`/${appRoutes.adminDashboard.profileManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default EditProfile;
