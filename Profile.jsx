import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getData } from "../api/api";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    phone: user?.phone || "",
    profileImage: user?.profileImage || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setOrders(await getData("orders"));
    setBills(await getData("bills"));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateBasicProfile = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role) {
      toast.error("Name, email and role are required");
      return;
    }

    updateProfile({
      name: form.name,
      email: form.email,
      role: form.role,
      phone: form.phone,
      profileImage: form.profileImage,
    });

    toast.success("Profile updated successfully");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (form.oldPassword !== user.password) {
      toast.error("Old password is incorrect");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    updateProfile({
      password: form.newPassword,
    });

    setForm({
      ...form,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast.success("Password changed successfully");
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Profile</h1>
          <p>Manage account details, security and activity summary</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-cover"></div>

          <img
            src={
              form.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="profile-avatar"
          />

          <h2>{form.name}</h2>
          <p>{form.email}</p>

          <span className="profile-role">{form.role}</span>

          <div className="profile-stats">
            <div>
              <h3>{orders.length}</h3>
              <p>Orders</p>
            </div>

            <div>
              <h3>{bills.length}</h3>
              <p>Bills</p>
            </div>

            <div>
              <h3>₹{totalRevenue}</h3>
              <p>Revenue</p>
            </div>
          </div>
        </div>

        <div className="profile-panel">
          <h2>Edit Profile</h2>

          <form className="profile-form" onSubmit={updateBasicProfile}>
            <div>
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Kitchen Staff</option>
                <option>Cashier</option>
              </select>
            </div>

            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-full">
              <label>Profile Image URL</label>
              <input
                name="profileImage"
                value={form.profileImage}
                onChange={handleChange}
                placeholder="Paste image URL"
              />
            </div>

            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>

      <div className="security-panel">
        <h2>Account Security</h2>

        <form className="security-form" onSubmit={changePassword}>
          <div>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;