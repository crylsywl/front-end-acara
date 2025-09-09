import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  current: string;
  onUpdate: (data: { icon: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
  const { current, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteIcon,
    handleUploadIcon,
    resetUpdateIcon,
    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
        resetUpdateIcon();
    }
  }, [isSuccessUpdate])

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-small font-medium text-default-400">
              Current Icon
            </p>
            <Skeleton isLoaded={!!current} className="aspect-square rounded-lg">
              <Image
                src={current}
                alt="Current Icon"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="mb-2 text-small font-medium text-default-400">
                    Upload New Icon
                  </p>
                }
                onUpload={(files) => handleUploadIcon(files, onChange)}
                onDelete={() => handleDeleteIcon(onChange)}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                errorMessage={errorsUpdateIcon.icon?.message}
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate || isPendingMutateUploadFile ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
