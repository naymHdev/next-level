export type TPriority = "High" | "Medium" | "Low" | "All";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: TPriority;
  assignedTo: string | null;
}

export type TFilter = "Medium" | "High" | "Low" | "All";

export interface IUser {
  id: string;
  name: string;
}
