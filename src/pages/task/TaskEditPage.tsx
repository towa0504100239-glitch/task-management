import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import "./TaskEditPage.css";

type Priority = "高" | "中" | "低";

type Task = {
  id: number;
  title: string;
  detail: string;
  date: string;
  deadline: string;
  priority: Priority;
};

function TaskEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState(
    "応用情報の勉強"
  );

  const [detail, setDetail] = useState(
    "テクノロジ系の問題を50問解く"
  );

  const [date, setDate] = useState(
    "2026-08-15"
  );

  const [deadline, setDeadline] = useState(
    "2026-08-15T23:59"
  );

  const [priority, setPriority] =
    useState<Priority>("高");

  const handleBack = () => {
    navigate(`/task/${id}`);
  };

  const handleSave = () => {
    const updatedTask: Task = {
      id: Number(id),
      title,
      detail,
      date,
      deadline,
      priority,
    };

    console.log(
      "更新するタスク:",
      updatedTask
    );

    navigate(`/task/${id}`);
  };

  return (
    <div className="taskEditPage">
      <header className="taskEditHeader">
        <button
          type="button"
          className="taskEditBackButton"
          onClick={handleBack}
        >
          ＜
        </button>

        <h1>タスク編集</h1>

        <button
          type="button"
          className="taskEditSaveButton"
          onClick={handleSave}
        >
          保存
        </button>
      </header>

      <main className="taskEditContent">
        <div className="taskEditFormGroup">
          <label htmlFor="title">
            タイトル
          </label>

          <input
            id="title"
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="taskEditFormGroup">
          <label htmlFor="detail">
            詳細
          </label>

          <textarea
            id="detail"
            placeholder="詳細を入力"
            value={detail}
            onChange={(e) =>
              setDetail(e.target.value)
            }
          />
        </div>

        <div className="taskEditFormGroup">
          <label htmlFor="date">
            日付
          </label>

          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <div className="taskEditFormGroup">
          <label htmlFor="deadline">
            期限（任意）
          </label>

          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
          />
        </div>

        <div className="taskEditFormGroup">
          <p className="taskEditPriorityLabel">
            優先度
          </p>

          <div className="taskEditPriorityButtons">
            <button
              type="button"
              className={`taskEditPriorityButton high ${
                priority === "高"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPriority("高")
              }
            >
              高
            </button>

            <button
              type="button"
              className={`taskEditPriorityButton middle ${
                priority === "中"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPriority("中")
              }
            >
              中
            </button>

            <button
              type="button"
              className={`taskEditPriorityButton low ${
                priority === "低"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPriority("低")
              }
            >
              低
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskEditPage;