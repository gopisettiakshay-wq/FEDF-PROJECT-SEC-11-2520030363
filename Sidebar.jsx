import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    ["/dashboard", "📊", "Dashboard"],
    ["/menu", "🍽️", "Menu Management"],
    ["/orders", "🧾", "Food Orders"],
    ["/kitchen", "👨‍🍳", "Kitchen Status"],
    ["/billing", "💳", "Billing"],
    ["/inventory", "📦", "Inventory"],
    ["/reports", "📈", "Reports"],
    ["/notifications", "🔔", "Notifications"],
    ["/profile", "👤", "Profile"],
    ["/admin", "⚙️", "Admin Panel"],
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">🍴</div>

        <div>
          <h2>Food Module</h2>
          <span>Hotel Management System</span>
        </div>
      </div>

      <div className="user-card">
        <img
          src={
            user?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
        />

        <b>{user?.name || "Admin User"}</b>
        <small>{user?.role || "Admin"}</small>
      </div>

      <nav>
        {links.map(([path, icon, name]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>{icon}</span>
            {name}
          </NavLink>
        ))}
      </nav>

      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;