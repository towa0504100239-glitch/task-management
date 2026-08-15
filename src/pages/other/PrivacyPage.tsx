import "../../index.css";
import "./PrivacyPage.css";
import { useNavigate } from "react-router-dom";

function PrivacyPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/other");
  };

  return (
    <div className="privacyPage">
      <header className="privacyHeader">
        <button
          type="button"
          className="privacyBackButton"
          onClick={handleBack}
          aria-label="戻る"
        >
          ＜
        </button>
        <h1>
          プライバシーポリシー
        </h1>
        <div className="privacyHeaderSpace" />
      </header>
      <main className="privacyContent">
        <p className="privacyUpdated">
          最終更新日：2026年8月
        </p>
        <p className="privacyIntro">
          Task Quest（以下「本サービス」といいます）は、
          ユーザーの個人情報を適切に取り扱うため、
          以下のとおりプライバシーポリシーを定めます。
        </p>
        <section className="privacySection">
          <h2>
            1. 取得する情報
          </h2>
          <p>
            本サービスでは、サービス提供のために
            以下の情報を取得する場合があります。
          </p>
          <ul>
            <li>
              ユーザー名
            </li>
            <li>
              メールアドレス
            </li>
            <li>
              アカウントに関する情報
            </li>
            <li>
              登録したタスク情報
            </li>
            <li>
              タスクの完了状況
            </li>
            <li>
              本サービスの利用状況
            </li>
          </ul>
        </section>
        <section className="privacySection">
          <h2>
            2. 情報の利用目的
          </h2>
          <p>
            取得した情報は、以下の目的で利用します。
          </p>
          <ul>
            <li>
              本サービスの提供および運営
            </li>
            <li>
              ユーザー認証およびアカウント管理
            </li>
            <li>
              タスク管理機能の提供
            </li>
            <li>
              タスク達成状況や統計情報の表示
            </li>
            <li>
              本サービスの改善
            </li>
            <li>
              不正利用の防止
            </li>
          </ul>
        </section>
        <section className="privacySection">
          <h2>
            3. 個人情報の管理
          </h2>
          <p>
            本サービスでは、取得した個人情報について、
            不正アクセス、紛失、漏えいなどを防止するため、
            適切な安全管理に努めます。
          </p>
        </section>
        <section className="privacySection">
          <h2>
            4. 第三者への提供
          </h2>
          <p>
            取得した個人情報は、法令に基づく場合などを除き、
            ユーザー本人の同意なく第三者へ提供しません。
          </p>
        </section>
        <section className="privacySection">
          <h2>
            5. データの保存
          </h2>
          <p>
            本サービスでは、サービスの提供に必要な範囲で
            ユーザー情報およびタスク情報を保存します。
          </p>
          <p>
            アカウントの削除などにより保存する必要が
            なくなった情報については、適切な方法で
            削除するものとします。
          </p>
        </section>
        <section className="privacySection">
          <h2>
            6. プライバシーポリシーの変更
          </h2>
          <p>
            本ポリシーは、必要に応じて変更する場合があります。
            変更後の内容は、本サービス上で表示した時点から
            適用されるものとします。
          </p>
        </section>
        <section className="privacySection">
          <h2>
            7. お問い合わせ
          </h2>
          <p>
            個人情報の取り扱いに関するお問い合わせ方法については、
            別途本サービス内に表示するものとします。
          </p>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPage;