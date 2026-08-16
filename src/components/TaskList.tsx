import TaskCard from "./TaskCard";
import type { Task } from "../types/Task";

type Props = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onSelectTask: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onToggleTask,
  onSelectTask,
}: Props) {
  return (
    <div className="taskList">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </div>
  );
}