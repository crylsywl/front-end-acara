import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropsTypes {
  status: "success" | "failed";
}

const Activation = (props: PropsTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/general/logo.svg"
        alt="logo"
        className="mb-10"
        width={180}
        height={180}
      />
      <Image
        src={status === "success" ? "/images/illustration/success.svg" : "/images/illustration/pending.svg"}
        alt="Register Success"
        className="mb-10"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-danger-500">
          {status === "success"
            ? "Activation Success"
            : "Activation Failed"}
        </h2>
        <p className="text-md font-bold text-default-500">
          {status === "success"
            ? "Thankyou for register account in Acara"
            : "Confirmation code is invalid"}
        </p>
        <Button
          color="danger"
          className="mt-4 w-fit"
          variant="bordered"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
