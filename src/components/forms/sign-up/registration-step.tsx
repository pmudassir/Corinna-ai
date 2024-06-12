"use client";
import { Spinner } from "@/components/spinner";
import { useAuthContextHook } from "@/context/use-auth-context";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./type-selection-form";

const DetailForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: () => <Spinner noPadding />,
});

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: () => <Spinner noPadding />,
});

type Props = {};

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOtp, setOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");

  setValue("otp", onOtp);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );
    case 2:
      return <DetailForm register={register} errors={errors} />;
    case 3:
      return <OTPForm onOtp={onOtp} setOTP={setOTP} />;
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
