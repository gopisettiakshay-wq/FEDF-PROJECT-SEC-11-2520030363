import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

const emptyItem = {
  itemName: "",
  category: "",
  quantity: "",
  unit: "Kg",
  supplier: "",
  lastUpdated: new Date().toISOString().split("T")[0],
};

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyItem);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const data = await getData("inventory");
    setInventory(data);
  };

  const totalItems = inventory.length;
  const lowStock = inventory.filter((i) => Number(i.quantity) <= 10).length;
  const totalStock = inventory.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchSearch =
        item.itemName.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ||
        (filter === "Low Stock" && Number(item.quantity) <= 10) ||
        (filter === "In Stock" && Number(item.quantity) > 10);

      return matchSearch && matchFilter;
    });
  }, [inventory, search, filter]);

  const openAddForm = () => {
    setEditingItem(null);
    setForm(emptyItem);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.itemName ||
      !form.category ||
      !form.quantity ||
      !form.unit ||
      !form.supplier
    ) {
      toast.error("Please fill all fields");
      return;
    }

    let updatedInventory;

    if (editingItem) {
      updatedInventory = inventory.map((item) =>
        item.id === editingItem.id
          ? {
              ...form,
              id: editingItem.id,
              quantity: Number(form.quantity),
            }
          : item
      );

      toast.success("Inventory item updated");
      await addNotification(`${form.itemName} inventory updated`);
    } else {
      const newItem = {
        ...form,
        id: Date.now(),
        quantity: Number(form.quantity),
      };

      updatedInventory = [newItem, ...inventory];

      toast.success("Inventory item added");
      await addNotification(`${form.itemName} added to inventory`);
    }

    await saveData("inventory", updatedInventory);
    setInventory(updatedInventory);
    setShowForm(false);
    setForm(emptyItem);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this inventory item?")) return;

    const updatedInventory = inventory.filter((item) => item.id !== id);

    await saveData("inventory", updatedInventory);
    setInventory(updatedInventory);
    toast.success("Inventory item deleted");
  };

  const exportInventory = () => {
    const text = inventory
      .map(
        (i) =>
          `${i.itemName}, ${i.category}, ${i.quantity} ${i.unit}, ${i.supplier}, ${i.lastUpdated}`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory-report.txt";
    a.click();

    toast.success("Inventory exported");
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Inventory Management</h1>
          <p>Track stock, suppliers, low-stock alerts and material updates</p>
        </div>

        <div className="menu-actions">
          <button onClick={exportInventory}>Export</button>
          <button onClick={openAddForm}>+ Add Inventory</button>
        </div>
      </div>

      <div className="inventory-stats">
        <div>
          <span>📦</span>
          <h3>{totalItems}</h3>
          <p>Total Items</p>
        </div>

        <div>
          <span>⚠️</span>
          <h3>{lowStock}</h3>
          <p>Low Stock Items</p>
        </div>

        <div>
          <span>📊</span>
          <h3>{totalStock}</h3>
          <p>Total Stock Quantity</p>
        </div>
      </div>

      {showForm && (
        <form className="panel inventory-form" onSubmit={handleSubmit}>
          <input
            placeholder="Item Name"
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <select
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            <option>Kg</option>
            <option>Litres</option>
            <option>Packets</option>
            <option>Pieces</option>
            <option>Bottles</option>
          </select>

          <input
            placeholder="Supplier"
            value={form.supplier}
            onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          />

          <input
            type="date"
            value={form.lastUpdated}
            onChange={(e) => setForm({ ...form, lastUpdated: e.target.value })}
          />

          <button type="submit">
            {editingItem ? "Update Item" : "Save Item"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="inventory-toolbar">
        <input
          placeholder="Search item, category or supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
        </select>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Last Updated</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="7">No inventory items found</td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>{item.supplier}</td>
                  <td>{item.lastUpdated}</td>
                  <td>
                    <span
                      className={
                        Number(item.quantity) <= 10
                          ? "unavailable"
                          : "available"
                      }
                    >
                      {Number(item.quantity) <= 10 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => openEditForm(item)}>Edit</button>
                      <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
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

export default Inventory;