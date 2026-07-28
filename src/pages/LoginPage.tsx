// import { useState } from 'react'
import Logo from '../assets/logo.png'
import './LoginPage.css'

function LoginPage() {

  return (
    <>
       <div className="screen">
      <div className="phone">
        <div className="logoArea">
          <div className="logo"><img src={Logo}></img></div>
          <h1>Task Quest</h1>
          <p>タスクを倒してレベルアップ！</p>
        </div>

        <form className="loginForm">
          <input type="email" placeholder="メールアドレス" />
          <input type="password" placeholder="パスワード" />

          <label className="keepLogin">
            <input type="checkbox" />
            ログインしたままにする
          </label>

          <button type="button">ログイン</button>
        </form>

        <p className="signup">
          アカウントをお持ちでない方は <span>こちら</span>
        </p>
      </div>
    </div>
    </>
  )
}

export default LoginPage
