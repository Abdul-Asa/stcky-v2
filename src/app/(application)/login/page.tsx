"use client";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon, ChromeIcon, WalletIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { magic } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { RPCError, SDKError } from "magic-sdk";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    magic.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        if (isLoggedIn) router.push("/space");
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
  }, [router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!magic) return console.log("Magic not initialized");

    return magic.auth
      .loginWithEmailOTP(values)
      .then((data) => {
        console.log(data);
        showToast({ message: "Login successful", type: "success" });
        router.push("/space");
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
  }

  const googleLogin = async () => {
    if (!magic) return console.log("Magic not initialized");
    await magic.oauth
      .loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/login/oauth", window.location.origin).href,
        scope: ["email"],
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
  };
  const githubLogin = async () => {
    if (!magic) return console.log("Magic not initialized");
    await magic.oauth
      .loginWithRedirect({
        provider: "github",
        redirectURI: new URL("/login/oauth", window.location.origin).href,
        scope: ["email"],
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
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
      .catch((e) => {
        console.log(e);
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
          showToast({ message: e.message, type: "error" });
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    An OTP will be sent to the email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="flex items-center space-x-2">
          <hr className="flex-grow " />
          <span className="text-sm ">OR</span>
          <hr className="flex-grow " />
        </div>
        <Button className="w-full" variant="outline" onClick={googleLogin}>
          <ChromeIcon className="w-5 h-5 mr-2" />
          Login with Google
        </Button>
        <Button className="w-full " variant="outline" onClick={githubLogin}>
          <GithubIcon className="w-5 h-5 mr-2" />
          Login with Github
        </Button>
        <Button className="w-full " variant="outline" onClick={walletLogin}>
          <WalletIcon className="w-5 h-5 mr-2" />
          Login with Wallet
        </Button>
      </div>
    </div>
  );
}
