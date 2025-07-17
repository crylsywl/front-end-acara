import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropsTypes) => {
  const { title, children } = props;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10">
      <PageHead title={title} />
      <section className="3xl:container items-center justify-center p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
