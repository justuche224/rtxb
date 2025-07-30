"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seedAdmin = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await authClient.signUp.email(
        {
          email: "test@test.com",
          password: "12345678",
          name: "test",
          image: "https://via.placeholder.com/150",
        },
        {
          onRequest: (ctx) => {
            console.log("onRequest", ctx);
          },
          onSuccess: (ctx) => {
            console.log("onSuccess", ctx);
          },
          onError: (ctx) => {
            console.log("onError", ctx);
            alert(ctx.error.message);
          },
        }
      );

      console.log("data", data);
      console.log("error", error);
    } catch (error) {
      alert("Error: check the console");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={seedAdmin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Seed Admin"}
      </Button>
    </div>
  );
};

export default Page;
