export type Task = {
  id: number;
  name: string;
  deadline: string;
  priority: "高" | "中" | "低";
  completed: boolean;
};