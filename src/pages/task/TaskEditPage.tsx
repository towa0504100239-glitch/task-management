import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  Priority,
  Task,
} from "../../types/Task";

import "./TaskEditPage.css";

type EditLocationState = {
  task?: Task;
};

function TaskEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const state =
    location.state as EditLocationState | null;

  const task = state?.task;

  const [name, setName] = useState(
    task?.name ?? ""
  );

  const [detail, setDetail] =
    useState(
      task?.detail ?? ""
    );

  const [date, setDate] =
    useState(
      task?.date ?? ""
    );

  const [deadline, setDeadline] =
    useState(
      task?.deadline ?? ""
    );

  const [priority, setPriority] =
    useState<Priority>(
      task?.priority ?? "中"
    );

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    const updatedTask: Task = {
      id: Number(id),
      name,
      detail,
      date,
      deadline:
        deadline || undefined,
      priority,
      completed:
        task?.completed ?? false,
    };

    console.log(
      "更新するタスク:",
      updatedTask
    );

    navigate(-1);
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
          <label htmlFor="name">
            タイトル
          </label>

          <input
            id="name"
            type="text"
            placeholder="タイトルを入力"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
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
              setDetail(
                e.target.value
              )
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
              setDate(
                e.target.value
              )
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
              setDeadline(
                e.target.value
              )
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