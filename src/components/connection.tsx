"use client";
import { Button } from "@/components/ui/button";
import { BluetoothConnected, LogOutIcon, UserIcon } from "lucide-react";
import { useRoom, useStatus } from "@liveblocks.config";
import { useEffect } from "react";

export default function Connect() {
  const room = useRoom();
  const status = useStatus();
  const capitalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  const roomName = room.id;

  return (
    <>
      {capitalizedStatus + " to room:" + roomName}
      <Button
        className="w-full "
        variant="outline"
        onClick={() => {
          room.connect();
        }}
      >
        <BluetoothConnected className="w-5 h-5 mr-2" />
        Connect
      </Button>
      <Button
        className="w-full "
        variant="outline"
        onClick={() => {
          room.disconnect();
        }}
      >
        <LogOutIcon className="w-5 h-5 mr-2" />
        Disconnect
      </Button>
    </>
  );
}
