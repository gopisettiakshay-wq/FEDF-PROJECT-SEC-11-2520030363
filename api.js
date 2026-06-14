import axios from "axios";

const API_URL = "http://localhost:3001";

/* =========================
   BASIC CRUD
========================= */

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} Error:`, error);
    return [];
  }
};

export const getSingleData = async (endpoint, id) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`GET SINGLE ${endpoint} Error:`, error);
    return null;
  }
};

export const addData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`ADD ${endpoint} Error:`, error);
    return null;
  }
};

export const updateData = async (endpoint, id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`UPDATE ${endpoint} Error:`, error);
    return null;
  }
};

export const patchData = async (endpoint, id, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`PATCH ${endpoint} Error:`, error);
    return null;
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    await axios.delete(`${API_URL}/${endpoint}/${id}`);
    return true;
  } catch (error) {
    console.error(`DELETE ${endpoint} Error:`, error);
    return false;
  }
};

/* =========================
   COMPATIBILITY FUNCTIONS
========================= */

export const saveData = async (endpoint, data) => {
  try {
    const oldData = await getData(endpoint);

    for (const item of oldData) {
      if (item.id) {
        await deleteData(endpoint, item.id);
      }
    }

    for (const item of data) {
      await addData(endpoint, item);
    }

    return true;
  } catch (error) {
    console.error(`SAVE ${endpoint} Error:`, error);
    return false;
  }
};

export const clearData = async (endpoint) => {
  try {
    const oldData = await getData(endpoint);

    for (const item of oldData) {
      if (item.id) {
        await deleteData(endpoint, item.id);
      }
    }

    return true;
  } catch (error) {
    console.error(`CLEAR ${endpoint} Error:`, error);
    return false;
  }
};

/* =========================
   AUTH FUNCTIONS
========================= */

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(
      `${API_URL}/users?email=${email}&password=${password}`
    );

    return response.data[0] || null;
  } catch (error) {
    console.error("LOGIN Error:", error);
    return null;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(
      `${API_URL}/users`,
      user
    );

    return response.data;
  } catch (error) {
    console.error("REGISTER Error:", error);
    return null;
  }
};

/* =========================
   NOTIFICATIONS
========================= */

export const addNotification = async (message) => {
  try {
    await axios.post(`${API_URL}/notifications`, {
      id: Date.now(),
      message,
      time: new Date().toLocaleString("en-IN"),
    });

    return true;
  } catch (error) {
    console.error("Notification Error:", error);
    return false;
  }
};

export const getNotifications = async () => {
  return await getData("notifications");
};

export const deleteNotification = async (id) => {
  return await deleteData("notifications", id);
};

/* =========================
   USERS
========================= */

export const getUsers = async () => {
  return await getData("users");
};

export const addUser = async (user) => {
  return await addData("users", user);
};

export const updateUser = async (id, user) => {
  return await updateData("users", id, user);
};

export const removeUser = async (id) => {
  return await deleteData("users", id);
};

/* =========================
   MENU ITEMS
========================= */

export const getMenuItems = async () => {
  return await getData("menuItems");
};

export const addMenuItem = async (item) => {
  return await addData("menuItems", item);
};

export const updateMenuItem = async (id, item) => {
  return await updateData("menuItems", id, item);
};

export const removeMenuItem = async (id) => {
  return await deleteData("menuItems", id);
};

/* =========================
   ORDERS
========================= */

export const getOrders = async () => {
  return await getData("orders");
};

export const addOrder = async (order) => {
  return await addData("orders", order);
};

export const updateOrder = async (id, order) => {
  return await updateData("orders", id, order);
};

export const removeOrder = async (id) => {
  return await deleteData("orders", id);
};

/* =========================
   INVENTORY
========================= */

export const getInventory = async () => {
  return await getData("inventory");
};

export const addInventory = async (item) => {
  return await addData("inventory", item);
};

export const updateInventory = async (id, item) => {
  return await updateData("inventory", id, item);
};

export const removeInventory = async (id) => {
  return await deleteData("inventory", id);
};

/* =========================
   BILLS
========================= */

export const getBills = async () => {
  return await getData("bills");
};

export const addBill = async (bill) => {
  return await addData("bills", bill);
};

export const updateBill = async (id, bill) => {
  return await updateData("bills", id, bill);
};

export const removeBill = async (id) => {
  return await deleteData("bills", id);
};