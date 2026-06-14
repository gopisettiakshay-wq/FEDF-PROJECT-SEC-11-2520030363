import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-panel">
        <Navbar />

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;