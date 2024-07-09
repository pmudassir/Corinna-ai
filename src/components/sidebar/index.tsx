"use client";
import React from "react";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const Sidebar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSidebar();
  
  return <div>Sidebar</div>;
};

export default Sidebar;
