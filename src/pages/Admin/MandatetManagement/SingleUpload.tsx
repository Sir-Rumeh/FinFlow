import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import FormContentContainer from 'components/common/ItemDetailsContainer/FormContentContainer';
import ButtonComponent from 'components/FormElements/Button';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import { useFormik } from 'formik';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import CustomFileUpload from 'components/FormElements/CustomFileUpload';
import { createMandateSchema } from 'utils/formValidators';
import FormSelect from 'components/FormElements/FormSelect';
import { DoNameEnquiryRequest, MandateRequest, QueryParams } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addMandateRequest } from 'config/actions/dashboard-actions';
import {
  filterSelectedOption,
  formatApiDataForDropdown,
  notifyError,
  notifySuccess,
} from 'utils/helpers';
import dayjs from 'dayjs';
import {
  dailyFrequencyOptions,
  frequencyOptions,
  monthlyFrequencyOptions,
  serviceOptions,
  weeklyFrequencyOptions,
} from 'utils/constants';
import { getAccounts, getAccountsByMerchantId } from 'config/actions/account-actions';
import { getMerchants } from 'config/actions/merchant-actions';
import { doNameEnquiry } from 'config/actions/do-name-enquiry';

const SingleUpload = () => {
  const navigate = useNavigate();
  const [mandateRequest, setMandateRequest] = useState<MandateRequest>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [acquiredAccountName, setAcquiredAccountName] = useState(false);

  const [modals, setModals] = useState({
    confirmCreate: false,
    creationSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const addMandateRequestMutation = useMutation({
    mutationFn: (payload: MandateRequest | undefined) => addMandateRequest(payload),
    onSuccess: () => {
      closeModal('confirmCreate');
      openModal('creationSuccessful');
    },
    onError: (error) => {
      closeModal('confirmCreate');
    },
  });

  const formik = useFormik({
    initialValues: {
      mandateType: '',
      merchantId: '',
      startDate: null,
      endDate: null,
      supportingDocument: '',
      productId: '',
      amount: '',
      dayToApply: '',
      frequency: '',
      service: '',
      accountName: '',
      accountNumber: '',
      accountId: '',
      bankCode: '',
      narration: '',
      payerName: '',
      payerEmailAddress: '',
      payerPhoneNumber: '',
      payerAddress: '',
      payeeName: '',
      payeeEmailAddress: '',
      payeePhoneNumber: '',
      payeeAddress: '',
      biller: '',
      billerId: '',
      billerCode: '',
      billerAccountNumber: '',
      billerAccountName: '',
      billerBankCode: '',
      billerBankName: '',
    },
    validationSchema: createMandateSchema,
    onSubmit: (values) => {
      const formattedStartDate = dayjs(values.startDate).toISOString();
      const formattedEndDate = dayjs(values.endDate).toISOString();
      const payload = {
        mandateId: '',
        mandateCode: '',
        merchantId: values.merchantId,
        accountId: values.accountId,
        productId: values.productId,
        amount: parseFloat(values.amount),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        dayToApply: values.dayToApply,
        mandateType: values.mandateType,
        frequency: values.frequency,
        service: values.service,
        accountName: values.accountName,
        accountNumber: `${values.accountNumber}`,
        bankCode: values.bankCode,
        supportingDocument: `${values.supportingDocument}`,
        narration: values.narration,
        payerName: values.payerName,
        payeeName: values.payeeName,
        payerEmailAddress: values.payerEmailAddress,
        payerPhoneNumber: `${values.payerPhoneNumber}`,
        payerAddress: values.payerAddress,
        payeeEmailAddress: values.payeeEmailAddress,
        payeePhoneNumber: `${values.payeePhoneNumber}`,
        payeeAddress: values.payeeAddress,
        biller: values.biller,
        billerID: values.billerId,
        billerCode: values.billerCode,
        billerAccountNumber: `${values.billerAccountNumber}`,
        bankName: values.billerBankName,
      };
      const jsonString = JSON.stringify(payload);

      // Use TextEncoder to calculate the byte size of the JSON string
      const encoder = new TextEncoder();
      const byteSize = encoder.encode(jsonString).length;

      setMandateRequest(payload);
      openModal('confirmCreate');
    },
  });

  const doNameEnquiryMutation = useMutation({
    mutationFn: (payload: DoNameEnquiryRequest | undefined) => doNameEnquiry(payload),
    onSuccess: (data) => {
      if (data?.data?.accountName?.length > 0) {
        formik.setFieldValue('payerName', data?.data?.accountName || '');
        // formik.setFieldValue('accountName', data?.data?.accountName || '');
        setAcquiredAccountName(true);
        notifySuccess('Successfully retrieved payer name');
      } else {
        notifyError('No payer name found');
        formik.setFieldValue('payerName', '');
        setAcquiredAccountName(false);
      }
    },
    onError: (error) => {
      notifyError('Failed to retrieve payer name');
      formik.setFieldValue('payerName', '');
      setAcquiredAccountName(false);
      console.log('Do Name Enquiry Error', error);
    },
  });

  const { data: accountData, refetch: refetchAccountsOptions } = useQuery({
    queryKey: ['accounts', queryParams],
    queryFn: ({ queryKey }) =>
      formik.values.merchantId
        ? getAccountsByMerchantId(formik.values.merchantId, queryKey[1] as QueryParams)
        : getAccounts(queryKey[1] as QueryParams),
  });

  const refetchAccountRef = useRef(false);

  useEffect(() => {
    const getPayeeName = () => {
      const selectedMerchant = merchantData?.responseData?.items?.find(
        (merchant: any) => merchant.id === formik.values.merchantId,
      );
      if (selectedMerchant) {
        formik.setFieldValue('payeeName', selectedMerchant?.name || '');
        formik.setFieldValue('payeeAddress', selectedMerchant?.address || '');
        notifySuccess('Successfully retrieved payee name and address');
      }
    };

    if (!refetchAccountRef.current) {
      refetchAccountRef.current = true;
      return;
    } else {
      refetchAccountsOptions();
      getPayeeName();
      formik.setFieldValue('accountId', '');
    }
  }, [formik.values.merchantId]);

  useEffect(() => {
    const accountNumber = formik.values.accountNumber;
    if (accountNumber.length === 10 && formik.values.bankCode.length > 1) {
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        doNameEnquiryMutation.mutate({
          destinationInstitutionCode: formik.values.bankCode,
          accountNumber: accountNumber,
          channelCode: '1',
        });
      }, 1000);
      setTimeoutId(newTimeoutId);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formik.values.accountNumber, formik.values.bankCode]);

  const getDayToApplyOptions = () => {
    if (formik.values.frequency === 'Daily') {
      return dailyFrequencyOptions;
    } else if (formik.values.frequency === 'Weekly') {
      return weeklyFrequencyOptions;
    } else if (formik.values.frequency === 'Monthly') {
      return monthlyFrequencyOptions;
    }
    return dailyFrequencyOptions;
  };
  const getDayToApplyFieldName = () => {
    if (formik.values.frequency === 'Daily') {
      return 'Day to Apply';
    } else if (formik.values.frequency === 'Weekly') {
      return 'Week to Apply';
    } else if (formik.values.frequency === 'Monthly') {
      return 'Month to Apply';
    }
    return 'Day to Apply';
  };

  const dayToApplyOptions = getDayToApplyOptions();

  const { data: merchantData } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const minStartDate = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
  };

  const minEndDate = () => {
    const startDate = new Date(minStartDate());
    return startDate.setDate(startDate.getDate() + 7);
  };

  return (
    <>
      <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
        <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
          <div className="">
            <FormContentContainer
              title="Mandate Details"
              titleExtension={
                <>
                  <div className="flex items-center justify-end gap-2 text-lg">
                    <p className="font-semibold">Mandate Type:</p>
                    <div className="relative flex items-center gap-2 rounded-lg bg-lilacPurple px-4 py-4">
                      <div className="flex items-center gap-1">
                        <label htmlFor="variable">
                          <input
                            type="radio"
                            className="h-4 w-4"
                            name="variable"
                            value={'Variable'}
                            checked={formik.values.mandateType === 'Variable'}
                            onChange={() => formik.setFieldValue('mandateType', 'Variable')}
                          />
                        </label>
                        <p>Variable</p>
                      </div>
                      <div className="ml-2 flex items-center gap-1">
                        <label htmlFor="fixed">
                          <input
                            type="radio"
                            className="h-4 w-4"
                            name="fixed"
                            value={'Fixed'}
                            checked={formik.values.mandateType === 'Fixed'}
                            onChange={() => formik.setFieldValue('mandateType', 'Fixed')}
                          />
                        </label>
                        <p>Fixed</p>
                      </div>
                      {(formik.touched.mandateType as any) &&
                        (formik.errors.mandateType as any) && (
                          <p className="absolute top-10 text-xs text-red-400">
                            {formik.errors.mandateType as any}
                          </p>
                        )}
                    </div>
                  </div>
                </>
              }
            >
              <div className="w-full md:col-span-1">
                <FormSelect
                  labelFor="merchantId"
                  label="Merchant ID"
                  formik={formik}
                  useTouched
                  options={formatApiDataForDropdown(merchantData?.responseData?.items, 'id', 'id')}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="productId"
                  label="Product ID"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="amount"
                  label="Amount"
                  inputType="number"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker
                  name={'startDate'}
                  formik={formik}
                  label="Start Date"
                  placeholder="Select date"
                  useTouched
                  minDate={minStartDate()}
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker
                  name={'endDate'}
                  formik={formik}
                  label="End Date"
                  placeholder="Select date"
                  useTouched
                  minDate={minEndDate()}
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="frequency"
                  label="Frequency"
                  formik={formik}
                  options={frequencyOptions}
                  useTouched
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="dayToApply"
                  label={getDayToApplyFieldName()}
                  formik={formik}
                  options={dayToApplyOptions}
                  useTouched
                  scrollableOptions
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="service"
                  label="Service"
                  formik={formik}
                  options={serviceOptions}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                  useTouched
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="accountName"
                  label="Customer Account Name"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  inputType="text"
                  useTouched
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="accountNumber"
                  label="Customer Account Number"
                  useTouched
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  inputType="text"
                  mode="numeric"
                  pattern="\d*"
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormSelect
                  labelFor="accountId"
                  label="Merchant Account Id"
                  formik={formik}
                  useTouched
                  options={formatApiDataForDropdown(accountData?.responseData?.items, 'id', 'id')}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="bankCode"
                  label="Bank Code"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  inputType="text"
                  mode="numeric"
                  pattern="\d*"
                  validateOnInput
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomFileUpload
                  labelFor="supportingDocument"
                  label="Upload Supporting Document"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-2">
                <CustomInput
                  labelFor="narration"
                  label="Narration"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <FormContentContainer title="Payer Details">
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerName"
                  label="Payer Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  disabled={acquiredAccountName && formik.values.payerName?.length > 0}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerEmailAddress"
                  label="Payer Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerPhoneNumber"
                  label="Payer Phone Number"
                  inputType="text"
                  mode="numeric"
                  pattern="\d*"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payerAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <FormContentContainer title="Payee Details">
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeeName"
                  label="Payee Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  disabled={
                    formik.values.merchantId?.length > 0 && formik.values.payeeName?.length > 0
                  }
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeeEmailAddress"
                  label="Payee Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeePhoneNumber"
                  label="Payee Phone Number"
                  inputType="text"
                  mode="numeric"
                  pattern="\d*"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payeeAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  disabled={
                    formik.values.merchantId?.length > 0 && formik.values.payeeAddress?.length > 0
                  }
                />
              </div>
            </FormContentContainer>
          </div>
          {/* <div className="mt-10">
            <FormContentContainer title={`Biller Details - ( Optional )`}>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="biller"
                  label="Biller Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerId"
                  label="Biller Id"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerCode"
                  label="Biller Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerAccountNumber"
                  label="Biller Account Number"
                  useTouched
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                  inputType="text"
                  mode="numeric"
                  pattern="\d*"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankCode"
                  label="Biller Bank Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankName"
                  label="Biller Bank Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div> */}
          <div className="mt-10">
            <div className="flex w-full items-center justify-end gap-4">
              <div className="w-auto">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  variant="outlined"
                  type="button"
                  title="Cancel"
                  customPaddingX="1.5rem"
                  width="10rem"
                  onClick={() => {
                    navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
                  }}
                />
              </div>
              <div className="w-auto">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="submit"
                  title="Add Mandate"
                  customPaddingX="1.5rem"
                  width="10rem"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {modals.confirmCreate && (
        <ModalWrapper
          isOpen={modals.confirmCreate}
          setIsOpen={() => closeModal('confirmCreate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={addMandateRequestMutation.isPending}
          proceedAction={() => {
            closeModal('confirmCreate');
            addMandateRequestMutation.mutate(mandateRequest);
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added a new mandate and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default SingleUpload;
