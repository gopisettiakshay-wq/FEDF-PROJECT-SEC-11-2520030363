import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import toast from "react-hot-toast";
import { getData } from "../api/api";

function Reports() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setOrders(await getData("orders"));
    setBills(await getData("bills"));
    setMenuItems(await getData("menuItems"));
    setInventory(await getData("inventory"));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const paidRevenue = bills
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, bill) => sum + Number(bill.total || 0), 0);

  const pendingRevenue = bills
    .filter((b) => b.paymentStatus === "Pending")
    .reduce((sum, bill) => sum + Number(bill.total || 0), 0);

  const lowStock = inventory.filter((item) => Number(item.quantity) <= 10).length;

  const revenueData = bills.map((bill, index) => ({
    name: `Bill ${index + 1}`,
    revenue: Number(bill.total || 0),
  }));

  const orderStatusData = ["Pending", "Preparing", "Ready", "Served", "Cancelled"].map(
    (status) => ({
      name: status,
      value: orders.filter((order) => order.status === status).length,
    })
  );

  const categoryData = useMemo(() => {
    const map = {};

    menuItems.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });

    return Object.keys(map).map((category) => ({
      name: category,
      value: map[category],
    }));
  }, [menuItems]);

  const topSellingItems = useMemo(() => {
    const map = {};

    orders.forEach((order) => {
      map[order.foodName] =
        (map[order.foodName] || 0) + Number(order.quantity || 0);
    });

    return Object.keys(map)
      .map((foodName) => ({
        foodName,
        quantity: map[foodName],
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 8);
  }, [orders]);

  const exportReport = () => {
    const reportText = `
HOTEL FOOD MANAGEMENT ADVANCED REPORT
------------------------------------
Total Revenue: ₹${totalRevenue}
Paid Revenue: ₹${paidRevenue}
Pending Revenue: ₹${pendingRevenue}
Total Orders: ${orders.length}
Total Menu Items: ${menuItems.length}
Inventory Items: ${inventory.length}
Low Stock Items: ${lowStock}
Generated At: ${new Date().toLocaleString()}
------------------------------------
`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "advanced-food-report.txt";
    a.click();

    toast.success("Advanced report exported");
  };

  const colors = ["#facc15", "#38bdf8", "#22c55e", "#fb7185", "#a78bfa", "#fb923c"];

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Revenue, orders, menu categories, top-selling dishes and stock analytics</p>
        </div>

        <button onClick={exportReport}>Export Report</button>
      </div>

      <div className="report-stats">
        <div>
          <span>💰</span>
          <h3>₹{totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>

        <div>
          <span>✅</span>
          <h3>₹{paidRevenue}</h3>
          <p>Paid Revenue</p>
        </div>

        <div>
          <span>⏳</span>
          <h3>₹{pendingRevenue}</h3>
          <p>Pending Revenue</p>
        </div>

        <div>
          <span>⚠️</span>
          <h3>{lowStock}</h3>
          <p>Low Stock Alerts</p>
        </div>
      </div>

      <div className="report-grid">
        <div className="panel">
          <h2>Revenue Performance</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
          <h2>Order Status Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="report-grid">
        <div className="panel">
          <h2>Menu Category Analytics</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((item, index) => (
                  <Cell key={item.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Top Selling Items</h2>

          {topSellingItems.length === 0 ? (
            <div className="empty-box">
              <h3>No sales data</h3>
              <p>Top-selling food items will appear after orders are created.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topSellingItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="foodName" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#22c55e" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="report-insights">
        <div>
          <h2>Business Insight</h2>
          <p>
            Revenue is calculated dynamically from billing records. Paid and
            pending revenue help managers understand cash flow and payment status.
          </p>
        </div>

        <div>
          <h2>Stock Insight</h2>
          <p>
            {lowStock > 0
              ? `${lowStock} inventory items are low in stock and require restocking.`
              : "Inventory stock levels are currently healthy."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;