"use client";
import { magic, handleError } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setSessionToken } from "@/lib/server-actions";

export default function OAuth({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    if (!searchParams.magic_credential && !searchParams.magic_oauth_request_id)
      return console.log("No credentials");
    magic.oauth
      .getRedirectResult()
      .then((data) => {
        setSessionToken(data.magic.idToken).then((res) => {
          showToast({
            message: res.error ? res.error : "Logged in successfully",
            type: res.error ? "error" : "success",
          });
          if (!res.error) {
            router.push("/space");
          }
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">OAuth</h1>
        <p className="text-center ">
          {loading ? "Redirecting you soon" : "Youre ready"}
        </p>
      </div>
    </div>
  );
}
