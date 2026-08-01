import { useState } from "react";
import type { Task } from "../types/Task";

type Props = {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, "id">) => void;
};

export default function TaskForm({ initialTask, onSubmit }: Props) {
  const [name, setName] = useState(initialTask?.name ?? "");
  const [deadline, setDeadline] = useState(initialTask?.deadline ?? "");
  const [priority, setPriority] = useState<"高" | "中" | "低">(
    initialTask?.priority ?? "中"
  );
  const [completed] = useState(initialTask?.completed ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      deadline,
      priority,
      completed,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>タスク名</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>期限</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div>
        <label>優先度</label>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "高" | "中" | "低")
          }
        >
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </div>

      <button type="submit">保存</button>
    </form>
  );
}