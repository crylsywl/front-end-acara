import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropsTypes) => {
  const { title, children } = props;
  return (
    <>
      <PageHead title={title} />
      <section className="3xl:container items-center justify-center p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
