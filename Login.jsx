import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });

  if (user) return <Navigate to="/dashboard" replace />;

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("systemUsers")) || [];

    const exists = users.find((u) => u.email === formData.email);

    if (exists) {
      toast.error("Email already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: "",
      profileImage:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    localStorage.setItem("systemUsers", JSON.stringify([...users, newUser]));

    toast.success("Registration successful. Please sign in.");

    setIsRegister(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
    });
  };

  const signInUser = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    const success = await login(formData.email, formData.password);

    if (success) {
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      registerUser();
    } else {
      signInUser();
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Hotel Food Management</h1>
        <p>
          Manage food menu, orders, kitchen status, billing, inventory and
          analytics in one modern dashboard.
        </p>

        <div className="login-features">
          <span>🍽️ Menu Management</span>
          <span>🧾 Order Tracking</span>
          <span>💳 Billing System</span>
          <span>📊 Reports</span>
        </div>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-icon">🍴</div>

        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p>{isRegister ? "Register new user" : "Sign in to continue"}</p>

        {isRegister && (
          <>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </>
        )}

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        {isRegister && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Kitchen Staff</option>
              <option>Cashier</option>
            </select>
          </>
        )}

        <button type="submit">
          {isRegister ? "Register" : "Sign In"}
        </button>

        <div className="auth-switch">
          {isRegister ? "Already have an account?" : "New user?"}

          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Sign In" : " Register"}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;