import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  name: Yup.string().required("please input name"),
  description: Yup.string().required("please input description"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
    watch: watchUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  // Watch nilai form
  const nameValue = watchUpdateInfo("name");
  const descriptionValue = watchUpdateInfo("description");

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    nameValue,
    descriptionValue,
  };
};

export default useInfoTab;
