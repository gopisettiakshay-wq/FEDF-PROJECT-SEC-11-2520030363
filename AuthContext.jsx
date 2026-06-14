import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ADMIN_USER = {
  id: 1,
  name: "Admin User",
  email: "admin@gmail.com",
  password: "admin123",
  role: "Admin",
  phone: "+91 9876543210",
  profileImage:
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem("hotelUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.setItem(
        "systemUsers",
        JSON.stringify([ADMIN_USER])
      );
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const users =
        JSON.parse(localStorage.getItem("systemUsers")) || [];

      const foundUser = users.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

      if (!foundUser) {
        toast.error("Invalid Email or Password");
        return false;
      }

      localStorage.setItem(
        "hotelUser",
        JSON.stringify(foundUser)
      );

      setUser(foundUser);

      toast.success("Login Successful");

      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("hotelUser");
    setUser(null);
    toast.success("Logged Out");
  };

  // Update Profile
  const updateProfile = (updatedData) => {
    const users =
      JSON.parse(localStorage.getItem("systemUsers")) || [];

    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? { ...u, ...updatedData }
        : u
    );

    localStorage.setItem(
      "systemUsers",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    localStorage.setItem(
      "hotelUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    toast.success("Profile Updated");
  };

  // Add User (Admin Panel)
  const addUser = (newUser) => {
    const users =
      JSON.parse(localStorage.getItem("systemUsers")) || [];

    const userData = {
      ...newUser,
      id: Date.now(),
    };

    const updatedUsers = [...users, userData];

    localStorage.setItem(
      "systemUsers",
      JSON.stringify(updatedUsers)
    );

    toast.success("User Added");
  };

  // Delete User
  const deleteUser = (id) => {
    const users =
      JSON.parse(localStorage.getItem("systemUsers")) || [];

    const updatedUsers = users.filter(
      (u) => u.id !== id
    );

    localStorage.setItem(
      "systemUsers",
      JSON.stringify(updatedUsers)
    );

    toast.success("User Deleted");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    addUser,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;