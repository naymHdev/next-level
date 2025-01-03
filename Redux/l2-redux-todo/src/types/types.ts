export type TPriority = "High" | "Medium" | "Low" | "All";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: TPriority;
}

export type TFilter = "Medium" | "High" | "Low" | "All";
