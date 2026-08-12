import "../../index.css";
import "./HomePage.css";

import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";

import type { Task } from "../../types/Task";

function HomePage() {
  const navigate = useNavigate();

  // =========================
  // 仮タスク
  // 後でAPIから取得する
  // =========================

  const tasks: Task[] = [
    {
      id: 1,
      priority: "高",
      name: "タスク1",
      deadline: "今日 12:00",
      completed: false,
    },
    {
      id: 2,
      priority: "中",
      name: "タスク2",
      deadline: "今日 14:00",
      completed: false,
    },
  ];

  // =========================
  // 今日の日付
  // =========================

  const today = new Date();

  const weekNames = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
  ];

  const month = today.getMonth() + 1;
  const day = today.getDate();
  const week = weekNames[today.getDay()];

  // =========================
  // タスク追加
  // =========================

  const handleAddTask = () => {
    navigate("/task/create");
  };

  return (
    <div className="container">

      {/* レベル */}

      <div className="levelWrapper">
        <h1 className="level">
          Lv.12
        </h1>

        <p className="Experience">
          650/10000 XP
        </p>
      </div>

      {/* 経験値バー */}

      <div className="xpBar">
        <div className="xpProgress"></div>
      </div>

      {/* 今日の日付 */}

      <h2 className="day">
        {month}月{day}日（{week}）
      </h2>

      {/* 表示期間 */}

      <div className="daySelect">

        <div className="pick">
          <p>今日</p>
        </div>

        <div>
          <p>明日</p>
        </div>

        <div>
          <p>今週</p>
        </div>

        <div>
          <p>今月</p>
        </div>

      </div>

      {/* タスク */}

      <h3 className="taskTitle">
        今日のタスク（優先順位順）
      </h3>

      <TaskList tasks={tasks} />

      {/* タスク追加ボタン */}

      <button
        className="add_btn"
        onClick={handleAddTask}
        aria-label="タスクを追加"
      >
        ＋
      </button>

      {/* 下部ナビ */}

      <BottomNav />

    </div>
  );
}

export default HomePage;