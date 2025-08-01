import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/user-menu";
import { serverAuth } from "@/lib/server-auth";
import { getUserAccountInfo } from "@/actions/user";
import { TransactionsTable } from "./transactions";
import { redirect } from "next/navigation";
import React from "react";
import { Send, Download, FileText, Copy } from "lucide-react";

const formatCurrency = (amount: string, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(parseFloat(amount || "0"));
};

const page = async () => {
  const user = await serverAuth();
  if (!user) {
    return redirect("/login");
  }
  if (user.role === "admin") {
    return redirect("/admin");
  }

  const accountInfo = await getUserAccountInfo();

  return (
    <section className="flex flex-col flex-1 w-full px-2">
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">RTXB</h1>
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
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <UserMenu />
          <ModeToggle />
        </div>
      </header>
      <section className="flex-1">
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {accountInfo?.name}
            </h1>

              <Card className="w-full">
                <CardContent className="grid gap-1">
                  <div className="text-3xl font-bold">
                    {formatCurrency(
                      accountInfo?.balanceAmount || "0",
                      accountInfo?.currency || "USD"
                    )}
                  </div>
                  <div className="text-lg font-mono italic flex items-center gap-2">
                    {accountInfo?.accountNumber || "Not assigned"}
                    <span>
                      <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </div>
                <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 mt-4">
                  <Button className="flex items-center gap-2" variant="default">
                    <Send className="h-4 w-4" />
                   Send
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <Download className="h-4 w-4" />
                    Request
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <FileText className="h-4 w-4" />
                    Statement
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <Copy className="h-4 w-4" />
                    Copy Details
                  </Button>
                </div>
                </CardContent>
              </Card>


            <TransactionsTable />
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
