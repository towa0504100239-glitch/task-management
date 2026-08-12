import "../../index.css";
import "./CalendarPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";

import type { Task } from "../../types/Task";

function CalendarPage() {
  const navigate = useNavigate();

  // =========================
  // 仮タスク
  // HomePageと同じTask型を使用
  // =========================

  const tasks: Task[] = [
    {
      id: 1,
      priority: "高",
      name: "Javaの課題を解く",
      deadline: "今日 12:00",
      completed: false,
    },
    {
      id: 2,
      priority: "中",
      name: "ポートフォリオ作成",
      deadline: "今日 14:00",
      completed: false,
    },
    {
      id: 3,
      priority: "低",
      name: "筋トレ（腕・肩）",
      deadline: "今日 18:00",
      completed: false,
    },
  ];

  // =========================
  // 現在の日付
  // =========================

  const today = new Date();

  // 表示している月
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // 選択している日
  const [selectedDate, setSelectedDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // =========================
  // カレンダー情報
  // =========================

  // 今月の日数
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // 今月1日の曜日
  const firstDayOfWeek = new Date(
    year,
    month,
    1
  ).getDay();

  // カレンダーに表示する配列
  const calendarDays: (number | null)[] = [];

  // 月初めの空白
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // 日付を追加
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // =========================
  // 前の月
  // =========================

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  // =========================
  // 次の月
  // =========================

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  // =========================
  // 日付選択
  // =========================

  const handleSelectDay = (day: number) => {
    setSelectedDate(
      new Date(
        year,
        month,
        day
      )
    );
  };

  // =========================
  // 選択中の日付判定
  // =========================

  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  // =========================
  // 曜日
  // =========================

  const weekNames = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
  ];

  const selectedWeek =
    weekNames[selectedDate.getDay()];

  // =========================
  // タスク追加
  // =========================

  const handleAddTask = () => {
    navigate("/task/create");
  };

  return (
    <div className="calendarContainer">

      {/* タイトル */}

      <h1 className="calendarTitle">
        カレンダー
      </h1>

      {/* 月切り替え */}

      <div className="calendarHeader">

        <button
          className="monthBtn"
          onClick={handlePrevMonth}
        >
          ＜
        </button>

        <h2 className="calendarMonth">
          {year}年{month + 1}月
        </h2>

        <button
          className="monthBtn"
          onClick={handleNextMonth}
        >
          ＞
        </button>

      </div>

      {/* 曜日 */}

      <div className="weekRow">
        {weekNames.map((week) => (
          <div
            key={week}
            className="week"
          >
            {week}
          </div>
        ))}
      </div>

      {/* カレンダー */}

      <div className="calendarGrid">

        {calendarDays.map((day, index) => {

          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="emptyDay"
              />
            );
          }

          return (
            <button
              key={day}
              className={
                isSelectedDay(day)
                  ? "calendarDay selectedDay"
                  : "calendarDay"
              }
              onClick={() =>
                handleSelectDay(day)
              }
            >
              {day}
            </button>
          );
        })}

      </div>

      {/* 区切り線 */}

      <div className="calendarLine"></div>

      {/* 選択した日のタスク */}

      <h3 className="calendarTaskTitle">
        {selectedDate.getFullYear()}年
        {selectedDate.getMonth() + 1}月
        {selectedDate.getDate()}日
        （{selectedWeek}）のタスク
      </h3>

      {/* HomePageと同じTaskList */}

      <TaskList tasks={tasks} />

      {/* タスク追加 */}

      <button
        className="add_btn"
        onClick={handleAddTask}
      >
        ＋
      </button>

      {/* BottomNav */}

      <BottomNav />

    </div>
  );
}

export default CalendarPage;