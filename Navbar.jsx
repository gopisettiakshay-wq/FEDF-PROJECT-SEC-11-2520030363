import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    localStorage.setItem("globalSearch", e.target.value);
    window.dispatchEvent(new Event("globalSearchUpdated"));
  };

  return (
    <header className="topbar">
      <div>
        <h1>Hotel Food Management</h1>
        <p>Smart food operations dashboard</p>
      </div>

      <div className="search">
        <Search size={18} />
        <input
          placeholder="Search dishes globally..."
          onChange={handleSearch}
        />
      </div>

      <div className="top-actions">
        <span>
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </span>

        <button className="bell">
          <Bell size={19} />
          <b>{notifications.length}</b>
        </button>

        <img
          src={
            user?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
        />
      </div>
    </header>
  );
}

export default Navbar;