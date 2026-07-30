import { useState } from "react";
import {Link} from "react-router-dom"
import Logo from "../../assets/icon.png";
import MailIcon from "../../assets/icon_mail.png";
import UserIcon from "../../assets/icon_user.png";
import PasswordIcon from "../../assets/icon_password.png";
import EyeIconClose from "../../assets/eye_close.png";
import EyeIconOpen from "../../assets/eye_open.png";

import "./auth.css";
import "../../index.css";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="screen">
      <div className="phone">

        <div className="logoArea">
          <div className="logo">
            <img src={Logo} alt="Task Quest" />
          </div>

          <h1>Task Quest</h1>
          <p>タスクを倒してレベルアップ！</p>
        </div>

        <form className="authForm">

          <div className="inputGroup">
            <label className="authLabel">ユーザー名</label>

            <div className="inputWrap">
              <img src={UserIcon} alt="" />

              <input
                type="text"
                placeholder="ユーザー名"
              />
            </div>
          </div>

          <div className="inputGroup">
            <label className="authLabel">メールアドレス</label>

            <div className="inputWrap">
              <img src={MailIcon} alt="" />

              <input
                type="email"
                placeholder="メールアドレス"
              />
            </div>
          </div>

          <div className="inputGroup">
            <label className="authLabel">パスワード</label>

            <div className="inputWrap">
              <img src={PasswordIcon} alt="" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="パスワード"
              />

              <button
                type="button"
                className="eyeButton"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? EyeIconOpen : EyeIconClose}
                  alt="パスワード表示切替"
                />
              </button>
            </div>
          </div>

          <div className="inputGroup">
            <label className="authLabel">
              パスワード（確認用）
            </label>

            <div className="inputWrap">
              <img src={PasswordIcon} alt="" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="パスワード（確認用）"
              />

              <button
                type="button"
                className="eyeButton"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <img
                  src={
                    showConfirmPassword
                      ? EyeIconOpen
                      : EyeIconClose
                  }
                  alt="パスワード表示切替"
                />
              </button>
            </div>
          </div>

          <button className="authButton v2" type="button">
            登録する
          </button>

        </form>
         <p className="signup">
          アカウントをお持ちでない方は <Link className="signupLink" to="/">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;