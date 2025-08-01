import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await serverAuth();
  if (!user) {
    return redirect("/login");
  }
  if (user.role === "admin") {
    return redirect("/admin");
  }
  return <div>page</div>;
};

export default page;
