import "../../index.css";
import "./CalendarPage.css";

import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";

import type { Task } from "../../types/Task";

type CalendarLocationState = {
  selectedDate?: string;
};

function CalendarPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // 仮タスクデータ
  // 後でAPIから取得
  // =========================

  const tasks: Task[] = [
    {
      id: 1,
      priority: "高",
      name: "Javaの課題を解く",
      date: "2026-08-15",
      deadline: "2026-08-15T12:00",
      completed: false,
    },
    {
      id: 2,
      priority: "中",
      name: "ポートフォリオ作成",
      date: "2026-08-15",
      deadline: "2026-08-15T14:00",
      completed: false,
    },
    {
      id: 3,
      priority: "低",
      name: "筋トレ（腕・肩）",
      date: "2026-08-16",
      deadline: "2026-08-16T18:00",
      completed: false,
    },
    {
      id: 4,
      priority: "高",
      name: "Task Quest開発",
      date: "2026-08-20",
      deadline: "2026-08-20T20:00",
      completed: false,
    },
  ];

  // =========================
  // 戻ってきた日付を取得
  // =========================

  const state =
    location.state as CalendarLocationState | null;

  const today = new Date();

  const initialDate = state?.selectedDate
    ? new Date(`${state.selectedDate}T00:00:00`)
    : today;

  // =========================
  // 表示している月
  // =========================

  const [currentDate, setCurrentDate] =
    useState(
      new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        1
      )
    );

  // =========================
  // 選択している日
  // =========================

  const [selectedDate, setSelectedDate] =
    useState(initialDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // =========================
  // カレンダー生成
  // =========================

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    year,
    month,
    1
  ).getDay();

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // =========================
  // 前月
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
  // 次月
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
  // YYYY-MM-DD に変換
  // =========================

  const formatDate = (date: Date) => {
    const y = date.getFullYear();

    const m = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const d = String(
      date.getDate()
    ).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const selectedDateString =
    formatDate(selectedDate);

  // =========================
  // 選択日のタスクだけ取得
  // =========================

  const selectedTasks = tasks.filter(
    (task) =>
      task.date === selectedDateString
  );

  // =========================
  // タスク作成
  // =========================

  const handleCreateTask = () => {
    navigate("/task/create", {
      state: {
        from: "/calendar",

        // 作成するタスクの日付
        date: selectedDateString,

        // カレンダーに戻るときの日付
        returnDate: selectedDateString,
      },
    });
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
          type="button"
          className="monthBtn"
          onClick={handlePrevMonth}
        >
          ＜
        </button>

        <h2 className="calendarMonth">
          {year}年{month + 1}月
        </h2>

        <button
          type="button"
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
              type="button"
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

      <div className="calendarLine" />

      {/* 選択中の日付 */}
      <h3 className="calendarTaskTitle">
        {selectedDate.getFullYear()}年
        {selectedDate.getMonth() + 1}月
        {selectedDate.getDate()}日
        （{selectedWeek}）のタスク
      </h3>

      {/* タスク一覧 */}
      {selectedTasks.length > 0 ? (
        <TaskList tasks={selectedTasks} />
      ) : (
        <p className="noTaskMessage">
          この日のタスクはありません
        </p>
      )}

      {/* タスク追加 */}
      <button
        type="button"
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

export default CalendarPage;