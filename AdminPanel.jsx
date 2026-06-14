import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

const emptyUser = {
  name: "",
  email: "",
  password: "",
  role: "Manager",
  phone: "",
  profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
};

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyUser);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setUsers(await getData("systemUsers"));
    setMenuItems(await getData("menuItems"));
    setOrders(await getData("orders"));
    setBills(await getData("bills"));
    setInventory(await getData("inventory"));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "All" || user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const openAddUser = () => {
    setEditingUser(null);
    setForm(emptyUser);
    setShowForm(true);
  };

  const openEditUser = (user) => {
    setEditingUser(user);
    setForm(user);
    setShowForm(true);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error("Please fill name, email, password and role");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be minimum 6 characters");
      return;
    }

    const emailExists = users.find(
      (user) =>
        user.email === form.email &&
        (!editingUser || user.id !== editingUser.id)
    );

    if (emailExists) {
      toast.error("Email already exists");
      return;
    }

    let updatedUsers;

    if (editingUser) {
      updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? { ...form, id: editingUser.id }
          : user
      );

      toast.success("User updated successfully");
      await addNotification(`${form.name} user updated by admin`);
    } else {
      const newUser = {
        ...form,
        id: Date.now(),
      };

      updatedUsers = [newUser, ...users];

      toast.success("User added successfully");
      await addNotification(`${form.name} added as ${form.role}`);
    }

    await saveData("systemUsers", updatedUsers);
    setUsers(updatedUsers);
    setShowForm(false);
    setForm(emptyUser);
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    if (users.length === 1) {
      toast.error("At least one admin user must remain");
      return;
    }

    if (!window.confirm("Delete this user?")) return;

    const updatedUsers = users.filter((user) => user.id !== id);

    await saveData("systemUsers", updatedUsers);
    setUsers(updatedUsers);

    toast.success("User deleted");
    await addNotification("System user deleted by admin");
  };

  const resetDatabase = async () => {
    if (!window.confirm("This will clear orders, bills and notifications. Continue?")) {
      return;
    }

    await saveData("orders", []);
    await saveData("bills", []);
    await saveData("notifications", []);

    setOrders([]);
    setBills([]);

    toast.success("Operational database reset");
  };

  const exportUsers = () => {
    const text = users
      .map(
        (u) =>
          `${u.name}, ${u.email}, ${u.role}, ${u.phone || "No phone"}`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "system-users.txt";
    a.click();

    toast.success("Users exported");
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Admin Panel</h1>
          <p>User management, role control, database settings and analytics</p>
        </div>

        <div className="menu-actions">
          <button onClick={exportUsers}>Export Users</button>
          <button onClick={openAddUser}>+ Add User</button>
        </div>
      </div>

      <div className="admin-stats">
        <div>
          <span>👥</span>
          <h3>{users.length}</h3>
          <p>System Users</p>
        </div>

        <div>
          <span>🍽️</span>
          <h3>{menuItems.length}</h3>
          <p>Menu Items</p>
        </div>

        <div>
          <span>🧾</span>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div>
          <span>💰</span>
          <h3>₹{totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>

        <div>
          <span>📦</span>
          <h3>{inventory.length}</h3>
          <p>Inventory Items</p>
        </div>
      </div>

      {showForm && (
        <form className="panel admin-form" onSubmit={saveUser}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Kitchen Staff</option>
            <option>Cashier</option>
          </select>

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="Profile Image URL"
            value={form.profileImage}
            onChange={(e) =>
              setForm({ ...form, profileImage: e.target.value })
            }
          />

          <button type="submit">
            {editingUser ? "Update User" : "Save User"}
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

      <div className="admin-toolbar">
        <input
          placeholder="Search user by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>Kitchen Staff</option>
          <option>Cashier</option>
        </select>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="admin-avatar"
                    />
                  </td>

                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className="admin-role">{user.role}</span>
                  </td>

                  <td>{user.phone || "Not added"}</td>

                  <td>
                    <div className="table-actions">
                      <button onClick={() => openEditUser(user)}>
                        Edit
                      </button>

                      <button onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-settings">
        <div>
          <h2>System Settings</h2>
          <p>
            LocalStorage is used as the database. All menu, order, billing,
            inventory, notification and user data persists after refresh.
          </p>

          <button onClick={resetDatabase}>
            Reset Orders & Bills
          </button>
        </div>

        <div>
          <h2>Role Access Overview</h2>

          <ul>
            <li>Admin: Full control over system and users</li>
            <li>Manager: Manage food orders, reports and inventory</li>
            <li>Kitchen Staff: Update kitchen order workflow</li>
            <li>Cashier: Generate bills and mark payments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;