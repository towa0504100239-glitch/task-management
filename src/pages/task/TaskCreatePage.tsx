import TaskForm from "../../components/TaskForm";

export default function TaskCreatePage() {
  return (
    <div>
      <h1>タスク作成</h1>
      <TaskForm
        onSubmit={(task) => {
            console.log(task);
        }}
        />
    </div>
  );
}