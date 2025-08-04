// import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  // BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/user-menu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10 bg-blue-900">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Finova Bright Bank</h1>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              {/* <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <UserMenu />
          {/* <ModeToggle /> */}
        </div>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
