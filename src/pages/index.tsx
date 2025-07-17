import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead />
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-danger-500">
            Welcome to My Next.js App
          </h1>
          <p>This is a simple example of a Next.js application.</p>
          <p className="max-w-2xl text-center">
            This project is a dummy authentication system that includes basic
            features such as user registration and login. It is built using
            Next.js and designed for learning and demonstration purposes only.
          </p>
          <h2 className="text-danger-500 font-bold">
            Please enter a valid email address to receive the activation email.
          </h2>
        </div>
        <div className="flex flex-row gap-4">
          <Link href={"/auth/register"}>
            <Button color="danger">Register</Button>
          </Link>
          <Link href={"/auth/login"}>
            <Button color="danger">Login</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
