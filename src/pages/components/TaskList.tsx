import TaskCard from "./TaskCard";
import type { Task } from "../../types/Task";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <div className="taskList">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}