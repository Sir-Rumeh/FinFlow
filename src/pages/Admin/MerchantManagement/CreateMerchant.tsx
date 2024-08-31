import { Link, useLocation, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import { BiChevronRight } from 'react-icons/bi';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';

const CreateMerchant = () => {
  const navigate = useNavigate();
  const [merchantCifValidated, setMerchantCifValidated] = useState(false);
  const [modals, setModals] = useState({
    confirmOnboardMerchant: false,
    onboardingSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.merchantManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Management
          </Link>{' '}
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-lightPurple">Onboard Merchant</span>
        </div>
        <div className="slide-down mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Onboard Merchant</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <div className="relative md:w-[80%] xl:w-[70%]">
              <div className="flex flex-col items-end gap-x-8 gap-y-4 md:flex-row md:justify-between">
                <div className="w-full md:w-[80%]">
                  <CustomInput
                    labelFor="merchantCIF"
                    label="Enter Merchant CIF"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                  />
                </div>
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Continue"
                  height="3rem"
                  customPaddingX="2rem"
                  disabled={merchantCifValidated}
                  onClick={() => setMerchantCifValidated(true)}
                />
              </div>
              {merchantCifValidated && (
                <div className="slide-down">
                  <div className="relative mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
                    <CustomInput
                      labelFor="merchantName"
                      label="Merchant Name"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                    />
                    <CustomInput
                      labelFor="accountNumber"
                      label="Account Number"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                    />
                    <CustomInput
                      labelFor="rcNumber"
                      label="RC Number"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                    />
                    <CustomInput
                      labelFor="address"
                      label="Address"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                    />
                  </div>
                  <div className="mt-10 flex items-center justify-end">
                    <ButtonComponent
                      variant="contained"
                      color="white"
                      backgroundColor="#5C068C"
                      hoverBackgroundColor="#2F0248"
                      type="button"
                      title="Onboard Merchant"
                      height="3rem"
                      customPaddingX="1.4rem"
                      onClick={() => {
                        openModal('confirmOnboardMerchant');
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modals.confirmOnboardMerchant && (
        <ModalWrapper
          isOpen={modals.confirmOnboardMerchant}
          setIsOpen={() => closeModal('confirmOnboardMerchant')}
          title={'Onboard Merchant?'}
          info={'You are about to onboard this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmOnboardMerchant');
            openModal('onboardingSuccessful');
          }}
        />
      )}

      {modals.onboardingSuccessful && (
        <ModalWrapper
          isOpen={modals.onboardingSuccessful}
          setIsOpen={() => closeModal('onboardingSuccessful')}
          title={'Success!!'}
          info={'You have successfully onboarded this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('onboardingSuccessful');
            navigate(`/${appRoutes.adminDashboard.merchantManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default CreateMerchant;
