import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TaskDetailPage.css";

type Priority = "高" | "中" | "低";

type Task = {
  id: number;
  title: string;
  detail: string;
  date: string;
  deadline?: string;
  priority: Priority;
  completed: boolean;
};

function TaskDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState<Task>({
    id: Number(id),
    title: "応用情報の勉強",
    detail: "テクノロジ系の問題を50問解く",
    date: "2026/08/15",
    deadline: "2026/08/15 23:59",
    priority: "高",
    completed: false,
  });

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case "高":
        return "high";
      case "中":
        return "middle";
      case "低":
        return "low";
    }
  };

  const handleComplete = () => {
    setTask((prevTask) => ({
      ...prevTask,
      completed: !prevTask.completed,
    }));

    console.log("完了状態を変更");
  };

  const handleDelete = () => {
    const result = window.confirm(
      "このタスクを削除しますか？"
    );

    if (!result) {
      return;
    }

    console.log("タスク削除:", task.id);

    navigate("/task");
  };

  return (
    <div
      className={`taskDetailPage ${
        task.completed ? "isCompleted" : ""
      }`}
    >
      <header className="taskDetailHeader">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate("/task")}
        >
          ‹
        </button>

        <h1>タスク詳細</h1>

        <button
          type="button"
          className="editButton"
          onClick={() =>
            navigate(`/task/${task.id}/edit`)
          }
        >
          編集
        </button>
      </header>

      <main className="taskDetailContent">
        <div className="taskDetailTitleArea">
          <h2>{task.title}</h2>

          <span
            className={`taskDetailPriority ${getPriorityClass(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <div className="taskDetailInfo">
          <div className="taskDetailRow">
            <span className="taskDetailLabel">
              詳細
            </span>

            <p className="taskDetailValue taskDescription">
              {task.detail || "詳細なし"}
            </p>
          </div>

          <div className="taskDetailRow">
            <span className="taskDetailLabel">
              日付
            </span>

            <p className="taskDetailValue">
              {task.date}
            </p>
          </div>

          <div className="taskDetailRow">
            <span className="taskDetailLabel">
              期限
            </span>

            <p className="taskDetailValue">
              {task.deadline || "設定なし"}
            </p>
          </div>

          <div className="taskDetailRow">
            <span className="taskDetailLabel">
              優先度
            </span>

            <p className="taskDetailValue">
              {task.priority}
            </p>
          </div>

          <div className="taskDetailRow">
            <span className="taskDetailLabel">
              状態
            </span>

            <p className="taskDetailValue">
              {task.completed ? "完了" : "未完了"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`completeButton ${
            task.completed ? "completed" : ""
          }`}
          onClick={handleComplete}
        >
          {task.completed
            ? "未完了に戻す"
            : "タスクを完了"}
        </button>

        <button
          type="button"
          className="deleteButton"
          onClick={handleDelete}
        >
          タスクを削除
        </button>
      </main>
    </div>
  );
}

export default TaskDetailPage;