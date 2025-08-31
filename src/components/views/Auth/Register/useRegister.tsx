import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("input your fullname"),
  username: yup.string().required("input your username"),
  email: yup
    .string()
    .email("Sertakan '@' pada alamat email.")
    .required("input your email"),
  password: yup
    .string()
    .min(8, "minimal 8 karakter")
    .required("input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "password not match")
    .required("input your confirm password"),
});

const useRegister = () => {
  const router = useRouter();

  const [Visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const {setToaster} = useContext(ToasterContext)

  const hendleVisible = (key: "password" | "confirmPassword") => {
    setVisible({
      ...Visible,
      [key]: !Visible[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload : IRegister) => {
    const result = await authService.register(payload);
    return result;
  }

  const {mutate: mutateRegister, isPending: isPandingRegister} = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      setToaster({
        type: 'error',
        message: error.message
      })
    },
    onSuccess: ()=> {
      reset();
      setToaster({
        type: 'success',
        message: 'Registration Success'
      })
      router.push("/auth/register/success");
    }
  })

  const handleRegister = (data : IRegister) => mutateRegister(data);

  return {
    Visible,
    hendleVisible,
    control,
    handleSubmit,
    handleRegister,
    isPandingRegister,
    errors
  };
};

export default useRegister;
