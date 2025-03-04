/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../FormElements/Button';

interface Props {
  children: React.ReactNode;
  formik?: any;
  buttonText?: string;
  bottomSectionClass?: string;
  bgDisbled: string;
  redirectToSignIn?: boolean;
  linkBack?: string;
  actionBTNClass?: string;
  resendOTPTag?: boolean;
  classesParentDiv?: string;
  resendOTPContent?: React.ReactNode;
  handleResetOTP?: (e: boolean) => void;
  OTPbtnDisabled?: boolean;
}

const LoginFormCard = ({
  children,
  formik,
  bottomSectionClass = '',
  redirectToSignIn = false,
  linkBack = '',
  actionBTNClass = 'px-3',
  resendOTPTag = false,
  classesParentDiv = 'my-5',
  resendOTPContent,
  handleResetOTP = () => {},
  OTPbtnDisabled = false,
}: Props) => {
  const handleOTPBTN = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleResetOTP(true);
  };

  return (
    <>
      <div className={` ${classesParentDiv} flex h-full flex-1 flex-col rounded-xl px-4 md:px-10`}>
        <form className="mb-2 mt-3 flex flex-1 flex-col px-4" onSubmit={formik.handleSubmit}>
          {children}
          <section className={`flex items-end ${bottomSectionClass}`}>
            <section className="flex w-full flex-col">
              <section className={`flex w-full justify-center ${actionBTNClass}`}>
                <div className="grow">
                  <Button
                    color="white"
                    width="15rem"
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                  />
                </div>
              </section>

              {redirectToSignIn && (
                <div className="flex justify-center py-3">
                  <Link to={linkBack} className="text-primary-700 cursor-pointer text-[12px]">
                    Take me back to sign in
                  </Link>
                </div>
              )}

              {resendOTPTag && (
                <div className="flex justify-center py-3">
                  <button
                    onClick={(e) => handleOTPBTN(e)}
                    type="button"
                    disabled={OTPbtnDisabled}
                    className={`cursor-pointer text-xs ${
                      OTPbtnDisabled ? 'text-gray-400' : 'text-primary'
                    } `}
                  >
                    Click to Resend?
                  </button>
                  <span className="cursor-pointer px-3 text-xs text-black/40">
                    Resend available
                  </span>
                  {resendOTPContent}
                </div>
              )}
            </section>
          </section>
        </form>
      </div>
    </>
  );
};

export default LoginFormCard;
