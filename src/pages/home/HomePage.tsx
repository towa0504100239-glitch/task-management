import "../../index.css";
import "./HomePage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import TaskList from "../../components/TaskList";
import TaskDetailSheet from "../../components/TaskDetailSheet";
import { useTasks } from "../../context/TaskContext";

import type { Task } from "../../types/Task";

type SelectedDay =
  | "今日"
  | "明日"
  | "今週"
  | "今月";

function HomePage() {
  const navigate = useNavigate();

  const { tasks, toggleTask } = useTasks();

  const [selectedDay, setSelectedDay] =
    useState<SelectedDay>("今日");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(
      `${task.date}T00:00:00`
    );

    if (selectedDay === "今日") {
      return task.date === formatDate(today);
    }

    if (selectedDay === "明日") {
      const tomorrow = new Date(today);

      tomorrow.setDate(
        tomorrow.getDate() + 1
      );

      return (
        task.date === formatDate(tomorrow)
      );
    }

    if (selectedDay === "今週") {
      const start = new Date(today);

      const currentDay = today.getDay();

      const diffToMonday =
        currentDay === 0
          ? -6
          : 1 - currentDay;

      start.setDate(
        today.getDate() + diffToMonday
      );

      start.setHours(0, 0, 0, 0);

      const end = new Date(start);

      end.setDate(
        start.getDate() + 6
      );

      end.setHours(23, 59, 59, 999);

      return (
        taskDate >= start &&
        taskDate <= end
      );
    }

    if (selectedDay === "今月") {
      return (
        taskDate.getFullYear() ===
          today.getFullYear() &&
        taskDate.getMonth() ===
          today.getMonth()
      );
    }

    return false;
  });

  const priorityOrder = {
    高: 1,
    中: 2,
    低: 3,
  };

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => {
      if (a.completed !== b.completed) {
        return (
          Number(a.completed) -
          Number(b.completed)
        );
      }

      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      );
    }
  );

  const handleSelectTask = (
    task: Task
  ) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const getDisplayDate = () => {
    if (selectedDay === "今日") {
      const month =
        today.getMonth() + 1;

      const day =
        today.getDate();

      const week =
        weekNames[today.getDay()];

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
        weekNames[
          tomorrow.getDay()
        ];

      return `${month}月${day}日（${week}）`;
    }

    if (selectedDay === "今週") {
      const start = new Date(today);

      const currentDay =
        today.getDay();

      const diffToMonday =
        currentDay === 0
          ? -6
          : 1 - currentDay;

      start.setDate(
        today.getDate() +
          diffToMonday
      );

      const end = new Date(start);

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
      return `${
        today.getFullYear()
      }年${today.getMonth() + 1}月`;
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

  const handleRetrospective = () => {
    navigate("/retrospective", {
      state: {
        date: formatDate(today),
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
        <div className="xpProgress" />
      </div>

      <h2 className="day">
        {getDisplayDate()}
      </h2>

      <div className="daySelect">
        {(
          [
            "今日",
            "明日",
            "今週",
            "今月",
          ] as SelectedDay[]
        ).map((day) => (
          <div
            key={day}
            className={
              selectedDay === day
                ? "pick"
                : ""
            }
            onClick={() =>
              setSelectedDay(day)
            }
          >
            <p>{day}</p>
          </div>
        ))}
      </div>

      <h3 className="taskTitle">
        {selectedDay}のタスク
        （優先順位順）
      </h3>

      {sortedTasks.length > 0 ? (
        <TaskList
          tasks={sortedTasks}
          onToggleTask={toggleTask}
          onSelectTask={handleSelectTask}
        />
      ) : (
        <p className="noTaskMessage">
          タスクはありません
        </p>
      )}

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
        type="button"
        className="add_btn"
        onClick={handleCreateTask}
        aria-label="タスクを追加"
      >
        ＋
      </button>

      <TaskDetailSheet
        task={selectedTask}
        onClose={handleCloseTaskDetail}
      />

      <BottomNav />
    </div>
  );
}

export default HomePage;