import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/general/logo.svg"
        alt="logo"
        className="mb-10"
        width={180}
        height={180}
        priority
      />
      <Image
        src="/images/illustration/email-send.svg"
        alt="Register Success"
        className="mb-10"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-danger-500">
          Create Account Success
        </h2>
        <p className="text-md font-bold text-default-500">
          Check your email to activate your account
        </p>
        <Button
          color="danger"
          className="mt-4 w-fit"
          variant="bordered"
          onPress={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
