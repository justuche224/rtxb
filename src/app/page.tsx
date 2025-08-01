"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedFirstAdmin } from "@/actions/admin";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const seedAdmin = async () => {
    try {
      setIsLoading(true);
      console.log("seedAdmin");
      const result = await seedFirstAdmin({
        email: "admin@test.com",
        password: "12345678",
        name: "Admin User",
      });
      console.log("result", result);
      alert("Admin user created successfully!");
      console.log("Admin created:", result);
    } catch (error) {
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
