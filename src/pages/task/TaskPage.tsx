import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";
import TaskDetailSheet from "../../components/TaskDetailSheet";

import type { Task } from "../../types/Task";

import "./TaskPage.css";

function TaskPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState<Task[]>([
      {
        id: 1,
        name: "応用情報の勉強",
        detail:
          "テクノロジ系の問題を50問解く",
        date: "2026-08-15",
        deadline:
          "2026-08-15T23:59",
        priority: "高",
        completed: false,
      },
      {
        id: 2,
        name: "Task Questの開発",
        detail:
          "タスク詳細機能を実装する",
        date: "2026-08-16",
        deadline:
          "2026-08-16T18:00",
        priority: "中",
        completed: false,
      },
      {
        id: 3,
        name: "資料を確認する",
        detail:
          "必要な資料を確認する",
        date: "2026-08-17",
        priority: "低",
        completed: true,
      },
    ]);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const handleToggleTask = (
    id: number
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
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
            onClick={
              handleCreateTask
            }
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
              onClick={
                handleCreateTask
              }
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
        onClose={
          handleCloseTaskDetail
        }
      />

      <BottomNav />
    </div>
  );
}

export default TaskPage;