import { LoginForm } from "@/components/login-form";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await serverAuth();
  if (user && user.role === "admin") {
    return redirect("/admin");
  }
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
