export type Task = {
  id: number;
  priority: "高" | "中" | "低";
  name: string;

  date: string;
  deadline?: string;

  completed: boolean;
};