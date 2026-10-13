
import "../../index.css";
import "./StatisticsPage.css";

import { useMemo, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { useTasks } from "../../context/TaskContext";
import type { Task } from "../../types/Task";

type Period = "日別" | "月別" | "年別";

type ChartData = {
  label: string;
  value: number;
};

type StatisticsData = {
  completionRate: number;
  achievementDays: number;
  streakDays: number;
  completedTasks: number;
  averageTasks: number;
};

const weekNames = ["日", "月", "火", "水", "木", "金", "土"];

// YYYY-MM-DD形式の日付を作る
const dateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 対象期間の開始日と終了日
const getPeriodRange = (period: Period, date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (period === "日別") {
    return {
      start: new Date(year, month, date.getDate()),
      end: new Date(year, month, date.getDate()),
    };
  }

  if (period === "月別") {
    return {
      start: new Date(year, month, 1),
      end: new Date(year, month + 1, 0),
    };
  }

  return {
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  };
};

// 完了日時から日付部分を取得
const getCompletedDate = (task: Task): string | null => {
  if (!task.completed || !task.completedAt) {
    return null;
  }

  return task.completedAt.slice(0, 10);
};

// 完了日時から時刻を取得
const getCompletedHour = (task: Task): number => {
  if (!task.completedAt) return -1;

  const hour = Number(task.completedAt.slice(11, 13));
  return Number.isInteger(hour) ? hour : -1;
};

// 対象期間内に完了したタスク
const getCompletedTasks = (
  tasks: Task[],
  start: Date,
  end: Date
): Task[] => {
  const startKey = dateKey(start);
  const endKey = dateKey(end);

  return tasks.filter((task) => {
    const completedDate = getCompletedDate(task);

    return (
      completedDate !== null &&
      completedDate >= startKey &&
      completedDate <= endKey
    );
  });
};

// 連続達成日数
const calculateStreak = (
  completedDates: Set<string>,
  end: Date
): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cursor = new Date(end);
  cursor.setHours(0, 0, 0, 0);

  // 未来の日付では計算しない
  if (cursor > today) {
    cursor.setTime(today.getTime());
  }

  let streak = 0;

  while (completedDates.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

// 統計情報を計算
const createStatistics = (
  tasks: Task[],
  period: Period,
  date: Date
): StatisticsData => {
  const { start, end } = getPeriodRange(period, date);

  const completedTasks = getCompletedTasks(tasks, start, end);

  const completedDates = new Set(
    completedTasks
      .map(getCompletedDate)
      .filter((value): value is string => value !== null)
  );

  // 予定日が対象期間に入るタスク
  const scheduledTasks = tasks.filter(
    (task) =>
      Boolean(task.date) &&
      task.date >= dateKey(start) &&
      task.date <= dateKey(end)
  );

  // 完了率は予定日基準
  const completedScheduledTasks = scheduledTasks.filter(
    (task) => task.completed
  );

  const completionRate =
    scheduledTasks.length === 0
      ? 0
      : Math.round(
          (completedScheduledTasks.length /
            scheduledTasks.length) *
            100
        );

  const days =
    Math.round(
      (Date.UTC(
        end.getFullYear(),
        end.getMonth(),
        end.getDate()
      ) -
        Date.UTC(
          start.getFullYear(),
          start.getMonth(),
          start.getDate()
        )) /
        86400000
    ) + 1;

  const averageTasks = Number(
    (completedTasks.length / days).toFixed(1)
  );

  return {
    completionRate,
    achievementDays: completedDates.size,
    streakDays: calculateStreak(completedDates, end),
    completedTasks: completedTasks.length,
    averageTasks,
  };
};

// グラフデータを作成
const createChartData = (
  tasks: Task[],
  period: Period,
  date: Date
): ChartData[] => {
  const { start, end } = getPeriodRange(period, date);
  const completedTasks = getCompletedTasks(tasks, start, end);

  if (period === "日別") {
    // 4時間ごとに集計
    return Array.from({ length: 6 }, (_, index) => {
      const startHour = index * 4;
      const endHour = startHour + 4;

      return {
        label: `${startHour}時`,
        value: completedTasks.filter((task) => {
          const hour = getCompletedHour(task);
          return hour >= startHour && hour < endHour;
        }).length,
      };
    });
  }

  if (period === "月別") {
    const daysInMonth = end.getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const targetDate = dateKey(
        new Date(date.getFullYear(), date.getMonth(), day)
      );

      return {
        label: String(day),
        value: completedTasks.filter(
          (task) => getCompletedDate(task) === targetDate
        ).length,
      };
    });
  }

  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;

    return {
      label: `${month}月`,
      value: completedTasks.filter((task) => {
        const completedDate = getCompletedDate(task);
        return (
          completedDate !== null &&
          Number(completedDate.slice(5, 7)) === month
        );
      }).length,
    };
  });
};

