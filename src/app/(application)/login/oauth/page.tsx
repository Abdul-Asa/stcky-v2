"use client";
import { magic } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { RPCError, SDKError } from "magic-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OAuth({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [magicInfo, setMagicInfo] = useState<any>("loading");

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    if (!searchParams.magic_credential && !searchParams.magic_oauth_request_id)
      return console.log("No credentials");
    magic.oauth
      .getRedirectResult()
      .then((data) => {
        setMagicInfo(data);
        showToast({ message: "Logged in", type: "success" });
        router.push("/space");
      })
      .catch((e) => {
        if (e instanceof RPCError || SDKError) {
          console.log(e.code);
        } else {
          showToast({ message: "Something went wrong", type: "error" });
        }
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">OAuth</h1>
        <p className="text-center ">{JSON.stringify(magicInfo)}</p>
      </div>
    </div>
  );
}
