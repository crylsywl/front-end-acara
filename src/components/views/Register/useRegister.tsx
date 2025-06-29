import { useState } from "react";

const useRegister = () => {
  const [Visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const hendleVisible = (key: "password" | "confirmPassword") => {
    setVisible({
      ...Visible,
      [key]: !Visible[key],
    });
  };
  return {
    Visible,
    hendleVisible,
  };
};

export default useRegister;
