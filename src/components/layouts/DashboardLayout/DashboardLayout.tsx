import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsTypes {
  title?: string;
  children: ReactNode;
}

const DashboardLayout = (props: PropsTypes) => {
  const { title, children } = props;
  return (
    <div>
      <PageHead title={title}></PageHead>
      <section>{children} </section>
    </div>
  );
};

export default DashboardLayout;
