import React from "react";

type Props = {
  otp: string;
  setOTP: React.Dispatch<React.SetStateAction<string>>;
};

const OTPInput = ({ otp, setOTP }: Props) => {
  return <div>OTPInput</div>;
};

export default OTPInput;
