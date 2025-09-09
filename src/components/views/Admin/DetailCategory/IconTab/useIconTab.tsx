import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateIcon = Yup.object().shape({
  icon: Yup.mixed<FileList | string>().required("please input icon"),
});

const useIconTab = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    mutateUploadFile,
    mutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errorsUpdateIcon },
    reset: resetUpdateIcon,
    watch: watchUpdateIcon,
    getValues: getValuesUpdateIcon,
    setValue: setValueUpdateIcon,
  } = useForm({
    resolver: yupResolver(schemaUpdateIcon),
  });

  const preview = watchUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateIcon("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateIcon("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
    console.log("delete icon : ", fileUrl);
  };

  return {
    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteIcon,
    handleUploadIcon,
    resetUpdateIcon,
    preview,
  };
};

export default useIconTab;
