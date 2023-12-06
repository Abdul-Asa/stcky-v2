"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, ChromeIcon, WalletIcon } from "lucide-react";
import { magic, handleError } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import useRenderCount from "@/lib/hooks/use-render-count";
import { OAuthProvider } from "@magic-ext/oauth";
import LoginForm from "@/components/login-form";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { isUserLoggedInAtom, loadingsAtom } from "@/lib/atoms";

export default function LoginPage() {
  const render = useRenderCount();
  const router = useRouter();
  const [isLoggedIn, getIsLoggedIn] = useAtom(isUserLoggedInAtom);
  const [loading] = useAtom(loadingsAtom);

  useEffect(() => {
    getIsLoggedIn();
    if (isLoggedIn) router.push("/space");
  }, [getIsLoggedIn, isLoggedIn, router]);

  const handleLogin = async (provider: OAuthProvider) => {
    if (!magic) return console.log("Magic not initialized");
    await magic.oauth
      .loginWithRedirect({
        provider,
        redirectURI: new URL("/login/oauth", window.location.origin).href,
        scope: ["email"],
      })
      .catch(handleError);
  };

  const walletLogin = async () => {
    if (!magic) return console.log("Magic not initialized");
    await magic.wallet
      .connectWithUI()
      .then((data) => {
        console.log(data);
        showToast({ message: "Login successful", type: "success" });
        router.push("/space");
      })
      .catch(handleError);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">Login: {render}</h1>
        <p>Logged in: {isLoggedIn ? "yes" : "no"}</p>
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
        <div className="flex items-center space-x-2">
          <hr className="flex-grow " />
          <span className="text-sm ">OR</span>
          <hr className="flex-grow " />
        </div>
        <Button
          className="w-full"
          variant="outline"
          disabled={loading}
          onClick={() => handleLogin("google")}
        >
          <ChromeIcon className="w-5 h-5 mr-2" />
          Login with Google
        </Button>
        <Button
          className="w-full "
          variant="outline"
          disabled={loading}
          onClick={() => handleLogin("github")}
        >
          <GithubIcon className="w-5 h-5 mr-2" />
          Login with Github
        </Button>
        <Button
          className="w-full "
          variant="outline"
          disabled={loading}
          onClick={walletLogin}
        >
          <WalletIcon className="w-5 h-5 mr-2" />
          Login with Wallet
        </Button>
      </div>
    </div>
  );
}