function StatisticsPage() {
  const { tasks } = useTasks();

  const [period, setPeriod] = useState<Period>("月別");
  const [currentDate, setCurrentDate] = useState(new Date());

  const displayDate = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const week = weekNames[currentDate.getDay()];

    if (period === "日別") {
      return `${year}年${month}月${day}日（${week}）`;
    }

    if (period === "月別") {
      return `${year}年${month}月`;
    }

    return `${year}年`;
  }, [period, currentDate]);

  const statistics = useMemo(
    () => createStatistics(tasks, period, currentDate),
    [tasks, period, currentDate]
  );

  const chartData = useMemo(
    () => createChartData(tasks, period, currentDate),
    [tasks, period, currentDate]
  );

  const maxValue = Math.max(
    ...chartData.map((data) => data.value),
    1
  );

  const handlePrevious = () => {
    setCurrentDate((previous) => {
      const date = new Date(previous);

      if (period === "日別") {
        date.setDate(date.getDate() - 1);
      } else if (period === "月別") {
        // 月末から移動すると日付がずれるので1日に固定
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
      } else {
        date.setFullYear(date.getFullYear() - 1);
      }

      return date;
    });
  };

  const handleNext = () => {
    setCurrentDate((previous) => {
      const date = new Date(previous);

      if (period === "日別") {
        date.setDate(date.getDate() + 1);
      } else if (period === "月別") {
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
      } else {
        date.setFullYear(date.getFullYear() + 1);
      }

      return date;
    });
  };

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    setCurrentDate(new Date());
  };

  const getChartTitle = () => {
    if (period === "日別") return "時間別達成数";
    if (period === "月別") return "日別達成数";
    return "月別達成数";
  };

  return (
    <div className="statisticsPage">
      <header className="statisticsHeader">
        <h1>統計</h1>
      </header>

      <main className="statisticsContent">
        <div className="periodTabs">
          {(["日別", "月別", "年別"] as Period[]).map(
            (item) => (
              <button
                type="button"
                key={item}
                className={
                  period === item
                    ? "periodTab active"
                    : "periodTab"
                }
                onClick={() => handlePeriodChange(item)}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="statisticsDate">
          <button
            type="button"
            className="dateArrow"
            onClick={handlePrevious}
            aria-label="前の期間"
          >
            ＜
          </button>

          <h2>{displayDate}</h2>

          <button
            type="button"
            className="dateArrow"
            onClick={handleNext}
            aria-label="次の期間"
          >
            ＞
          </button>
        </div>

        <div className="summaryCards">
          <div className="summaryCard">
            <p className="summaryLabel">完了率</p>
            <p className="summaryValue">
              {statistics.completionRate}
              <span>%</span>
            </p>
          </div>

          <div className="summaryCard">
            <p className="summaryLabel">
              {period === "日別"
                ? "達成状況"
                : "達成した日数"}
            </p>
            <p className="summaryValue">
              {statistics.achievementDays}
              <span>日</span>
            </p>
          </div>
        </div>

        <section className="chartSection">
          <h3>{getChartTitle()}</h3>

          <div className="chartScroll">
            <div
              className={`chart ${
                period === "月別" ? "monthlyChart" : ""
              }`}
            >
              <div className="chartYAxis">
                <span>{maxValue}</span>
                <span>{Math.round(maxValue / 2)}</span>
                <span>0</span>
              </div>

              <div className="chartArea">
                <div className="chartLine lineTop" />
                <div className="chartLine lineMiddle" />
                <div className="chartLine lineBottom" />

                <div className="chartBars">
                  {chartData.map((data, index) => (
                    <div
                      className="chartBarItem"
                      key={`${data.label}-${index}`}
                    >
                      <div className="barWrapper">
                        <span className="barValue">
                          {data.value}
                        </span>

                        <div
                          className="chartBar"
                          style={{
                            height: `${
                              (data.value / maxValue) * 100
                            }%`,
                          }}
                        />
                      </div>

                      <span className="chartLabel">
                        {period === "月別"
                          ? `${data.label}日`
                          : data.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="statisticsList">
          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">🔥</span>
              <span>連続達成日数</span>
            </div>
            <strong>{statistics.streakDays}日</strong>
          </div>

          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">✓</span>
              <span>完了タスク数</span>
            </div>
            <strong>{statistics.completedTasks}件</strong>
          </div>

          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">◉</span>
              <span>平均タスク数</span>
            </div>
            <strong>{statistics.averageTasks}件</strong>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default StatisticsPage;
