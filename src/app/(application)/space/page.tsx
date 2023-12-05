"use client";
import { Button } from "@/components/ui/button";
import { GithubIcon, LogOutIcon, UserIcon } from "lucide-react";
import { magic } from "@/lib/magic";
import showToast from "@/lib/show-toast";
import { RPCError, SDKError } from "magic-sdk";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Space() {
  const router = useRouter();

  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");

    magic.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        if (!isLoggedIn) router.push("/login");
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

  const checkUser = () => {
    if (!magic) return console.log("Magic not initialized");

    magic.user
      .getInfo()
      .then((data) => {
        console.log(data);
        showToast({
          message: "User info fetched, check console",
          type: "success",
        });
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

  const logout = () => {
    if (!magic) return console.log("Magic not initialized");

    magic.user
      .logout()
      .then(() => {
        router.push("/");
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
        <h1 className="text-3xl font-bold text-center">Space</h1>
        <p>Welcome to STCKY</p>

        <Button className="w-full " variant="outline" onClick={checkUser}>
          <UserIcon className="w-5 h-5 mr-2" />
          Check user Info
        </Button>
        <Button className="w-full " variant="outline" onClick={logout}>
          <LogOutIcon className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
