import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import { reasonForRejectionSchema } from 'utils/formValidators';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomInput from 'components/FormElements/CustomInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveMerchantRequest,
  getMerchantRequestById,
  rejectMerchantRequest,
} from 'config/actions/merchant-actions';
import RejectedIcon from 'assets/icons/RejectedIcon';
import { RequestStatus } from 'utils/enums';
import { formatNumberDisplay } from 'utils/helpers';
import { getStaffUserById } from 'config/actions/staff-user-actions';

const MerchantCreationRequestDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestId = searchParams?.get('id') || '';
  console.log(requestId);
  const merchantId = searchParams?.get('merchantId') || '';
  const queryClient = useQueryClient();
  const [modals, setModals] = useState({
    confirmApproveRequest: false,
    confirmRejectRequest: false,
    approveSuccessfulModal: false,
    rejectSuccessfulModal: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      remark: '',
    },
    validationSchema: reasonForRejectionSchema,
    onSubmit: () => {
      rejectMerchantRequestMutation.mutate(requestId);
    },
  });

  const { data } = useQuery({
    queryKey: ['merchantRequests', requestId],
    queryFn: ({ queryKey }) => getMerchantRequestById(queryKey[1]),
  });

  const approveMerchantRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => approveMerchantRequest(requestId),
    onSuccess: () => {
      closeModal('confirmApproveRequest');
      openModal('approveSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['merchantRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  const rejectMerchantRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => rejectMerchantRequest(requestId, formik.values),
    onSuccess: () => {
      closeModal('confirmRejectRequest');
      openModal('rejectSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['merchantRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  const { data: ApproverDetails } = useQuery({
    queryKey: ['users', data?.responseData?.approvedBy],
    queryFn: ({ queryKey }) => getStaffUserById(queryKey[1]),
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.requests.merchantRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Requests
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Merchant Creation Request Details</span>
        </div>
        <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
          <h2 className="text-lg font-semibold md:text-2xl">{`Merchant ID : ${data?.responseData?.id}`}</h2>
          {data?.responseData?.status === RequestStatus.Pending && (
            <div className="flex w-1/2 items-center justify-end gap-4">
              <div className="w-auto">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  variant="outlined"
                  type="button"
                  title="Reject"
                  customPaddingX="3rem"
                  onClick={() => {
                    openModal('confirmRejectRequest');
                  }}
                />
              </div>
              <div className="w-auto">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Approve"
                  customPaddingX="3rem"
                  onClick={() => {
                    openModal('confirmApproveRequest');
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Merchant Creation Details">
              <DetailsCard title="Merchant ID" content={data?.responseData?.id} />
              <DetailsCard title="Merchant Name" content={data?.responseData?.name} />
              <DetailsCard title="Merchant Code" content={data?.responseData?.merchantCode} />
              <DetailsCard title="CIF Number" content={data?.responseData?.cif} />
              <DetailsCard
                title="Merchant Fee"
                content={`\u20A6${data?.responseData?.internalChargeFee ? formatNumberDisplay(data?.responseData?.internalChargeFee) : ''}`}
                contentClassName="text-lightPurple"
              />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content={data?.responseData?.creatorId} />
              <DetailsCard title="Created By" content={data?.responseData?.createdBy} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
              <DetailsCard title="Address" content={data?.responseData?.address} />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            {data?.responseData?.status === 'Approved' && (
              <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
                <DetailsCard title="ID" content={data?.responseData?.approvedBy} />
                <DetailsCard
                  title="Approved By"
                  content={
                    ApproverDetails?.responseData
                      ? `${ApproverDetails?.responseData?.firstName} ${ApproverDetails?.responseData?.lastName}`
                      : ''
                  }
                />
                <DetailsCard
                  title="Date Approved"
                  content={
                    data?.responseData?.dateApproved &&
                    new Date(data.responseData.dateApproved).toLocaleDateString()
                  }
                />
              </ItemDetailsContainer>
            )}
            {data?.responseData?.status === 'Declined' && (
              <ItemDetailsContainer title="Rejector Details" titleExtension={<RejectedIcon />}>
                <DetailsCard title="ID" content={data?.responseData?.rejectorId} />
                <DetailsCard title="Rejected By" content={data?.responseData?.rejectedBy} />
                <DetailsCard
                  title="Date Rejected"
                  content={
                    data?.responseData?.dateRejected &&
                    new Date(data.responseData.dateRejected).toLocaleDateString()
                  }
                />
                <DetailsCard title="Reason for Rejection" content={data?.responseData?.remark} />
              </ItemDetailsContainer>
            )}
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Requested By">
              <DetailsCard title="Requested By" content={data?.responseData?.requestedBy} />
              <DetailsCard
                title="Date Requested"
                content={
                  data?.responseData?.dateRequested &&
                  new Date(data.responseData.dateRequested).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve Merchant Request?'}
          info={
            'You are about to approve this new merchant creation request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            approveMerchantRequestMutation.mutate(requestId);
          }}
        />
      )}

      {modals.approveSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.approveSuccessfulModal}
          setIsOpen={() => closeModal('approveSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully approved this new merchant request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('approveSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.merchantRequests.index}`);
          }}
        />
      )}

      {modals.confirmRejectRequest && (
        <ModalWrapper
          isOpen={modals.confirmRejectRequest}
          width="700px"
          setIsOpen={() => closeModal('confirmRejectRequest')}
          title={'Reject Merchant Request?'}
          info={
            'You are about to reject this merchant creation request, would you want to proceed with this?'
          }
          feedback={
            <div className="w-full md:col-span-1">
              <CustomInput
                labelFor="remark"
                label="Reason For Rejection"
                inputType="text"
                placeholder="Type here"
                maxW="w-full"
                formik={formik}
              />
            </div>
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedBackgroundColor="#F34E4E"
          hoverBackgroundColor="#8B0000"
          proceedAction={() => {
            formik.handleSubmit();
          }}
        />
      )}
      {modals.rejectSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.rejectSuccessfulModal}
          setIsOpen={() => closeModal('rejectSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully rejected this merchant creation request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('rejectSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.merchantRequests.index}`);
          }}
        />
      )}
    </>
  );
};

export default MerchantCreationRequestDetails;
