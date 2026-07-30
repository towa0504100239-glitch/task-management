import { NavLink } from "react-router-dom";
function BottomNav() {
  return (
    <nav className="bottomNav">
      <NavLink to="/home">
        ホーム
      </NavLink>
    </nav>
  );
}

export default BottomNav;