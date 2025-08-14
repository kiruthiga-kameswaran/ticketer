import { atom } from "recoil";

type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  createdBy: string; 
  dueDate?: string; // optional, as it may not be returned by the API
  // add other properties as needed, e.g. title: string;
};

const TicketsAtom = atom<Ticket[]>({
  key: "ticketsAtom",
  default: [],
});

export default TicketsAtom;
