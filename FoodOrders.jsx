import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

const emptyOrder = {
  customer: "",
  foodName: "",
  quantity: 1,
  instructions: "",
  status: "Pending",
};

const statuses = ["All", "Pending", "Preparing", "Ready", "Served", "Cancelled"];

function FoodOrders() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState(emptyOrder);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setOrders(await getData("orders"));
    setMenuItems(await getData("menuItems"));
  };

  const selectedFood = menuItems.find((item) => item.name === form.foodName);
  const totalPrice = selectedFood
    ? Number(selectedFood.price) * Number(form.quantity || 1)
    : 0;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.foodName.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0
  );

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const readyOrders = orders.filter((o) => o.status === "Ready").length;
  const servedOrders = orders.filter((o) => o.status === "Served").length;

  const addOrder = async (e) => {
    e.preventDefault();

    if (!form.customer || !form.foodName || !form.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      ...form,
      quantity: Number(form.quantity),
      totalPrice,
      createdAt: new Date().toLocaleString(),
    };

    const updatedOrders = [newOrder, ...orders];

    await saveData("orders", updatedOrders);
    await addNotification(`New order placed for ${form.foodName}`);

    setOrders(updatedOrders);
    setForm(emptyOrder);
    setShowForm(false);

    toast.success("Food order added successfully");
  };

  const updateStatus = async (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    await saveData("orders", updatedOrders);
    await addNotification(`Order #${id} updated to ${status}`);

    setOrders(updatedOrders);
    toast.success("Order status updated");
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    const updatedOrders = orders.filter((order) => order.id !== id);

    await saveData("orders", updatedOrders);
    setOrders(updatedOrders);

    toast.success("Order deleted");
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "status-pending";
    if (status === "Preparing") return "status-preparing";
    if (status === "Ready") return "status-ready";
    if (status === "Served") return "status-served";
    if (status === "Cancelled") return "status-cancelled";
    return "";
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Food Orders</h1>
          <p>Create, track and update customer food orders</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Order"}
        </button>
      </div>

      <div className="order-stats">
        <div>
          <span>🧾</span>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div>
          <span>⏳</span>
          <h3>{pendingOrders}</h3>
          <p>Pending Orders</p>
        </div>

        <div>
          <span>🔔</span>
          <h3>{readyOrders}</h3>
          <p>Ready Orders</p>
        </div>

        <div>
          <span>💰</span>
          <h3>₹{totalRevenue}</h3>
          <p>Total Order Value</p>
        </div>
      </div>

      {showForm && (
        <form className="panel order-form" onSubmit={addOrder}>
          <input
            placeholder="Customer / Table Number"
            value={form.customer}
            onChange={(e) =>
              setForm({ ...form, customer: e.target.value })
            }
          />

          <select
            value={form.foodName}
            onChange={(e) =>
              setForm({ ...form, foodName: e.target.value })
            }
          >
            <option value="">Select Food Item</option>
            {menuItems
              .filter((item) => item.availability)
              .map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} - ₹{item.price}
                </option>
              ))}
          </select>

          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <input
            placeholder="Special Instructions"
            value={form.instructions}
            onChange={(e) =>
              setForm({ ...form, instructions: e.target.value })
            }
          />

          <div className="order-total">₹{totalPrice}</div>

          <button type="submit">Save Order</button>
        </form>
      )}

      <div className="order-toolbar">
        <input
          placeholder="Search order by table, food or order id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="orders-grid">
        {filteredOrders.length === 0 ? (
          <div className="panel empty-box">
            <h3>No orders found</h3>
            <p>Add food orders to display order cards here.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-head">
                <div>
                  <h3>#{order.id}</h3>
                  <p>{order.customer}</p>
                </div>

                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>

              <h2>{order.foodName}</h2>

              <div className="order-meta">
                <p>Qty: {order.quantity}</p>
                <p>Total: ₹{order.totalPrice}</p>
              </div>

              <p className="order-note">
                {order.instructions || "No special instructions"}
              </p>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Served</option>
                <option>Cancelled</option>
              </select>

              <button onClick={() => deleteOrder(order.id)}>
                Delete Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoodOrders;