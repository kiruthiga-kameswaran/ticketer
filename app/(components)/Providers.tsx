"use client";
import { SessionProvider } from "next-auth/react";
import { TicketsProvider } from "../../store/TicketsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TicketsProvider>
        {children}
      </TicketsProvider>
    </SessionProvider>
  );
}