import "../../index.css";
import "./HomePage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";

import type { Task } from "../../types/Task";

type SelectedDay = "今日" | "明日" | "今週" | "今月";

function HomePage() {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] =
    useState<SelectedDay>("今日");

 const tasks: Task[] = [
  {
    id: 1,
    priority: "高",
    name: "タスク1",
    date: "2026-08-15",
    deadline: "2026-08-15T12:00",
    completed: false,
  },
  {
    id: 2,
    priority: "中",
    name: "タスク2",
    date: "2026-08-16",
    deadline: "2026-08-16T14:00",
    completed: false,
  },
];
  // =========================
  // 日付関係
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

  // 今日・明日などに応じて
  // 上部に表示する日付を作る
  const getDisplayDate = () => {

    // 今日
    if (selectedDay === "今日") {
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const week = weekNames[today.getDay()];

      return `${month}月${day}日（${week}）`;
    }

    // 明日
    if (selectedDay === "明日") {
      const tomorrow = new Date(today);

      tomorrow.setDate(
        tomorrow.getDate() + 1
      );

      const month =
        tomorrow.getMonth() + 1;

      const day =
        tomorrow.getDate();

      const week =
        weekNames[tomorrow.getDay()];

      return `${month}月${day}日（${week}）`;
    }

    // 今週
    if (selectedDay === "今週") {
      const start = new Date(today);
      const end = new Date(today);

      // 月曜日を週の開始日にする
      const currentDay = today.getDay();

      const diffToMonday =
        currentDay === 0
          ? -6
          : 1 - currentDay;

      start.setDate(
        today.getDate() + diffToMonday
      );

      end.setDate(
        start.getDate() + 6
      );

      return (
        `${start.getMonth() + 1}月` +
        `${start.getDate()}日 ～ ` +
        `${end.getMonth() + 1}月` +
        `${end.getDate()}日`
      );
    }

    // 今月
    if (selectedDay === "今月") {
      return `${today.getFullYear()}年${
        today.getMonth() + 1
      }月`;
    }

    return "";
  };

  // =========================
  // タスク作成
  // =========================

  const handleCreateTask = () => {
    navigate("/task/create", {
      state: {
        from: "/home",
      },
    });
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


      {/* XPバー */}
      <div className="xpBar">
        <div className="xpProgress"></div>
      </div>


      {/* 選択中の日付 */}
      <h2 className="day">
        {getDisplayDate()}
      </h2>


      {/* 日付切り替え */}
      <div className="daySelect">

        <div
          className={
            selectedDay === "今日"
              ? "pick"
              : ""
          }
          onClick={() =>
            setSelectedDay("今日")
          }
        >
          <p>今日</p>
        </div>


        <div
          className={
            selectedDay === "明日"
              ? "pick"
              : ""
          }
          onClick={() =>
            setSelectedDay("明日")
          }
        >
          <p>明日</p>
        </div>


        <div
          className={
            selectedDay === "今週"
              ? "pick"
              : ""
          }
          onClick={() =>
            setSelectedDay("今週")
          }
        >
          <p>今週</p>
        </div>


        <div
          className={
            selectedDay === "今月"
              ? "pick"
              : ""
          }
          onClick={() =>
            setSelectedDay("今月")
          }
        >
          <p>今月</p>
        </div>

      </div>


      {/* タスクタイトル */}
      <h3 className="taskTitle">
        {selectedDay}のタスク
        （優先順位順）
      </h3>


      {/* タスク一覧 */}
      <TaskList tasks={tasks} />


      {/* タスク追加 */}
      <button
        className="add_btn"
        onClick={handleCreateTask}
        aria-label="タスクを追加"
      >
        ＋
      </button>


      <BottomNav />

    </div>
  );
}

export default HomePage;