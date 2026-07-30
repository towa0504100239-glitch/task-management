import { useState } from "react";
import {Link} from "react-router-dom"
import Logo from '../../assets/icon.png'
import MailIcon from '../../assets/icon_mail.png'
import PasswordIcon from '../../assets/icon_password.png'
import eyeIconClose from '../../assets/eye_close.png'
import eyeiconOpen from '../../assets/eye_open.png'
import './auth.css'
import '../../index.css'

function LoginPage() {
const [showPassword, setShowPassword] = useState(false);
  return (
    <>
       <div className="screen">
      <div className="phone">
        <div className="logoArea">
          <div className="logo"><img src={Logo}></img></div>
          <h1>Task Quest</h1>
          <p>タスクを倒してレベルアップ！</p>
        </div>

        <form className="authForm ">
          <div className="inputGroup">
              <label className="authLabel">メールアドレス</label>
              <div className="inputWrap">
                <img src={MailIcon} alt="メールアイコン" />
              <input type="email" placeholder="example@gmail.com" />
              </div>
          </div>
          <div className="inputGroup">
            <label className="authLabel">パスワード</label>
            <div className="inputWrap">
              <img src={PasswordIcon} alt="パスワードアイコン" />
            <input  type={showPassword ? "text" : "password"} placeholder="パスワード" />
            <button 
            className="eyeButton"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
            <img src={showPassword ? eyeiconOpen : eyeIconClose} alt="目のアイコン" />
            </button>
            </div>
          </div>

          <label className="keepLogin">
            <input type="checkbox" />
            ログインしたままにする
          </label>

          <button className="authButton" type="button">ログイン</button>
        </form>

        <p className="signup">
          アカウントをお持ちでない方は <Link className="signupLink" to="/register">こちら</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default LoginPage
