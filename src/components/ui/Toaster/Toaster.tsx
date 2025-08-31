import { IToaster } from "@/contexts/ToasterContext";
import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-3xl text-success-500" />,
  error: <CiCircleRemove className="text-3xl text-danger-500" />,
};

const Toaster = (props: IToaster) => {
  const { type, message } = props;
  let bg = type == 'success' ? "bg-success-50" : "bg-danger-50";
  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className={`fixed right-8 top-8 z-50 rounded-xl border border-gray-200 shadow-sm ${bg}`}
    >
      <div className="flex flex-row items-center gap-2 p-4">
        {iconList[type]}
        <p className="text-sm text-default-500">{message}</p>
      </div>
    </div>
  );
};

export default Toaster;
