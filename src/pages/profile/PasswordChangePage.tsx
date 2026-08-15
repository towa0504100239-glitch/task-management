import "../../index.css";
import "./PasswordChangePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordChangePage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] =
    useState("");

  const handleBack = () => {
    navigate("/profile/edit");
  };

  const handleSave = () => {
    setError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "すべての項目を入力してください"
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "新しいパスワードは8文字以上で入力してください"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "新しいパスワードが一致しません"
      );
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
    };

    console.log(
      "パスワード変更:",
      passwordData
    );

    navigate("/profile/edit");
  };

  return (
    <div className="passwordChangePage">
      <header className="passwordChangeHeader">
        <button
          type="button"
          className="passwordBackButton"
          onClick={handleBack}
          aria-label="戻る"
        >
          ＜
        </button>
        <h1>
          パスワード変更
        </h1>
        <button
          type="button"
          className="passwordSaveButton"
          onClick={handleSave}
        >
          保存
        </button>
      </header>
      <main className="passwordChangeContent">
        <p className="passwordGuide">
          現在のパスワードと、
          新しく設定するパスワードを入力してください。
        </p>
        <div className="passwordFormGroup">
          <label htmlFor="currentPassword">
            現在のパスワード
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="現在のパスワード"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
          />
        </div>
        <div className="passwordFormGroup">
          <label htmlFor="newPassword">
            新しいパスワード
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="8文字以上で入力"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />
          <p className="passwordHint">
            8文字以上で入力してください
          </p>
        </div>
        <div className="passwordFormGroup">
          <label htmlFor="confirmPassword">
            新しいパスワード（確認）
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="もう一度入力"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />
        </div>
        {error && (
          <p className="passwordError">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

export default PasswordChangePage;