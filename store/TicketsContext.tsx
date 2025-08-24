"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Ticket } from '../types/Ticket';

// Create the context with default values
type TicketsContextType = {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
};

const TicketsContext = createContext<TicketsContextType>({
  tickets: [],
  setTickets: () => {},
});

// Create a provider component
export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  return (
    <TicketsContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketsContext.Provider>
  );
}

// Create a custom hook for easy usage
export function useTickets() {
  return useContext(TicketsContext);
}