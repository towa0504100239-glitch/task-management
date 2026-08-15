import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./TaskCreatePage.css";

type Priority = "高" | "中" | "低";

type LocationState = {
  from?: string;
  date?: string;
  returnDate?: string;
};

function TaskCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as LocationState | null;

  const returnPath =
    state?.from ?? "/task";

  const [title, setTitle] =
    useState("");

  const [detail, setDetail] =
    useState("");

  const [date, setDate] =
    useState(state?.date ?? "");

  const [deadline, setDeadline] =
    useState("");

  const [priority, setPriority] =
    useState<Priority>("高");

  const goBack = () => {
    if (returnPath === "/calendar") {
      navigate("/calendar", {
        state: {
          selectedDate:
            state?.returnDate ??
            state?.date,
        },
      });

      return;
    }

    navigate(returnPath);
  };

  const handleSave = () => {
    const task = {
      title,
      detail,
      date,
      deadline,
      priority,
    };

    console.log(
      "作成したタスク:",
      task
    );

    goBack();
  };

  const handleClose = () => {
    goBack();
  };

  return (
    <div className="taskCreatePage">
      <header className="taskCreateHeader">
        <button
          type="button"
          className="closeButton"
          onClick={handleClose}
        >
          ×
        </button>
        <h1>
          タスク作成
        </h1>
        <button
          type="button"
          className="saveButton"
          onClick={handleSave}
        >
          保存
        </button>
      </header>
      <main className="taskCreateContent">
        <div className="formGroup">
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
        <div className="formGroup">
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
        <div className="formGroup">
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
        <div className="formGroup">
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
        <div className="formGroup">
          <p className="priorityLabel">
            優先度
          </p>
          <div className="priorityButtons">
            <button
              type="button"
              className={`priorityButton high ${
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
              className={`priorityButton middle ${
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
              className={`priorityButton low ${
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

export default TaskCreatePage;