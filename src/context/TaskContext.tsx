import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Task } from "../types/Task";

type TaskContextType = {
  tasks: Task[];
  toggleTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
  addTask: (task: Task) => void;
};

const TaskContext =
  createContext<TaskContextType | undefined>(
    undefined
  );

export function TaskProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "応用情報の勉強",
      detail: "テクノロジ系の問題を50問解く",
      date: "2026-08-15",
      deadline: "2026-08-15T23:59",
      priority: "高",
      completed: false,
    },
    {
      id: 2,
      name: "Task Questの開発",
      detail: "タスク詳細機能を実装する",
      date: "2026-08-16",
      deadline: "2026-08-16T18:00",
      priority: "中",
      completed: false,
    },
    {
      id: 3,
      name: "資料を確認する",
      detail: "必要な資料を確認する",
      date: "2026-08-17",
      priority: "低",
      completed: true,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      task,
    ]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        toggleTask,
        updateTask,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
}