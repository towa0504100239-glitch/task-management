import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import "./TaskDetailSheet.css";

type Props = {
  task: Task | null;
  onClose: () => void;
};

export default function TaskDetailSheet({
  task,
  onClose,
}: Props) {
  const navigate = useNavigate();

  if (!task) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/task/${task.id}/edit`, {
      state: {
        task,
      },
    });
  };

  return (
    <div
      className="taskSheetOverlay"
      onClick={onClose}
    >
      <div
        className="taskSheet"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="taskSheetHandle" />

        <div className="taskSheetHeader">
          <h2>{task.name}</h2>

          <button
            type="button"
            className="taskSheetClose"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="taskSheetContent">
          {task.detail && (
            <div className="taskSheetRow">
              <span>詳細</span>
              <strong>{task.detail}</strong>
            </div>
          )}

          <div className="taskSheetRow">
            <span>優先度</span>
            <strong>{task.priority}</strong>
          </div>

          <div className="taskSheetRow">
            <span>日付</span>
            <strong>{task.date}</strong>
          </div>

          <div className="taskSheetRow">
            <span>期限</span>
            <strong>
              {task.deadline ?? "なし"}
            </strong>
          </div>

          <div className="taskSheetRow">
            <span>状態</span>
            <strong>
              {task.completed
                ? "完了"
                : "未完了"}
            </strong>
          </div>
        </div>

        <button
          type="button"
          className="taskSheetEdit"
          onClick={handleEdit}
        >
          編集する
        </button>
      </div>
    </div>
  );
}