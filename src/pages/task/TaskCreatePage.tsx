import TaskForm from "../../components/TaskForm";
import "./TaskCreatePage.css";

function TaskCreatePage() {

  const handleCreate = () => {
    console.log("タスクを作成");
  };

  return (
    <div className="taskCreatePage">

      <div className="taskCreateHeader">
        <button>×</button>

        <h1>タスク作成</h1>

        <button>
          保存
        </button>
      </div>

      <TaskForm onSubmit={handleCreate} />

    </div>
  );
}

export default TaskCreatePage;