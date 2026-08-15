import "../../index.css";
import "./RetrospectivePage.css";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

type LocationState = {
  date?: string;
  from?: string;
};

function RetrospectivePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as LocationState | null;

  const createDate = (dateString?: string) => {
    if (!dateString) {
      return new Date();
    }

    return new Date(
      `${dateString}T00:00:00`
    );
  };

  const [selectedDate, setSelectedDate] =
    useState<Date>(
      createDate(state?.date)
    );

  const [goodPoint, setGoodPoint] =
    useState("");

  const [improvement, setImprovement] =
    useState("");

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
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const displayDate = `${selectedDate.getFullYear()}年${
    selectedDate.getMonth() + 1
  }月${selectedDate.getDate()}日（${
    weekNames[selectedDate.getDay()]
  }）`;

  const handlePreviousDay = () => {
    const newDate =
      new Date(selectedDate);

    newDate.setDate(
      newDate.getDate() - 1
    );

    setSelectedDate(newDate);
    setGoodPoint("");
    setImprovement("");
  };

  const handleNextDay = () => {
    const newDate =
      new Date(selectedDate);

    newDate.setDate(
      newDate.getDate() + 1
    );

    setSelectedDate(newDate);
    setGoodPoint("");
    setImprovement("");
  };

  const handleBack = () => {
    const returnPath =
      state?.from ?? "/home";

    if (returnPath === "/calendar") {
      navigate("/calendar", {
        state: {
          selectedDate:
            formatDate(selectedDate),
        },
      });

      return;
    }

    navigate(returnPath);
  };

  const handleSave = () => {
    const retrospective = {
      date: formatDate(selectedDate),
      goodPoint,
      improvement,
    };

    console.log(
      "振り返り:",
      retrospective
    );

    const returnPath =
      state?.from ?? "/home";

    if (returnPath === "/calendar") {
      navigate("/calendar", {
        state: {
          selectedDate:
            formatDate(selectedDate),
        },
      });

      return;
    }

    navigate(returnPath);
  };

  return (
    <div className="retrospectivePage">
      <header className="retrospectiveHeader">
        <button
          type="button"
          className="retrospectiveBackButton"
          onClick={handleBack}
          aria-label="戻る"
        >
          ＜
        </button>
        <h1>
          振り返り
        </h1>
        <div className="retrospectiveHeaderSpace" />
      </header>
      <main className="retrospectiveContent">
        <div className="retrospectiveDateSelector">
          <button
            type="button"
            className="retrospectiveDateButton"
            onClick={handlePreviousDay}
            aria-label="前の日"
          >
            ＜
          </button>
          <p className="retrospectiveDate">
            {displayDate}
          </p>
          <button
            type="button"
            className="retrospectiveDateButton"
            onClick={handleNextDay}
            aria-label="次の日"
          >
            ＞
          </button>
        </div>
        <div className="retrospectiveFormGroup">
          <label htmlFor="goodPoint">
            良かったこと
          </label>
          <textarea
            id="goodPoint"
            placeholder="今日良かったことを入力"
            value={goodPoint}
            onChange={(e) =>
              setGoodPoint(
                e.target.value
              )
            }
          />
        </div>
        <div className="retrospectiveFormGroup">
          <label htmlFor="improvement">
            改善点
          </label>
          <textarea
            id="improvement"
            placeholder="改善点を入力"
            value={improvement}
            onChange={(e) =>
              setImprovement(
                e.target.value
              )
            }
          />
        </div>
        <button
          type="button"
          className="retrospectiveSaveButton"
          onClick={handleSave}
        >
          保存する
        </button>
      </main>
    </div>
  );
}

export default RetrospectivePage;