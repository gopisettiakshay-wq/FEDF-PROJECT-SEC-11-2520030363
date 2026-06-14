import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import DashboardCard from "../components/DashboardCard";
import { getData } from "../api/api";

function Dashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setMenuItems(await getData("menuItems"));
    setOrders(await getData("orders"));
    setInventory(await getData("inventory"));
    setBills(await getData("bills"));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const preparingOrders = orders.filter((o) => o.status === "Preparing").length;
  const servedOrders = orders.filter((o) => o.status === "Served").length;
  const lowStock = inventory.filter((i) => Number(i.quantity) <= 10).length;

  const orderChart = [
    { name: "Pending", value: pendingOrders },
    { name: "Preparing", value: preparingOrders },
    { name: "Ready", value: orders.filter((o) => o.status === "Ready").length },
    { name: "Served", value: servedOrders },
    {
      name: "Cancelled",
      value: orders.filter((o) => o.status === "Cancelled").length,
    },
  ];

  const categoryMap = {};
  menuItems.forEach((item) => {
    categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
  });

  const categoryChart = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));

  const revenueChart = bills.map((bill, index) => ({
    name: `Bill ${index + 1}`,
    revenue: Number(bill.total || 0),
  }));

  const topFoods = Object.values(
    orders.reduce((acc, order) => {
      if (!acc[order.foodName]) {
        acc[order.foodName] = {
          name: order.foodName,
          quantity: 0,
        };
      }

      acc[order.foodName].quantity += Number(order.quantity || 0);
      return acc;
    }, {})
  ).slice(0, 5);

  const colors = [
    "#facc15",
    "#38bdf8",
    "#22c55e",
    "#fb7185",
    "#a78bfa",
    "#fb923c",
  ];

  return (
    <div>
      <div className="dashboard-hero">
        <div>
          <span className="hero-badge">🍴 Food Section Analytics</span>
          <h1>Hotel Food Management Dashboard</h1>
          <p>
            Monitor menu items, live orders, kitchen workflow, inventory alerts,
            billing revenue and customer food operations in real time.
          </p>
        </div>

        <div className="hero-card">
          <h3>Today Revenue</h3>
          <h2>₹{totalRevenue}</h2>
          <p>{orders.length} total orders tracked</p>
        </div>
      </div>

      <div className="stats">
        <DashboardCard title="Menu Items" value={menuItems.length} icon="🍽️" />
        <DashboardCard title="Total Orders" value={orders.length} icon="🧾" />
        <DashboardCard title="Pending Orders" value={pendingOrders} icon="⏳" />
        <DashboardCard title="Preparing" value={preparingOrders} icon="👨‍🍳" />
        <DashboardCard title="Served Orders" value={servedOrders} icon="✅" />
        <DashboardCard title="Revenue" value={`₹${totalRevenue}`} icon="💰" />
        <DashboardCard title="Inventory Items" value={inventory.length} icon="📦" />
        <DashboardCard title="Low Stock" value={lowStock} icon="⚠️" />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Order Status Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Menu Category Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChart}
                dataKey="value"
                nameKey="name"
                outerRadius={105}
                label
              >
                {categoryChart.map((item, index) => (
                  <Cell key={item.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Revenue Trend</h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Top Selling Food Items</h2>

          {topFoods.length === 0 ? (
            <div className="empty-box">
              <h3>No sales data yet</h3>
              <p>Orders will appear here after customers place food orders.</p>
            </div>
          ) : (
            <div className="top-food-list">
              {topFoods.map((food, index) => (
                <div key={food.name}>
                  <span>{index + 1}</span>
                  <b>{food.name}</b>
                  <p>{food.quantity} sold</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-info">
        <div>
          <h2>System Intelligence</h2>
          <p>
            This dashboard uses LocalStorage as database, React Hooks for state
            management, Context API for authentication, Recharts for analytics
            and protected routing for secure access.
          </p>
        </div>

        <div>
          <h2>Operational Alerts</h2>
          <p>
            {lowStock > 0
              ? `${lowStock} inventory items are running low. Please restock soon.`
              : "All inventory stock levels are currently healthy."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;