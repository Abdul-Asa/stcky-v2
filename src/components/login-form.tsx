import { magic, handleError } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { formSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { isUserLoggedInAtom, loadingsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function LoginForm() {
  const [, getIsLoggedIn] = useAtom(isUserLoggedInAtom);
  const [loading] = useAtom(loadingsAtom);
  const router = useRouter();
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
        console.log(data);
        getIsLoggedIn(true);
        showToast({ message: "Login successful", type: "success" });
        router.push("/space");
      })
      .catch(handleError);
  }
  return (
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
  );
}
