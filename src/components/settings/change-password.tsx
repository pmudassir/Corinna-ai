import { useChangePassword } from "@/hooks/settings/use-settings";
import React from "react";

type Props = {};

const ChangePassword = (props: Props) => {
  const { onChangePassword, register, errors, loading } = useChangePassword();
  return <div>ChangePassword</div>;
};

export default ChangePassword;
