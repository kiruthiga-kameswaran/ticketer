export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: string;
  progress: number;
  status: string;
  createdBy: string;
  dueDate?: string; 
  assignee: string;// optional, as it may not be returned by the API
  // add other properties as needed, e.g. title: string;
};
