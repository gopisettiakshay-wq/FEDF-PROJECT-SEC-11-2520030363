function OrderTable({ orders, onStatusChange, onDelete }) {
  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-orange-100 text-orange-700";
    if (status === "Preparing") return "bg-blue-100 text-blue-700";
    if (status === "Ready") return "bg-purple-100 text-purple-700";
    if (status === "Served") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer / Table</th>
              <th className="px-4 py-3">Food Item</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Instructions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Update</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No food orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-800">
                    #{order.id}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {order.customer}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {order.foodName}
                  </td>

                  <td className="px-4 py-3">
                    {order.quantity}
                  </td>

                  <td className="px-4 py-3 font-bold">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {order.instructions || "No instructions"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                    >
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>Ready</option>
                      <option>Served</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onDelete(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;