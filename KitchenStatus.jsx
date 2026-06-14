import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

function KitchenStatus() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Active");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getData("orders");
    setOrders(data);
  };

  const kitchenOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filter === "Active") {
        return ["Pending", "Preparing", "Ready"].includes(order.status);
      }

      return order.status === filter;
    });
  }, [orders, filter]);

  const pending = orders.filter((o) => o.status === "Pending").length;
  const preparing = orders.filter((o) => o.status === "Preparing").length;
  const ready = orders.filter((o) => o.status === "Ready").length;
  const served = orders.filter((o) => o.status === "Served").length;

  const updateStatus = async (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    await saveData("orders", updatedOrders);
    await addNotification(`Kitchen updated Order #${id} to ${status}`);

    setOrders(updatedOrders);
    toast.success(`Order marked as ${status}`);
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "status-pending";
    if (status === "Preparing") return "status-preparing";
    if (status === "Ready") return "status-ready";
    if (status === "Served") return "status-served";
    return "status-cancelled";
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Kitchen Status</h1>
          <p>Live kitchen queue for pending, preparing and ready orders</p>
        </div>
      </div>

      <div className="kitchen-stats">
        <div>
          <span>⏳</span>
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div>
          <span>👨‍🍳</span>
          <h3>{preparing}</h3>
          <p>Preparing</p>
        </div>

        <div>
          <span>🔔</span>
          <h3>{ready}</h3>
          <p>Ready</p>
        </div>

        <div>
          <span>✅</span>
          <h3>{served}</h3>
          <p>Served</p>
        </div>
      </div>

      <div className="kitchen-filter">
        {["Active", "Pending", "Preparing", "Ready", "Served"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="kitchen-board">
        {kitchenOrders.length === 0 ? (
          <div className="panel empty-box">
            <h3>No kitchen orders</h3>
            <p>Orders will appear here when customers place food orders.</p>
          </div>
        ) : (
          kitchenOrders.map((order) => (
            <div className="kitchen-card" key={order.id}>
              <div className="kitchen-card-head">
                <div>
                  <h3>#{order.id}</h3>
                  <p>{order.customer}</p>
                </div>

                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>

              <h2>{order.foodName}</h2>

              <div className="kitchen-meta">
                <p>Quantity</p>
                <b>{order.quantity}</b>
              </div>

              <div className="kitchen-note">
                <p>Special Instructions</p>
                <b>{order.instructions || "No instructions"}</b>
              </div>

              <div className="kitchen-progress">
                <div
                  className={
                    order.status === "Pending" ||
                    order.status === "Preparing" ||
                    order.status === "Ready" ||
                    order.status === "Served"
                      ? "done"
                      : ""
                  }
                >
                  1
                </div>

                <span></span>

                <div
                  className={
                    order.status === "Preparing" ||
                    order.status === "Ready" ||
                    order.status === "Served"
                      ? "done"
                      : ""
                  }
                >
                  2
                </div>

                <span></span>

                <div
                  className={
                    order.status === "Ready" || order.status === "Served"
                      ? "done"
                      : ""
                  }
                >
                  3
                </div>

                <span></span>

                <div className={order.status === "Served" ? "done" : ""}>
                  4
                </div>
              </div>

              <div className="kitchen-labels">
                <small>Pending</small>
                <small>Preparing</small>
                <small>Ready</small>
                <small>Served</small>
              </div>

              <div className="kitchen-actions">
                <button onClick={() => updateStatus(order.id, "Preparing")}>
                  Start Preparing
                </button>

                <button onClick={() => updateStatus(order.id, "Ready")}>
                  Mark Ready
                </button>

                <button onClick={() => updateStatus(order.id, "Served")}>
                  Served
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default KitchenStatus;