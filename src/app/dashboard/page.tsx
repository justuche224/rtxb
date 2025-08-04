
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serverAuth } from "@/lib/server-auth";
import { getUserAccountInfo } from "@/actions/user";
import { TransactionsTable } from "./transactions";
import { redirect } from "next/navigation";
import React from "react";
import { Send, Download, FileText, Copy } from "lucide-react";
import Link from "next/link";

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
                  <Button asChild className="flex items-center gap-2" variant="default">
                    <Link href="/dashboard/send">
                    <Send className="h-4 w-4" />
                    Send
                    </Link>
                  </Button>
                  <Button asChild className="flex items-center gap-2" variant="outline">
                    <Link href="/dashboard/request">
                    <Download className="h-4 w-4" />
                    Request
                    </Link>
                  </Button>
                  <Button asChild className="flex items-center gap-2" variant="outline">
                    <Link href="/dashboard/statement">
                    <FileText className="h-4 w-4" />
                    Statement
                    </Link>
                  </Button>
                  <Button asChild className="flex items-center gap-2" variant="outline">
                    <Link href="/dashboard/copy">
                    <Copy className="h-4 w-4" />
                    Copy Details
                    </Link>
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
