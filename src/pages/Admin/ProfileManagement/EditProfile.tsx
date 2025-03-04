import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useRef, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import FormSelect from 'components/FormElements/FormSelect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMerchants } from 'config/actions/merchant-actions';
import { ProfileRequest, QueryParams, Role } from 'utils/interfaces';
import { getAccounts, getAccountsByMerchantId } from 'config/actions/account-actions';
import { formatApiDataForDropdown } from 'utils/helpers';
import { getProfileById, updateProfile } from 'config/actions/profile-actions';
import { createProfileSchema } from 'utils/formValidators';
import { getRoles } from 'config/actions/role-permission-actions';
import { Designation } from 'utils/enums';

function EditProfile() {
  const navigate = useNavigate();
  const [merchantRoles, setMerchantRoles] = useState<Role[]>([]);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const profileId = searchParams?.get('id') || undefined;
  const [profileRequest, setProfileRequest] = useState<ProfileRequest>();

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
    initialValues: {
      merchantID: '',
      merchantName: '',
      accountID: '',
      accountNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    validationSchema: createProfileSchema,
    onSubmit: (values) => {
      const payload = {
        merchantID: values.merchantID,
        profileID: profileId,
        accountID: values.accountID,
        userName: `${values.firstName} ${values.lastName}`,
        role: values.role,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };
      setProfileRequest(payload);
      openModal('confirmEdit');
    },
  });

  const { data: profileData } = useQuery({
    queryKey: ['profiles', profileId],
    queryFn: ({ queryKey }) => getProfileById(queryKey[1]),
  });

  useEffect(() => {
    formik.setValues({
      merchantID: profileData?.responseData?.merchantID || '',
      merchantName: profileData?.responseData?.merchantName || '',
      accountID: profileData?.responseData?.accountID || '',
      accountNumber: profileData?.responseData?.accountNumber || '',
      firstName: profileData?.responseData?.firstName || '',
      lastName: profileData?.responseData?.lastName || '',
      email: profileData?.responseData?.email || '',
      role: profileData?.responseData?.role || '',
    });
  }, [profileData]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const { data: accountData, refetch: refetchAccountsOptions } = useQuery({
    queryKey: ['accounts', queryParams],
    queryFn: ({ queryKey }) =>
      formik.values.merchantID
        ? getAccountsByMerchantId(formik.values.merchantID)
        : getAccounts(queryKey[1] as QueryParams),
  });

  const { data: roles } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string | undefined;
      payload: ProfileRequest | undefined;
    }) => updateProfile(requestId, payload),
    onSuccess: () => {
      openModal('editSuccessful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      closeModal('editSuccessful');
    },
  });

  const refetchAccountRef = useRef(false);

  useEffect(() => {
    const filteredRoles = roles?.responseData?.items?.filter(
      (role: Role) => role.designation === Designation.Merchant,
    );
    setMerchantRoles(filteredRoles);
  }, [roles]);

  useEffect(() => {
    if (formik.values.merchantName?.length > 0) {
      const merchantDetails = data?.responseData?.items.find((item: any) => {
        return item.name === formik.values.merchantName;
      });
      formik.setFieldValue('merchantID', merchantDetails?.id);
      formik.setFieldValue('accountNumber', '');
      formik.setFieldValue('accountID', '');
    }
  }, [formik.values.merchantName]);

  useEffect(() => {
    if (!refetchAccountRef.current) {
      refetchAccountRef.current = true;
      return;
    } else if (formik.values.merchantID?.length > 0) {
      const getData = async () => {
        await refetchAccountsOptions();
      };
      getData();
    }
  }, [formik.values.merchantID]);

  useEffect(() => {
    if (formik.values.accountNumber?.length > 0) {
      const accountDetails = accountData?.responseData?.items.find((item: any) => {
        return item.accountNumber === formik.values.accountNumber;
      });
      formik.setFieldValue('accountID', accountDetails?.id);
    }
  }, [formik.values.accountNumber]);

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
                    labelFor="merchantName"
                    label="Merchant Name"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(data?.responseData?.items, 'name', 'name')}
                    scrollableOptions
                    scrollableHeight="max-h-[15rem]"
                  />
                  <CustomInput
                    labelFor="merchantID"
                    label="Merchant ID"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled
                    // disabled={
                    //   formik.values.merchantName?.length > 0 && formik.values.merchantID?.length > 0
                    // }
                  />
                  <FormSelect
                    labelFor="accountNumber"
                    label="Account Number"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(
                      accountData?.responseData?.items,
                      'accountNumber',
                      'accountNumber',
                    )}
                    scrollableOptions
                    scrollableHeight="max-h-[15rem]"
                  />
                  <CustomInput
                    labelFor="accountID"
                    label="Account Id"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled
                    // disabled={
                    //   formik.values.accountNumber?.length > 0 && formik.values.accountID?.length > 0
                    // }
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
                  <div className="">
                    <FormSelect
                      labelFor="role"
                      label="Assign Role"
                      formik={formik}
                      useTouched
                      options={formatApiDataForDropdown(merchantRoles, 'name', 'id')}
                      scrollableOptions
                      scrollableHeight="max-h-[15rem]"
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
          loading={updateProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEdit');
            updateProfileMutation.mutate({ requestId: profileId, payload: profileRequest });
          }}
        />
      )}

      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes and your request is pending approval'}
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
