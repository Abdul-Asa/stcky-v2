"use client";
import { Button } from "@/components/ui/button";
import { LogOutIcon, PauseIcon, PlayIcon, UserIcon } from "lucide-react";
import showToast from "@/lib/show-toast";
import { ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useRenderCount from "@/lib/hooks/use-render-count";
import { Room } from "@/components/wrappers/room";
import Connect from "@/components/connection";
import { magic, handleError } from "@/lib/magic";
import { removeSessionToken } from "@/lib/server-actions";

export default function Space() {
  const router = useRouter();
  const render = useRenderCount();
  const sessionState = useSearchParams();
  const roomId = sessionState.get("roomId") || "";

  const checkUser = async () => {
    if (!magic) return console.log("Magic not initialized");
    await magic.user
      .isLoggedIn()
      .then((data) => {
        showToast({
          message: data ? "User is logged in" : "User is not logged in",
          type: data ? "success" : "error",
        });
      })
      .catch(handleError);
  };
  useEffect(() => {
    if (!magic) return console.log("Magic not initialized");
    magic.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        if (!isLoggedIn) {
          console.log("this should not happen");
          removeSessionToken();
        }
      })
      .catch(handleError);
  }, [router]);

  const CollabApp = ({ children }: { children?: ReactNode }) => (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-sm p-6 space-y-6 border rounded-lg shadow-lg dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center">Space</h1>
        <p>Welcome to STCKY: {render}</p>
        {children}
        <Button className="w-full " variant="outline" onClick={checkUser}>
          <UserIcon className="w-5 h-5 mr-2" />
          Check user Info
        </Button>
        <Button
          className="w-full "
          variant="outline"
          onClick={() => {
            router.replace("/space?roomId=123");
          }}
        >
          <PlayIcon className="w-5 h-5 mr-2" />
          Start shared session
        </Button>
        <Button
          className="w-full "
          variant="outline"
          onClick={() => {
            router.replace("/space");
          }}
        >
          <PauseIcon className="w-5 h-5 mr-2" />
          End shared session
        </Button>
        <Button
          className="w-full "
          variant="outline"
          onClick={() => {
            console.log("logOut");
            if (!magic) return console.log("Magic not initialized");
            magic.user.logout();
            removeSessionToken();
          }}
        >
          <LogOutIcon className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  if (!roomId) return <CollabApp />;

  return (
    <Room roomId={roomId}>
      <CollabApp>
        <Connect />
      </CollabApp>
    </Room>
  );
}
