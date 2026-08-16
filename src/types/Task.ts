export type Priority = "高" | "中" | "低";

export type Task = {
  id: number;
  name: string;
  detail?: string;
  date: string;
  deadline?: string;
  priority: Priority;
  completed: boolean;
};