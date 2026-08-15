import "../../index.css";
import "./StatisticsPage.css";
import { useMemo, useState } from "react";
import BottomNav from "../../components/BottomNav";

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

const weekNames = [
  "日",
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
];

const createStatistics = (
  period: Period,
  date: Date
): StatisticsData => {
  const seed =
    date.getFullYear() +
    date.getMonth() +
    date.getDate();

  if (period === "日別") {
    return {
      completionRate: 75,
      achievementDays: 1,
      streakDays: 7,
      completedTasks: 6,
      averageTasks: 8,
    };
  }

  if (period === "月別") {
    return {
      completionRate: 68,
      achievementDays: 20,
      streakDays: 7,
      completedTasks: 32,
      averageTasks: 5.2,
    };
  }

  return {
    completionRate: 72,
    achievementDays: 248,
    streakDays: 18,
    completedTasks: 386,
    averageTasks: Number(
      (4.5 + (seed % 10) / 10).toFixed(1)
    ),
  };
};

const createDailyChart = (): ChartData[] => {
  return [
    { label: "0時", value: 0 },
    { label: "4時", value: 1 },
    { label: "8時", value: 2 },
    { label: "12時", value: 5 },
    { label: "16時", value: 3 },
    { label: "20時", value: 6 },
    { label: "24時", value: 1 },
  ];
};

const createMonthlyChart = (
  date: Date
): ChartData[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const result: ChartData[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    result.push({
      label: `${day}`,
      value:
        (day * 3 + month + year) % 9,
    });
  }

  return result;
};

const createYearlyChart = (): ChartData[] => {
  return [
    { label: "1月", value: 55 },
    { label: "2月", value: 62 },
    { label: "3月", value: 70 },
    { label: "4月", value: 66 },
    { label: "5月", value: 78 },
    { label: "6月", value: 72 },
    { label: "7月", value: 81 },
    { label: "8月", value: 68 },
    { label: "9月", value: 74 },
    { label: "10月", value: 80 },
    { label: "11月", value: 76 },
    { label: "12月", value: 84 },
  ];
};

function StatisticsPage() {
  const [period, setPeriod] =
    useState<Period>("月別");

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const displayDate = useMemo(() => {
    const year =
      currentDate.getFullYear();

    const month =
      currentDate.getMonth() + 1;

    const day =
      currentDate.getDate();

    const week =
      weekNames[currentDate.getDay()];

    if (period === "日別") {
      return `${year}年${month}月${day}日（${week}）`;
    }

    if (period === "月別") {
      return `${year}年${month}月`;
    }

    return `${year}年`;
  }, [period, currentDate]);

  const statistics = useMemo(
    () =>
      createStatistics(
        period,
        currentDate
      ),
    [period, currentDate]
  );

  const chartData = useMemo(() => {
    if (period === "日別") {
      return createDailyChart();
    }

    if (period === "月別") {
      return createMonthlyChart(
        currentDate
      );
    }

    return createYearlyChart();
  }, [period, currentDate]);

  const maxValue = Math.max(
    ...chartData.map(
      (data) => data.value
    ),
    1
  );

  const handlePrevious = () => {
    const newDate =
      new Date(currentDate);

    if (period === "日別") {
      newDate.setDate(
        newDate.getDate() - 1
      );
    } else if (period === "月別") {
      newDate.setMonth(
        newDate.getMonth() - 1
      );
    } else {
      newDate.setFullYear(
        newDate.getFullYear() - 1
      );
    }

    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate =
      new Date(currentDate);

    if (period === "日別") {
      newDate.setDate(
        newDate.getDate() + 1
      );
    } else if (period === "月別") {
      newDate.setMonth(
        newDate.getMonth() + 1
      );
    } else {
      newDate.setFullYear(
        newDate.getFullYear() + 1
      );
    }

    setCurrentDate(newDate);
  };

  const handlePeriodChange = (
    newPeriod: Period
  ) => {
    setPeriod(newPeriod);
    setCurrentDate(new Date());
  };

  const getChartTitle = () => {
    if (period === "日別") {
      return "時間別達成数";
    }

    if (period === "月別") {
      return "日別達成数";
    }

    return "月別完了率";
  };

  return (
    <div className="statisticsPage">
      <header className="statisticsHeader">
        <h1>
          統計
        </h1>
      </header>
      <main className="statisticsContent">
        <div className="periodTabs">
          {(
            [
              "日別",
              "月別",
              "年別",
            ] as Period[]
          ).map((item) => (
            <button
              type="button"
              key={item}
              className={
                period === item
                  ? "periodTab active"
                  : "periodTab"
              }
              onClick={() =>
                handlePeriodChange(item)
              }
            >
              {item}
            </button>
          ))}
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
          <h2>
            {displayDate}
          </h2>
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
            <p className="summaryLabel">
              完了率
            </p>
            <p className="summaryValue">
              {statistics.completionRate}
              <span>
                %
              </span>
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
              <span>
                日
              </span>
            </p>
          </div>
        </div>
        <section className="chartSection">
          <h3>
            {getChartTitle()}
          </h3>
          <div className="chartScroll">
            <div
              className={`chart ${
                period === "月別"
                  ? "monthlyChart"
                  : ""
              }`}
            >
              <div className="chartYAxis">
                <span>
                  {maxValue}
                </span>
                <span>
                  {Math.round(
                    maxValue / 2
                  )}
                </span>
                <span>
                  0
                </span>
              </div>
              <div className="chartArea">
                <div className="chartLine lineTop" />
                <div className="chartLine lineMiddle" />
                <div className="chartLine lineBottom" />
                <div className="chartBars">
                  {chartData.map(
                    (data, index) => (
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
                              height:
                                `${
                                  (data.value /
                                    maxValue) *
                                  100
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
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="statisticsList">
          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">
                🔥
              </span>
              <span>
                連続達成日数
              </span>
            </div>
            <strong>
              {statistics.streakDays}日
            </strong>
          </div>
          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">
                ✓
              </span>
              <span>
                完了タスク数
              </span>
            </div>
            <strong>
              {statistics.completedTasks}件
            </strong>
          </div>
          <div className="statisticsItem">
            <div className="statisticsItemLeft">
              <span className="statisticsIcon">
                ◉
              </span>
              <span>
                平均タスク数
              </span>
            </div>
            <strong>
              {statistics.averageTasks}件
            </strong>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default StatisticsPage;