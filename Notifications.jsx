import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData } from "../api/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await getData("notifications");
    setNotifications(data.reverse());
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchSearch = notification.message
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ||
        (filter === "Orders" &&
          notification.message.toLowerCase().includes("order")) ||
        (filter === "Inventory" &&
          notification.message.toLowerCase().includes("inventory")) ||
        (filter === "Billing" &&
          notification.message.toLowerCase().includes("bill")) ||
        (filter === "System" &&
          !notification.message.toLowerCase().includes("order"));

      return matchSearch && matchFilter;
    });
  }, [notifications, search, filter]);

  const clearAllNotifications = async () => {
    if (!window.confirm("Clear all notifications?")) return;

    await saveData("notifications", []);
    setNotifications([]);

    toast.success("Notifications cleared");
  };

  const deleteNotification = async (id) => {
    const updated = notifications.filter((n) => n.id !== id);

    await saveData("notifications", updated.reverse());
    setNotifications(updated);

    toast.success("Notification deleted");
  };

  const addDemoNotification = async () => {
    const newNotification = {
      id: Date.now(),
      message: "New food order received from Table 12",
      time: new Date().toLocaleString(),
    };

    const updated = [newNotification, ...notifications];

    await saveData("notifications", updated.reverse());
    setNotifications(updated);

    toast.success("Demo notification added");
  };

  const totalNotifications = notifications.length;

  const orderNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes("order")
  ).length;

  const billingNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes("bill")
  ).length;

  const inventoryNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes("inventory")
  ).length;

  const getNotificationIcon = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("order")) return "🍽️";
    if (msg.includes("bill")) return "💳";
    if (msg.includes("inventory")) return "📦";
    if (msg.includes("stock")) return "⚠️";
    return "🔔";
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Notification Center</h1>
          <p>
            Real-time food orders, billing alerts, inventory updates and system
            activities
          </p>
        </div>

        <div className="menu-actions">
          <button onClick={addDemoNotification}>
            + Demo Notification
          </button>

          <button onClick={clearAllNotifications}>
            Clear All
          </button>
        </div>
      </div>

      <div className="notification-stats">
        <div>
          <span>🔔</span>
          <h3>{totalNotifications}</h3>
          <p>Total Notifications</p>
        </div>

        <div>
          <span>🍽️</span>
          <h3>{orderNotifications}</h3>
          <p>Order Alerts</p>
        </div>

        <div>
          <span>💳</span>
          <h3>{billingNotifications}</h3>
          <p>Billing Alerts</p>
        </div>

        <div>
          <span>📦</span>
          <h3>{inventoryNotifications}</h3>
          <p>Inventory Alerts</p>
        </div>
      </div>

      <div className="notification-toolbar">
        <input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Orders</option>
          <option>Billing</option>
          <option>Inventory</option>
          <option>System</option>
        </select>
      </div>

      <div className="notification-list">
        {filteredNotifications.length === 0 ? (
          <div className="panel empty-box">
            <h3>No Notifications Found</h3>
            <p>System notifications will appear here.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              className="notification-card"
              key={notification.id}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.message)}
              </div>

              <div className="notification-content">
                <h3>{notification.message}</h3>
                <p>{notification.time}</p>
              </div>

              <button
                onClick={() =>
                  deleteNotification(notification.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;