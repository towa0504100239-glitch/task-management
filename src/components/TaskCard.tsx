import type { Task } from "../types/Task";
type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="task">
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
          <h4 className="taskName">{task.name}</h4>
          <p className="taskTime">期限: {task.deadline}</p>
        </div>

        <div className="taskStatus">
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}