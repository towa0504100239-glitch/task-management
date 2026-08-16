import "../../index.css";
import "./CalendarPage.css";

import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";
import TaskDetailSheet from "../../components/TaskDetailSheet";

import type { Task } from "../../types/Task";

type CalendarLocationState = {
  selectedDate?: string;
};

function CalendarPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] =
    useState<Task[]>([
      {
        id: 1,
        priority: "高",
        name: "Javaの課題を解く",
        detail:
          "Javaの課題を進める",
        date: "2026-08-15",
        deadline:
          "2026-08-15T12:00",
        completed: false,
      },
      {
        id: 2,
        priority: "中",
        name: "ポートフォリオ作成",
        detail:
          "ポートフォリオを作成する",
        date: "2026-08-15",
        deadline:
          "2026-08-15T14:00",
        completed: false,
      },
      {
        id: 3,
        priority: "低",
        name: "筋トレ（腕・肩）",
        date: "2026-08-16",
        deadline:
          "2026-08-16T18:00",
        completed: false,
      },
      {
        id: 4,
        priority: "高",
        name: "Task Quest開発",
        detail:
          "Task Questの開発を進める",
        date: "2026-08-20",
        deadline:
          "2026-08-20T20:00",
        completed: false,
      },
    ]);

  const state =
    location.state as CalendarLocationState | null;

  const today = new Date();

  const initialDate =
    state?.selectedDate
      ? new Date(
          `${state.selectedDate}T00:00:00`
        )
      : today;

  const [currentDate, setCurrentDate] =
    useState(
      new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        1
      )
    );

  const [selectedDate, setSelectedDate] =
    useState(initialDate);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

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

  const calendarDays:
    (number | null)[] = [];

  for (
    let i = 0;
    i < firstDayOfWeek;
    i++
  ) {
    calendarDays.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push(day);
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  const handleSelectDay = (
    day: number
  ) => {
    setSelectedDate(
      new Date(
        year,
        month,
        day
      )
    );
  };

  const isSelectedDay = (
    day: number
  ) => {
    return (
      selectedDate.getFullYear() ===
        year &&
      selectedDate.getMonth() ===
        month &&
      selectedDate.getDate() === day
    );
  };

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

  const formatDate = (
    date: Date
  ) => {
    const y =
      date.getFullYear();

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

  const selectedTasks =
    tasks.filter(
      (task) =>
        task.date ===
        selectedDateString
    );

  const handleToggleTask = (
    id: number
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
  };

  const sortedSelectedTasks = [
    ...selectedTasks,
  ].sort(
    (a, b) =>
      Number(a.completed) -
      Number(b.completed)
  );

  const handleSelectTask = (
    task: Task
  ) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleCreateTask = () => {
    navigate("/task/create", {
      state: {
        from: "/calendar",
        date: selectedDateString,
        returnDate:
          selectedDateString,
      },
    });
  };

  return (
    <div className="calendarContainer">
      <h1 className="calendarTitle">
        カレンダー
      </h1>

      <div className="calendarHeader">
        <button
          type="button"
          className="monthBtn"
          onClick={
            handlePrevMonth
          }
        >
          ＜
        </button>

        <h2 className="calendarMonth">
          {year}年{month + 1}月
        </h2>

        <button
          type="button"
          className="monthBtn"
          onClick={
            handleNextMonth
          }
        >
          ＞
        </button>
      </div>

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

      <div className="calendarGrid">
        {calendarDays.map(
          (day, index) => {
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
                  handleSelectDay(
                    day
                  )
                }
              >
                {day}
              </button>
            );
          }
        )}
      </div>

      <div className="calendarLine" />

      <h3 className="calendarTaskTitle">
        {selectedDate.getFullYear()}
        年
        {selectedDate.getMonth() + 1}
        月
        {selectedDate.getDate()}日
        （{selectedWeek}）のタスク
      </h3>

      {selectedTasks.length > 0 ? (
        <TaskList
          tasks={
            sortedSelectedTasks
          }
          onToggleTask={
            handleToggleTask
          }
          onSelectTask={
            handleSelectTask
          }
        />
      ) : (
        <p className="noTaskMessage">
          この日のタスクはありません
        </p>
      )}

      <button
        type="button"
        className="add_btn"
        onClick={handleCreateTask}
        aria-label="タスクを追加"
      >
        ＋
      </button>

      <TaskDetailSheet
        task={selectedTask}
        onClose={
          handleCloseTaskDetail
        }
      />

      <BottomNav />
    </div>
  );
}

export default CalendarPage;