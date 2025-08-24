import { atom } from "recoil";
import type { Ticket } from "../types/Ticket";

export const TicketsAtom = atom<Ticket[]>({
  key: "TicketsAtom",
  default: [],
});

