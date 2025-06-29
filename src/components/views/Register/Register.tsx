import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const { Visible, hendleVisible } = useRegister();
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-center gap-20">
      <div className="flex w-1/3 flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="Register"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustration/login.svg"
          alt="Register"
          className="w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-3xl font-bold text-danger-500">Create Account</h2>
          <p className="mb-4 text-sm">
            Have an account?&nbsp;
            <Link
              href="login"
              className="text-sm font-semibold text-danger-400"
            >
              Login here
            </Link>
          </p>
          <form className="flex w-80 flex-col gap-4">
            <Input
              type="text"
              label="Fullname"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="text"
              label="Username"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="email"
              label="Email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type={Visible.password ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => hendleVisible("password")}
                >
                  {Visible.password ? (
                    <FaEye className="text-default-500" />
                  ) : (
                    <FaEyeSlash className="text-default-500" />
                  )}
                </button>
              }
            />
            <Input
              type={Visible.confirmPassword ? "text" : "password"}
              label="Confirm Password"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => hendleVisible("confirmPassword")}
                >
                  {Visible.confirmPassword ? (
                    <FaEye className="text-default-500" />
                  ) : (
                    <FaEyeSlash className="text-default-500" />
                  )}
                </button>
              }
            />
            <Button color="danger" size="lg" type="submit">
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
