import "../../index.css";
import "./OtherPage.css";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function OtherPage() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile/edit");
  };

  const handleTerms = () => {
    navigate("/terms");
  };

  const handlePrivacy = () => {
    navigate("/privacy");
  };

  const handleLogout = () => {
    const result = window.confirm(
      "ログアウトしますか？"
    );

    if (!result) {
      return;
    }

    navigate("/");
  };

  return (
    <div className="otherPage">
      <header className="otherHeader">
        <h1>その他</h1>
      </header>
      <main className="otherContent">
        <section className="otherSection">
          <h2 className="otherSectionTitle">
            アカウント
          </h2>
          <div className="otherMenu">
            <button
              type="button"
              className="otherMenuItem"
              onClick={handleProfile}
            >
              <div className="otherMenuLeft">
                <div className="otherIcon">
                  ♙
                </div>
                <span>
                  プロフィール編集
                </span>
              </div>
              <span className="otherArrow">
                ＞
              </span>
            </button>
          </div>
        </section>
        <section className="otherSection">
          <h2 className="otherSectionTitle">
            このアプリについて
          </h2>
          <div className="otherMenu">
            <button
              type="button"
              className="otherMenuItem"
              onClick={handleTerms}
            >
              <div className="otherMenuLeft">
                <div className="otherIcon">
                  ▤
                </div>
                <span>
                  利用規約
                </span>
              </div>
              <span className="otherArrow">
                ＞
              </span>
            </button>
            <button
              type="button"
              className="otherMenuItem"
              onClick={handlePrivacy}
            >
              <div className="otherMenuLeft">
                <div className="otherIcon">
                  ◇
                </div>
                <span>
                  プライバシーポリシー
                </span>
              </div>
              <span className="otherArrow">
                ＞
              </span>
            </button>
          </div>
        </section>
        <section className="logoutSection">
          <button
            type="button"
            className="logoutButton"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </section>
        <p className="appVersion">
          Task Quest v1.0.0
        </p>
      </main>
      <BottomNav />
    </div>
  );
}

export default OtherPage;