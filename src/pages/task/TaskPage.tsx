import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "./TaskPage.css";

type Priority = "高" | "中" | "低";

type Task = {
  id: number;
  title: string;
  date: string;
  deadline?: string;
  priority: Priority;
  completed: boolean;
};

function TaskPage() {
  const navigate = useNavigate();

  const tasks: Task[] = [
    {
      id: 1,
      title: "応用情報の勉強",
      date: "2026/08/15",
      deadline: "23:59",
      priority: "高",
      completed: false,
    },
    {
      id: 2,
      title: "Task Questの開発",
      date: "2026/08/16",
      deadline: "18:00",
      priority: "中",
      completed: false,
    },
    {
      id: 3,
      title: "資料を確認する",
      date: "2026/08/17",
      priority: "低",
      completed: true,
    },
  ];

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case "高":
        return "high";
      case "中":
        return "middle";
      case "低":
        return "low";
    }
  };

  return (
    <div className="taskPage">
      <header className="taskHeader">
        <h1>タスク</h1>
      </header>

      <main className="taskContent">
        <div className="taskTitleArea">
          <div>
            <h2>タスク一覧</h2>
            <p>{tasks.length}件のタスク</p>
          </div>

          <button
            type="button"
            className="addTaskButton"
            onClick={() =>
              navigate("/task/create", {
                state: {
                  from: "/task",
                },
              })
            }
          >
            ＋
          </button>
        </div>

        <div className="taskList">
          {tasks.length === 0 ? (
            <div className="emptyTask">
              <p>タスクがありません</p>

              <button
                type="button"
                onClick={() =>
                  navigate("/task/create", {
                    state: {
                      from: "/task",
                    },
                  })
                }
              >
                タスクを追加
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <button
                type="button"
                key={task.id}
                className={`taskItem ${
                  task.completed ? "completed" : ""
                }`}
                onClick={() =>
                  navigate(`/task/${task.id}`)
                }
              >
                <div className="taskItemTop">
                  <span
                    className={`priorityBadge ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <span className="taskName">
                    {task.title}
                  </span>
                </div>

                <div className="taskItemBottom">
                  <span>{task.date}</span>

                  {task.deadline && (
                    <span>
                      期限 {task.deadline}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default TaskPage;