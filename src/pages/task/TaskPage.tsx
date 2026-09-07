import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";
import TaskDetailSheet from "../../components/TaskDetailSheet";

import type { Task } from "../../types/Task";

import "./TaskPage.css";

function TaskPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

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
        console.log(
          "取得したタスク:",
          data
        );

        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

const handleToggleTask = async (id: number) => {
  const task = tasks.find(
    (task) => task.id === id
  );

  if (!task) {
    return;
  }

  const updatedTask = {
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

    const savedTask = await response.json();

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

  const handleDeleteTask = async (
    id: number
  ) => {
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
        prevTasks.filter(
          (task) => task.id !== id
        )
      );

      setSelectedTask(null);

      console.log(
        "削除したタスクID:",
        id
      );
    } catch (error) {
      console.error(error);
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) =>
      Number(a.completed) -
      Number(b.completed)
  );

  const handleSelectTask = (
    task: Task
  ) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleCreateTask = () => {
    navigate("/task/create", {
      state: {
        from: "/task",
      },
    });
  };

  return (
    <div className="taskPage">
      <header className="taskHeader">
        <h1>タスク</h1>
      </header>

      <main className="taskContent">
        <div className="taskTitleArea">
          <div>
            <h2>タスク一覧</h2>

            <p>
              {tasks.length}
              件のタスク
            </p>
          </div>

          <button
            type="button"
            className="addTaskButton"
            onClick={handleCreateTask}
          >
            ＋
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="emptyTask">
            <p>
              タスクがありません
            </p>

            <button
              type="button"
              onClick={handleCreateTask}
            >
              タスクを追加
            </button>
          </div>
        ) : (
          <TaskList
            tasks={sortedTasks}
            onToggleTask={
              handleToggleTask
            }
            onSelectTask={
              handleSelectTask
            }
          />
        )}
      </main>

  <TaskDetailSheet
  task={selectedTask}
  onClose={handleCloseTaskDetail}
  onDelete={handleDeleteTask}
  from="/task"
/>

      <BottomNav />
    </div>
  );
}

export default TaskPage;