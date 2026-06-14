const imageMap = {
  "Paneer Biryani":
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500",
  "Veg Biryani":
    "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=500",
  "Mushroom Curry":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  "Aloo Gobi":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
  "Palak Paneer":
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
  "Veg Fried Rice":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
  "Dal Tadka":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
  "Chana Masala":
    "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500",
  "Veg Noodles":
    "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500",
  "Kadai Paneer":
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",

  "Chicken Biryani":
    "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=500",
  "Mutton Biryani":
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500",
  "Fish Curry":
    "https://images.unsplash.com/photo-1626508035297-0cd1fba8f7c7?w=500",
  "Butter Chicken":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
  "Chicken Fry":
    "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
  "Prawn Curry":
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
  "Chicken 65":
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
  "Fish Fry":
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
  "Egg Curry":
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
  "Mutton Curry":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",

  Burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  Pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
  "French Fries":
    "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
  Samosa:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
  Sandwich:
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
  "Veg Roll":
    "https://images.unsplash.com/photo-1604908554027-765e5e7205c5?w=500",
  "Spring Roll":
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
  "Paneer Tikka":
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
  Puff:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
  Cutlet:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",

  "Ice Cream":
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
  "Chocolate Cake":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
  Brownie:
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
  "Gulab Jamun":
    "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=500",
  Rasmalai:
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500",
  Donut:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
  "Cup Cake":
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500",
  "Cheese Cake":
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
  Pastry:
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500",
  "Fruit Salad":
    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",

  "Red Wine":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
  "White Wine":
    "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=500",
  "Rose Wine":
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500",
  "Sparkling Wine":
    "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=500",
  Merlot:
    "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500",
  Cabernet:
    "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=500",
  "Pinot Noir":
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500",
  "Dessert Wine":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
  "Vintage Wine":
    "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=500",
  "Premium Wine":
    "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=500",

  "Coca Cola":
    "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=500",
  Pepsi:
    "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
  Sprite:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
  Fanta:
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500",
  "Mountain Dew":
    "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500",
  "Lemon Soda":
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500",
  "Orange Juice":
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  "Mango Juice":
    "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500",
  "Cold Coffee":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  "Milk Shake":
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500",
};

const vegItems = [
  "Paneer Biryani",
  "Veg Biryani",
  "Mushroom Curry",
  "Aloo Gobi",
  "Palak Paneer",
  "Veg Fried Rice",
  "Dal Tadka",
  "Chana Masala",
  "Veg Noodles",
  "Kadai Paneer",
];

const nonVegItems = [
  "Chicken Biryani",
  "Mutton Biryani",
  "Fish Curry",
  "Butter Chicken",
  "Chicken Fry",
  "Prawn Curry",
  "Chicken 65",
  "Fish Fry",
  "Egg Curry",
  "Mutton Curry",
];

const snackItems = [
  "Burger",
  "Pizza",
  "French Fries",
  "Samosa",
  "Sandwich",
  "Veg Roll",
  "Spring Roll",
  "Paneer Tikka",
  "Puff",
  "Cutlet",
];

const dessertItems = [
  "Ice Cream",
  "Chocolate Cake",
  "Brownie",
  "Gulab Jamun",
  "Rasmalai",
  "Donut",
  "Cup Cake",
  "Cheese Cake",
  "Pastry",
  "Fruit Salad",
];

const wineItems = [
  "Red Wine",
  "White Wine",
  "Rose Wine",
  "Sparkling Wine",
  "Merlot",
  "Cabernet",
  "Pinot Noir",
  "Dessert Wine",
  "Vintage Wine",
  "Premium Wine",
];

const softDrinkItems = [
  "Coca Cola",
  "Pepsi",
  "Sprite",
  "Fanta",
  "Mountain Dew",
  "Lemon Soda",
  "Orange Juice",
  "Mango Juice",
  "Cold Coffee",
  "Milk Shake",
];

function createItems(names, category, startId, count) {
  const data = [];

  for (let i = 1; i <= count; i++) {
    const baseName = names[(i - 1) % names.length];

    data.push({
      id: startId + i,
      name: `${baseName} ${i}`,
      category,
      price:
        category === "Wines"
          ? 500 + i
          : category === "Desserts"
          ? 150 + i
          : 80 + i,
      prepTime:
        category === "Soft Drinks"
          ? "5 mins"
          : category === "Desserts"
          ? "8 mins"
          : "15 mins",
      availability: true,
      image: imageMap[baseName],
    });
  }

  return data;
}

export const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "Admin",
    phone: "9876543210",
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
];

export const menuItems = [
  ...createItems(vegItems, "Veg", 1000, 100),
  ...createItems(nonVegItems, "Non-Veg", 2000, 100),
  ...createItems(snackItems, "Snacks", 3000, 100),
  ...createItems(dessertItems, "Desserts", 4000, 100),
  ...createItems(wineItems, "Wines", 5000, 100),
  ...createItems(softDrinkItems, "Soft Drinks", 6000, 100),
];

export const orders = [];
export const inventory = [];
export const bills = [];

export const notifications = [
  {
    id: 1,
    message: "Hotel Food Management System Initialized",
    time: new Date().toLocaleString(),
  },
];

export const initializeLocalStorage = () => {
  localStorage.setItem("menuItems", JSON.stringify(menuItems));

  if (!localStorage.getItem("systemUsers")) {
    localStorage.setItem("systemUsers", JSON.stringify(users));
  }

  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }

  if (!localStorage.getItem("bills")) {
    localStorage.setItem("bills", JSON.stringify(bills));
  }

  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }
};