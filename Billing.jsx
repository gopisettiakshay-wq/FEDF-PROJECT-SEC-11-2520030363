import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

function Billing() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadBilling();
  }, []);

  const loadBilling = async () => {
    setOrders(await getData("orders"));
    setBills(await getData("bills"));
  };

  const servedOrders = orders.filter((order) => order.status === "Served");

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const matchSearch =
        String(bill.id).includes(search) ||
        String(bill.orderId).includes(search) ||
        String(bill.customer || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(bill.foodName || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchFilter =
        filter === "All" || bill.paymentStatus === filter;

      return matchSearch && matchFilter;
    });
  }, [bills, search, filter]);

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const paidBills = bills.filter((bill) => bill.paymentStatus === "Paid").length;
  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === "Pending"
  ).length;

  const generateBill = async (order) => {
    const alreadyExists = bills.find((bill) => bill.orderId === order.id);

    if (alreadyExists) {
      toast.error("Bill already generated for this order");
      return;
    }

    const subtotal = Number(order.totalPrice || 0);
    const tax = Math.round(subtotal * 0.05);
    const serviceCharge = Math.round(subtotal * 0.03);
    const total = subtotal + tax + serviceCharge;

    const now = new Date();

    const newBill = {
      id: Date.now(),
      orderId: order.id,
      customer: order.customer || "Customer",
      foodName: order.foodName || "Food Order",
      subtotal,
      tax,
      serviceCharge,
      total,
      paymentStatus: "Pending",
      date: now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-IN"),
    };

    const updatedBills = [newBill, ...bills];

    await saveData("bills", updatedBills);
    await addNotification(`Bill generated for Order #${order.id}`);

    setBills(updatedBills);
    toast.success("Bill generated successfully");
  };

  const markPaid = async (id) => {
    const updatedBills = bills.map((bill) =>
      bill.id === id ? { ...bill, paymentStatus: "Paid" } : bill
    );

    await saveData("bills", updatedBills);
    await addNotification(`Payment completed for Bill #${id}`);

    setBills(updatedBills);
    toast.success("Payment marked as paid");
  };

  const deleteBill = async (id) => {
    if (!window.confirm("Delete this bill?")) return;

    const updatedBills = bills.filter((bill) => bill.id !== id);

    await saveData("bills", updatedBills);
    setBills(updatedBills);

    toast.success("Bill deleted");
  };

  const printBill = (bill) => {
    const content = `
HOTEL FOOD MANAGEMENT SYSTEM
----------------------------------------

Bill ID        : ${bill.id}
Order ID       : ${bill.orderId}
Customer       : ${bill.customer || "Customer"}

Food Item      : ${bill.foodName || "Food Order"}

Subtotal       : ₹${bill.subtotal || 0}
GST (5%)       : ₹${bill.tax || 0}
Service Charge : ₹${bill.serviceCharge || 0}

----------------------------------------
TOTAL AMOUNT   : ₹${bill.total || 0}
----------------------------------------

Payment Status : ${bill.paymentStatus || "Pending"}

Date           : ${bill.date || "Not Available"}
Time           : ${bill.time || "Not Available"}

----------------------------------------
Thank you for dining with us!
Visit Again
----------------------------------------
`;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Hotel Bill Receipt</title>
          <style>
            body {
              font-family: monospace;
              background: #f8fafc;
              padding: 30px;
              color: #111827;
            }

            .receipt {
              max-width: 520px;
              margin: auto;
              background: white;
              padding: 25px;
              border-radius: 14px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            }

            pre {
              white-space: pre-wrap;
              font-size: 16px;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <pre>${content}</pre>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const exportBills = () => {
    const data = bills
      .map(
        (bill) =>
          `Bill:${bill.id}, Order:${bill.orderId}, Customer:${bill.customer}, Food:${bill.foodName}, Total:${bill.total}, Status:${bill.paymentStatus}, Date:${bill.date}, Time:${bill.time}`
      )
      .join("\n");

    const blob = new Blob([data], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "billing-report.txt";
    a.click();

    URL.revokeObjectURL(url);

    toast.success("Billing report exported");
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Billing System</h1>
          <p>
            Generate bills, calculate GST, service charge and payment status
          </p>
        </div>

        <button onClick={exportBills}>Export Bills</button>
      </div>

      <div className="billing-stats">
        <div>
          <span>💰</span>
          <h3>₹{totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>

        <div>
          <span>🧾</span>
          <h3>{bills.length}</h3>
          <p>Total Bills</p>
        </div>

        <div>
          <span>✅</span>
          <h3>{paidBills}</h3>
          <p>Paid Bills</p>
        </div>

        <div>
          <span>⏳</span>
          <h3>{pendingBills}</h3>
          <p>Pending Bills</p>
        </div>
      </div>

      <div className="panel billing-section">
        <h2>Served Orders Ready for Billing</h2>

        <div className="billing-order-grid">
          {servedOrders.length === 0 ? (
            <div className="empty-box">
              <h3>No served orders</h3>
              <p>Only served orders can be billed.</p>
            </div>
          ) : (
            servedOrders.map((order) => (
              <div className="billing-order-card" key={order.id}>
                <h3>Order #{order.id}</h3>
                <p>{order.customer}</p>
                <b>{order.foodName}</b>
                <h2>₹{order.totalPrice}</h2>

                <button onClick={() => generateBill(order)}>
                  Generate Bill
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="billing-toolbar">
        <input
          placeholder="Search by bill id, order id, food or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="billing-grid">
        {filteredBills.length === 0 ? (
          <div className="panel empty-box">
            <h3>No billing records found</h3>
            <p>Generate bills after orders are served.</p>
          </div>
        ) : (
          filteredBills.map((bill) => (
            <div className="bill-card" key={bill.id}>
              <div className="bill-head">
                <div>
                  <h3>Bill #{bill.id}</h3>
                  <p>Order #{bill.orderId}</p>
                </div>

                <span
                  className={
                    bill.paymentStatus === "Paid"
                      ? "status-served"
                      : "status-pending"
                  }
                >
                  {bill.paymentStatus}
                </span>
              </div>

              <h2>{bill.customer || "Customer"}</h2>
              <p>{bill.foodName || "Food Order"}</p>

              <div className="bill-breakdown">
                <span>Subtotal</span>
                <b>₹{bill.subtotal || 0}</b>

                <span>GST 5%</span>
                <b>₹{bill.tax || 0}</b>

                <span>Service Charge</span>
                <b>₹{bill.serviceCharge || 0}</b>

                <span>Total</span>
                <b>₹{bill.total || 0}</b>

                <span>Date</span>
                <b>{bill.date || "Not Available"}</b>

                <span>Time</span>
                <b>{bill.time || "Not Available"}</b>
              </div>

              <div className="bill-actions">
                {bill.paymentStatus !== "Paid" && (
                  <button onClick={() => markPaid(bill.id)}>Mark Paid</button>
                )}

                <button onClick={() => printBill(bill)}>Print</button>

                <button onClick={() => deleteBill(bill.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Billing;