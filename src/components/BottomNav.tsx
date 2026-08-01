import { NavLink } from "react-router-dom";
import home from "../../assets/home.png";
import home_cl from "../../assets/home_v2.png";
import calendar from "../../assets/calendar.png";
import calendar_cl from "../../assets/calendar_v2.png";
import task from "../../assets/task.png";
import task_cl from "../../assets/task_v2.png";
import statistics from "../../assets/statistics.png"
import statistics_cl from "../../assets/statistics_v2.png"
import menu from "../../assets/menu.png"
import menu_cl from "../../assets/menu_v2.png"

import "./BottomNav.css"
function BottomNav() {
  const navItems = [
  {
    path: "/home",
    label: "ホーム",
    icon: home,
    activeIcon: home_cl,
  },
  {
    path: "/calendar",
    label: "カレンダー",
    icon: calendar,
    activeIcon: calendar_cl,
  },
  {
    path: "/task",
    label: "タスク",
    icon: task,
    activeIcon: task_cl,
  },
  {
    path: "/statistics",
    label: "統計",
    icon: statistics,
    activeIcon: statistics_cl,
  },
  {
    path: "/menu",
    label: "その他",
    icon: menu,
    activeIcon: menu_cl,
  },
];
  return (
   <nav className="bottomNav">
  {navItems.map((item) => (
    <NavLink key={item.path} to={item.path} className="navItem">
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.activeIcon : item.icon}
            alt={item.label}
            className="navIcon"
          />
          <span className="navLabel">{item.label}</span>
        </>
      )}
    </NavLink>
  ))}
</nav>
  );
}

export default BottomNav;