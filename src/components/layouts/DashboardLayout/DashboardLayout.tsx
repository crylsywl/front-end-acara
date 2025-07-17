import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropsTypes {
  title?: string;
  children: ReactNode;
  type: string;
  description?: string;
}

const DashboardLayout = (props: PropsTypes) => {
  const { title, description, children, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />
      <div className="flex max-w-screen-2xl 2xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
