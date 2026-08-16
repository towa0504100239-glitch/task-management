import type { Task } from "../types/Task";
import "./TaskCard.css";

type Props = {
  task: Task;
  onToggleTask: (id: number) => void;
  onSelectTask: (task: Task) => void;
};

export default function TaskCard({
  task,
  onToggleTask,
  onSelectTask,
}: Props) {
  return (
    <div
      className={`task ${
        task.completed ? "completed" : ""
      }`}
      onClick={() => onSelectTask(task)}
    >
      <div className="taskInfo">
        <div
          className={`taskIcon ${
            task.priority === "高"
              ? "v1"
              : task.priority === "中"
              ? "v2"
              : "v3"
          }`}
        >
          <p>{task.priority}</p>
        </div>

        <div className="taskWrap">
          <h4 className="taskName">
            {task.name}
          </h4>

          {task.deadline && (
            <p className="taskTime">
              期限: {task.deadline}
            </p>
          )}
        </div>

        <div className="taskStatus">
          <input
            type="checkbox"
            checked={task.completed}
            onClick={(e) =>
              e.stopPropagation()
            }
            onChange={() =>
              onToggleTask(task.id)
            }
          />
        </div>
      </div>
    </div>
  );
}