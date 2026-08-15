import "../../index.css";
import "./ProfileEditPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileEditPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("ユーザー");
  const [email, setEmail] = useState(
    "example@gmail.com"
  );

  const handleBack = () => {
    navigate("/other");
  };

  const handleSave = () => {
    const profile = {
      name,
      email,
    };

    console.log(
      "更新するプロフィール:",
      profile
    );

    navigate("/other");
  };

  const handlePasswordChange = () => {
    navigate("/profile/password");
  };

  return (
    <div className="profileEditPage">
      <header className="profileEditHeader">
        <button
          type="button"
          className="profileBackButton"
          onClick={handleBack}
          aria-label="戻る"
        >
          ＜
        </button>
        <h1>
          プロフィール編集
        </h1>
        <button
          type="button"
          className="profileSaveButton"
          onClick={handleSave}
        >
          保存
        </button>
      </header>
      <main className="profileEditContent">
        <section className="profileSection">
          <h2>
            基本情報
          </h2>
          <div className="profileFormGroup">
            <label htmlFor="name">
              ユーザー名
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="ユーザー名"
            />
          </div>
          <div className="profileFormGroup">
            <label htmlFor="email">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="メールアドレス"
            />
          </div>
        </section>
        <section className="profileSection">
          <h2>
            セキュリティ
          </h2>
          <button
            type="button"
            className="passwordChangeButton"
            onClick={handlePasswordChange}
          >
            <div>
              <p className="passwordTitle">
                パスワード
              </p>
              <p className="passwordDescription">
                パスワードを変更する
              </p>
            </div>
            <span>
              ＞
            </span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default ProfileEditPage;