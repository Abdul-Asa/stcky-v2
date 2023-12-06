import { Magic, RPCError, SDKError } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import showToast from "./show-toast";

export const magic =
  typeof window !== "undefined" &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
    extensions: [new OAuthExtension()],
  });

  export const handleError = (error: RPCError | SDKError) => {
    console.log(error);
    if (error instanceof RPCError || error instanceof SDKError) {
      console.log(error.code);
      showToast({ message: error.message, type: "error" });
    } else {
      showToast({ message: "Something went wrong", type: "error" });
    }
  };