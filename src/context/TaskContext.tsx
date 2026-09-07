import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Task } from "../types/Task";

type TaskContextType = {
  tasks: Task[];
  toggleTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
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

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "タスクの取得に失敗しました"
          );
        }

        return response.json();
      })
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 const toggleTask = async (id: number) => {
  const task = tasks.find(
    (task) => task.id === id
  );

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

    const savedTask: Task =
      await response.json();

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? savedTask
          : task
      )
    );
  } catch (error) {
    console.error(error);
  }
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

  const deleteTask = (id: number) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "タスクの削除に失敗しました"
          );
        }

        setTasks((prevTasks) =>
          prevTasks.filter(
            (task) => task.id !== id
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
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