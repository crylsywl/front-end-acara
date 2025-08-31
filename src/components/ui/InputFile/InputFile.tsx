import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropsTypes {
  name: string;
  className?: string;
  isDropable?: boolean;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  isUploading?: boolean;
  isDeleting?: boolean;
  preview?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

const InputFile = (props: PropsTypes) => {
  const {
    name,
    className,
    isDropable = false,
    onDelete,
    onUpload,
    preview,
    isDeleting,
    isUploading,
    isInvalid,
    errorMessage,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-400 bg-gray-200 hover:bg-gray-300",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 flex items-center justify-center">
              <Image fill src={preview} alt="image" className="!relative" />
            </div>
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute right-2 top-2 h-9 w-9 items-center justify-center rounded bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="h-5 w-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 flex items-center justify-center">
              <CiSaveUp2 className="text-3xl font-semibold text-gray-500" />
            </div>
            <p className="text-sm font-semibold text-gray-500">
              {isDropable
                ? "drag and drop or click for uploaded image"
                : "click for uploaded image"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
