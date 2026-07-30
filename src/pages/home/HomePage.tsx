import '../../index.css'
import './HomePage.css'
import BottomNav from "../components/BottomNav";
function HomePage() {
    const tasks = [
  { id: 1, priority: "高", name: "タスク1", deadline: "今日 12:00" },
  { id: 2, priority: "中", name: "タスク2", deadline: "今日 14:00" },
  { id: 3, priority: "低", name: "タスク3", deadline: "今日 16:00" },
  { id: 4, priority: "低", name: "タスク4", deadline: "今日 16:00" },
  { id: 5, priority: "低", name: "タスク5", deadline: "今日 16:00" },
  { id: 6, priority: "低", name: "タスク6", deadline: "今日 16:00" },
  { id: 7, priority: "低", name: "タスク7", deadline: "今日 16:00" },
  { id: 8, priority: "低", name: "タスク8", deadline: "今日 16:00" },
  { id: 9, priority: "低", name: "タスク9", deadline: "今日 16:00" },
  { id: 10, priority: "低", name: "タスク10", deadline: "今日 16:00" },
  { id: 11, priority: "低", name: "タスク11", deadline: "今日 16:00" },
];
  return (
    <div className="containaer">
      <div className="levelWrapper">
        <h1 className="level">Lv.12</h1>
        <p className="Experience">650/10000 XP</p>
      </div>
      <div className="xpBar">
        <div className="xpProgress"></div>
      </div>
      <h2 className="day">6月23日(日)</h2>
      <div className="daySelect">
        <div className="pick"><p>今日</p></div>
        <div><p>明日</p></div>
        <div><p>今週</p></div>
        <div><p>今月</p></div>
      </div>
      <h3 className="taskTitle">今日のタスク(優先順位順)</h3>
      <div className="taskList">
        {tasks.map((task) => (
            <div className="task" key={task.id}>
            <div className="taskInfo">

            <div
                className={`taskIcon ${
                    task.priority === "高"
                    ? "v1"
                    : task.priority === "中"
                    ? "v2"
                    : "v3"
                }`}
                >
                <p>{task.priority}</p>
            </div>
                <div className="taskWrap">
                <h4 className="taskName">
                    {task.name}
                </h4>

                <p className="taskTime">
                    期限: {task.deadline}
                </p>
                </div>

                <div className="taskStatus">
                <input type="checkbox" />
                </div>

            </div>
            </div>
        ))}
        </div>
    <BottomNav />
    </div>
  );
}

export default HomePage;