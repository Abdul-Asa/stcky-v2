import Link from "next/link";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p>
          By logging in, you accept our{" "}
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            terms
          </Link>{" "}
          and{" "}
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            privacy policy
          </Link>
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
