
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Task } from "../types/Task";
import { usePlayer } from "./PlayerContext";

type TaskContextType = {
  tasks: Task[];
  toggleTask: (id: number) => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
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
  const [tasks, setTasks] = useState<Task[]>([]);

  // プレイヤー情報の再取得
  const { refreshPlayer } = usePlayer();

  // タスク一覧を取得
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tasks"
        );

        if (!response.ok) {
          throw new Error(
            "タスクの取得に失敗しました"
          );
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchTasks();
  }, []);

  // タスク完了・未完了の切り替え
  const toggleTask = async (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error(
          "タスクの更新に失敗しました"
        );
      }

      const savedTask: Task = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? savedTask : task
        )
      );

      // XP・レベルを更新
      await refreshPlayer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // タスク編集
  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error(
          "タスクの更新に失敗しました"
        );
      }

      const savedTask: Task = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === savedTask.id ? savedTask : task
        )
      );

      // 優先度・完了状態が変更された場合に備える
      await refreshPlayer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // タスク作成
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      if (!response.ok) {
        throw new Error(
          "タスクの作成に失敗しました"
        );
      }

      const createdTask: Task = await response.json();

      setTasks((prevTasks) => [
        ...prevTasks,
        createdTask,
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // タスク削除
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "タスクの削除に失敗しました"
        );
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );

      // 完了済みタスク削除時のXP減算を反映
      await refreshPlayer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        toggleTask,
        updateTask,
        addTask,
        deleteTask,
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
