"use client";

import { onGetConversationMode, onToggleRealTime } from "@/actions/conversation";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { useChatContext } from "./user-chat-context";

type Props = {};

const useSidebar = (props: Props) => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const { chatRoom } = useChatContext();

  const onActivateRealTime = async (e: any) => {
    try {
      const realTime = await onToggleRealTime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );
      if (realTime) {
        setRealtime(realTime.chatRoom.live);
        toast({
          title: "Success",
          description: realTime.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  return <div>useSidebar</div>;
};

export default useSidebar;
