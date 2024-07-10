"use client";
import {
  onGetConversationMode,
  onToggleRealTime,
} from "@/actions/conversation";
import { useToast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useChatContext } from "./user-chat-context";

const useSidebar = () => {
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

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname?.split("/").pop();
  const { signOut } = useClerk();

  const onSignOut = async () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    onActivateRealTime,
    chatRoom,
    loading,
  };
};

export default useSidebar;
