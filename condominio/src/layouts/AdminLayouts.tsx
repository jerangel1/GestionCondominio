import React, { useState } from "react";
import { Sidebar } from "../components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const { user } = useUser();
  const userName = user?.firstName || "Usuario";

  return (
    <div className={`grid ${isMinimized ? 'grid-cols-[64px_1fr]' : 'grid-cols-[256px_1fr]'} bg-white transition-all duration-300 min-h-screen`}>
      <Sidebar 
        isMinimized={isMinimized} 
        setIsMinimized={setIsMinimized}
        userName={userName}
      />
      <div className="flex flex-col">
        <main className="flex-grow p-5">
          {children}
        </main>
      </div>
    </div>
  );
}