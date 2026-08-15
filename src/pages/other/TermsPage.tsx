import "../../index.css";
import "./TermsPage.css";
import { useNavigate } from "react-router-dom";

function TermsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/other");
  };

  return (
    <div className="termsPage">
      <header className="termsHeader">
        <button
          type="button"
          className="termsBackButton"
          onClick={handleBack}
          aria-label="戻る"
        >
          ＜
        </button>
        <h1>利用規約</h1>
        <div className="termsHeaderSpace" />
      </header>
      <main className="termsContent">
        <p className="termsUpdated">
          最終更新日：2026年8月
        </p>
        <p className="termsIntro">
          この利用規約（以下「本規約」といいます）は、
          Task Quest（以下「本サービス」といいます）の
          利用条件を定めるものです。
        </p>
        <section className="termsSection">
          <h2>
            第1条（適用）
          </h2>
          <p>
            本規約は、本サービスを利用するすべての
            ユーザーに適用されます。
          </p>
          <p>
            ユーザーは、本サービスを利用することで、
            本規約に同意したものとみなされます。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第2条（アカウント）
          </h2>
          <p>
            ユーザーは、登録情報を正確に入力し、
            自身の責任でアカウント情報を管理するものとします。
          </p>
          <p>
            パスワードなどの認証情報を第三者に
            利用させてはなりません。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第3条（禁止事項）
          </h2>
          <p>
            ユーザーは、本サービスの利用にあたり、
            以下の行為を行ってはなりません。
          </p>
          <ul>
            <li>
              法令または公序良俗に反する行為
            </li>
            <li>
              他のユーザーまたは第三者に
              不利益を与える行為
            </li>
            <li>
              本サービスの運営を妨害する行為
            </li>
            <li>
              不正アクセスなど、
              本サービスの安全性を損なう行為
            </li>
            <li>
              その他、運営者が不適切と判断する行為
            </li>
          </ul>
        </section>
        <section className="termsSection">
          <h2>
            第4条（サービス内容）
          </h2>
          <p>
            本サービスは、タスクの登録・管理や、
            タスクの達成状況を可視化する機能を提供します。
          </p>
          <p>
            サービス内容は、必要に応じて
            変更または追加される場合があります。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第5条（サービスの停止・変更）
          </h2>
          <p>
            システムの保守、障害その他の理由により、
            本サービスの全部または一部を
            一時的に停止する場合があります。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第6条（免責事項）
          </h2>
          <p>
            本サービスの利用によって生じた損害について、
            運営者は法令上責任を負う場合を除き、
            責任を負わないものとします。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第7条（規約の変更）
          </h2>
          <p>
            本規約は、必要に応じて変更される場合があります。
            変更後の規約は、本サービス上で
            表示された時点から適用されます。
          </p>
        </section>
        <section className="termsSection">
          <h2>
            第8条（お問い合わせ）
          </h2>
          <p>
            本サービスに関するお問い合わせ方法については、
            別途本サービス内に表示するものとします。
          </p>
        </section>
      </main>
    </div>
  );
}

export default TermsPage;