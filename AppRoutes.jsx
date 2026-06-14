import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MenuManagement from "../pages/MenuManagement";
import FoodOrders from "../pages/FoodOrders";
import KitchenStatus from "../pages/KitchenStatus";
import Billing from "../pages/Billing";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="orders" element={<FoodOrders />} />
        <Route path="kitchen" element={<KitchenStatus />} />
        <Route path="billing" element={<Billing />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<AdminPanel />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;