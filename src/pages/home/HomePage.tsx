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
  const handleRetrospective = () => {
    navigate("/retrospective", {
      state: {
        date: new Date().toISOString().split("T")[0],
        from: "/home",
      },
    });
  };
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
  const getDisplayDate = () => {
    if (selectedDay === "今日") {
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const week = weekNames[today.getDay()];
      return `${month}月${day}日（${week}）`;
    }
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

    if (selectedDay === "今週") {
      const start = new Date(today);
      const end = new Date(today);
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
    if (selectedDay === "今月") {
      return `${today.getFullYear()}年${
        today.getMonth() + 1
      }月`;
    }

    return "";
  };
  const handleCreateTask = () => {
    navigate("/task/create", {
      state: {
        from: "/home",
      },
    });
  };
  return (
    <div className="container">
      <div className="levelWrapper">
        <h1 className="level">
          Lv.12
        </h1>
        <p className="Experience">
          650/10000 XP
        </p>
      </div>
      <div className="xpBar">
        <div className="xpProgress"></div>
      </div>
      <h2 className="day">
        {getDisplayDate()}
      </h2>
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
      <h3 className="taskTitle">
        {selectedDay}のタスク
        （優先順位順）
      </h3>
      <TaskList tasks={tasks} />
      <section className="reflectionSection">
        <div className="reflectionHeader">
          <div>
            <h3 className="reflectionTitle">
              今日の振り返り
            </h3>
            <p className="reflectionDescription">
              今日できたことを振り返ってみよう
            </p>
          </div>
        </div>
        <button
          type="button"
          className="reflectionButton"
          onClick={handleRetrospective}
        >
          <div className="reflectionButtonText">
            <span className="reflectionButtonIcon">
              ✎
            </span>
            <div>
              <span className="reflectionButtonTitle">
                今日を振り返る
              </span>
              <span className="reflectionButtonSub">
                良かったこと・改善点を記録
              </span>
            </div>
          </div>
          <span className="reflectionArrow">
            ＞
          </span>
        </button>
      </section>
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