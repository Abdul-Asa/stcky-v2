"use client";
import { magic, handleError } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { formSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon, ChromeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { setSessionToken } from "@/lib/server-actions";
import { OAuthProvider } from "@magic-ext/oauth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!magic) return console.log("Magic not initialized");

    return magic.auth
      .loginWithEmailOTP(values)
      .then((data) => {
        setSessionToken(data || "").then((res) => {
          showToast({
            message: res.error ? res.error : "Logged in successfully",
            type: res.error ? "error" : "success",
          });
          if (!res.error) {
            router.push("/space");
          }
        });
      })
      .catch(handleError);
  }
  async function handleOAuthLogin(provider: OAuthProvider) {
    if (!magic) return console.log("Magic not initialized");
    await magic.oauth
      .loginWithRedirect({
        provider,
        redirectURI: new URL("/login/oauth", window.location.origin).href,
        scope: ["email"],
      })
      .catch(handleError);
  }

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    magic.user.logout();
    setLoading(false);
  }, []);

  return (
    <>
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
            disabled={form.formState.isSubmitting || loading}
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
      <Button
        className="w-full"
        variant="outline"
        disabled={loading}
        onClick={() => handleOAuthLogin("google")}
      >
        <ChromeIcon className="w-5 h-5 mr-2" />
        Login with Google
      </Button>
      <Button
        className="w-full "
        variant="outline"
        disabled={loading}
        onClick={() => handleOAuthLogin("github")}
      >
        <GithubIcon className="w-5 h-5 mr-2" />
        Login with Github
      </Button>
    </>
  );
}
