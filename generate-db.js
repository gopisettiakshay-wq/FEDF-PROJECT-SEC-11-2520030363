import fs from "fs";

const images = {
  Veg: [
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=500",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
  ],
  "Non-Veg": [
    "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=500",
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500",
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
    "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=500"
  ],
  Snacks: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
    "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=500"
  ],
  Desserts: [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500"
  ],
  "Soft Drinks": [
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
    "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=500",
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500"
  ],
  Wines: [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
    "https://images.unsplash.com/photo-1558001373-7b93ee48ffa4?w=500",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500",
    "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=500"
  ]
};

const names = {
  Veg: [
    "Paneer Butter Masala","Palak Paneer","Kadai Paneer","Veg Biryani","Veg Fried Rice",
    "Dal Tadka","Chana Masala","Aloo Gobi","Mushroom Curry","Mix Veg Curry",
    "Jeera Rice","Rajma Curry","Malai Kofta","Veg Manchurian","Veg Noodles",
    "Masala Dosa","Plain Dosa","Onion Dosa","Rava Dosa","Idli Sambar",
    "Medu Vada","Pongal","Curd Rice","Tomato Rice","Lemon Rice",
    "Vegetable Pulao","Paneer Biryani","Methi Chaman","Capsicum Masala","Paneer Tikka Masala",
    "Baby Corn Masala","Gobi Manchurian","Veg Spring Roll","Paneer Fried Rice","Mushroom Fried Rice",
    "Veg Schezwan Rice","Vegetable Curry","Aloo Mutter","Bhindi Fry","Stuffed Capsicum",
    "Paneer Bhurji","Vegetable Korma","Spinach Corn Curry","Paneer Lababdar","Veg Kofta Curry",
    "Butter Naan Combo","Garlic Naan Combo","Paneer Kulcha","Veg Thali","Paneer Do Pyaza",
    "Paneer Makhani","Matar Paneer","Corn Masala","Veg Jalfrezi","Veg Kolhapuri",
    "Vegetable Stew","Paneer Handi","Mushroom Masala","Veg Hyderabadi","Spinach Curry",
    "Veg Kurma","Paneer Chettinad","Veg Keema","Aloo Paratha","Gobi Paratha",
    "Paneer Paratha","Vegetable Sandwich","Paneer Sandwich","Cheese Sandwich","Veg Club Sandwich",
    "Paneer Wrap","Veg Roll","Paneer Roll","Veg Burger","Paneer Burger",
    "Cheese Burger","Veg Pizza","Paneer Pizza","Margherita Pizza","Cheese Pizza",
    "Vegetable Pasta","White Sauce Pasta","Red Sauce Pasta","Macaroni Pasta","Veg Momos",
    "Paneer Momos","Fried Momos","Veg Nachos","Cheese Nachos","Veg Salad",
    "Greek Salad","Fruit Salad","Paneer Salad","South Indian Thali","North Indian Thali",
    "Special Veg Meal","Royal Veg Platter","Vegetable Lasagna","Corn Cheese Pizza","Paneer Sizzler"
  ],

  "Non-Veg": [
    "Chicken Biryani","Mutton Biryani","Butter Chicken","Chicken 65","Fish Fry",
    "Fish Curry","Chicken Tikka","Tandoori Chicken","Prawn Curry","Egg Curry",
    "Chicken Shawarma","Chicken Kebab","Seekh Kebab","Mutton Curry","Mutton Rogan Josh",
    "Prawn Fry","Crab Masala","Grilled Chicken","Chicken Fried Rice","Chicken Noodles",
    "Chicken Manchurian","Egg Fried Rice","Egg Noodles","Chicken Dum Biryani","Hyderabadi Chicken Biryani",
    "Boneless Chicken Curry","Chicken Masala","Chicken Korma","Chicken Chettinad","Chicken Pepper Fry",
    "Chicken Roast","Chicken Wings","Spicy Chicken Wings","BBQ Chicken","Chicken Steak",
    "Mutton Fry","Mutton Keema","Mutton Kebab","Mutton Soup","Fish Biryani",
    "Fish Tikka","Grilled Fish","Fish Finger","Prawn Biryani","Prawn Masala",
    "Garlic Prawns","Crab Fry","Seafood Platter","Chicken Hakka Noodles","Chicken Triple Rice",
    "Chicken Chilli","Chicken Dragon","Chicken Hot Garlic","Egg Biryani","Egg Masala",
    "Boiled Egg Curry","Egg Roast","Egg Pepper Fry","Chicken Combo Meal","Mutton Combo Meal",
    "Seafood Combo Meal","Chicken Wrap","Chicken Roll","Chicken Burger","Chicken Cheese Burger",
    "Chicken Pizza","BBQ Chicken Pizza","Chicken Pasta","Chicken Alfredo Pasta","Chicken Caesar Salad",
    "Tuna Salad","Chicken Platter","Royal Non-Veg Platter","Chicken Tandoori Full","Chicken Tandoori Half",
    "Chicken Reshmi Kebab","Chicken Malai Tikka","Chicken Achari","Chicken Kolhapuri","Chicken Handi",
    "Chicken Mughlai","Chicken Curry Special","Chicken Kadai","Mutton Boti","Mutton Pepper Fry",
    "Mutton Sukka","Mutton Handi","Mutton Biryani Special","Fish Masala","Fish Curry Kerala Style",
    "Fish Roast","Prawn Roast","Prawn Pepper Fry","Seafood Biryani","Seafood Curry",
    "Seafood Fried Rice","Mixed Grill Platter","Ultimate Non-Veg Feast","Chicken Seekh Roll","Mutton Seekh Roll"
  ],

  Snacks: [
    "Burger","Cheese Burger","Pizza","French Fries","Sandwich",
    "Club Sandwich","Veg Sandwich","Cheese Sandwich","Samosa","Pani Puri",
    "Pav Bhaji","Spring Roll","Veg Momos","Fried Momos","Nachos",
    "Cheese Nachos","Garlic Bread","Cheese Garlic Bread","Potato Wedges","Onion Rings",
    "Corn Chaat","Masala Corn","Paneer Tikka","Veg Cutlet","Cheese Balls",
    "French Toast","Veg Wrap","Paneer Wrap","Veg Roll","Paneer Roll",
    "Veg Puff","Paneer Puff","Mushroom Puff","Bread Pakora","Mirchi Bajji",
    "Aloo Bajji","Vegetable Pakora","Paneer Pakora","Veg Nuggets","Cheese Nuggets",
    "Veg Hot Dog","Cheese Hot Dog","Veg Taco","Cheese Taco","Veg Quesadilla",
    "Cheese Quesadilla","Veg Bruschetta","Cheese Bruschetta","Veg Platter","Snack Combo",
    "Veg Maggi","Cheese Maggi","Masala Maggi","Veg Chowmein","Cheese Corn Balls",
    "Paneer Fingers","Paneer Pops","Veg Loaded Fries","Cheese Loaded Fries","Peri Peri Fries",
    "Veg Sizzler","Paneer Sizzler","Veg Nuggets Deluxe","Paneer Nuggets","Cheese Sticks",
    "Mozzarella Sticks","Mini Pizza","Paneer Mini Pizza","Cheese Burst Mini Pizza","Veg Open Toast",
    "Cheese Toast","Paneer Toast","Veg Delight Basket","Snack Lovers Combo","Ultimate Snack Platter",
    "Stuffed Garlic Bread","Cheesy Breadsticks","Paneer Breadsticks","Veg Fingers","Corn Cheese Nuggets",
    "Paneer Corn Balls","Veg Crunchy Bites","Cheese Crunchy Bites","Masala Fries","Cheese Fries",
    "Paneer Fries","Veg Supreme Taco","Paneer Taco","Mexican Taco","Veg Mexican Roll",
    "Paneer Mexican Roll","Veg Supreme Wrap","Paneer Supreme Wrap","Cheese Supreme Wrap","Veg Party Combo",
    "Family Snack Combo","Premium Snack Box","Snack Feast","Grand Snack Platter","Ultimate Snack Feast"
  ],

  Desserts: [
    "Vanilla Ice Cream","Chocolate Ice Cream","Strawberry Ice Cream","Butterscotch Ice Cream","Chocolate Cake",
    "Black Forest Cake","Red Velvet Cake","Brownie","Chocolate Brownie","Walnut Brownie",
    "Gulab Jamun","Rasgulla","Rasmalai","Kaju Katli","Mysore Pak",
    "Cheesecake","Blueberry Cheesecake","Donut","Chocolate Donut","Fruit Salad",
    "Fruit Custard","Cup Cake","Chocolate Cup Cake","Pastry","Chocolate Pastry",
    "Vanilla Pastry","Strawberry Pastry","Mango Mousse","Chocolate Mousse","Caramel Pudding",
    "Vanilla Pudding","Chocolate Pudding","Kulfi","Mango Kulfi","Pista Kulfi",
    "Falooda","Royal Falooda","Dry Fruit Halwa","Gajar Halwa","Badam Halwa",
    "Jalebi","Rabdi","Jalebi Rabdi","Tiramisu","Macarons",
    "Choco Lava Cake","Chocolate Truffle","Oreo Shake Dessert","Brownie Sundae","Royal Dessert Platter",
    "Mango Cheesecake","Nutella Cheesecake","Pineapple Pastry","Black Currant Pastry","Chocolate Fudge Cake",
    "KitKat Cake","Ferrero Rocher Cake","Belgian Chocolate Cake","Chocolate Tart","Fruit Tart",
    "Apple Pie","Blueberry Pie","Cherry Pie","Milk Cake","Kalakand",
    "Besan Laddu","Motichoor Laddu","Coconut Laddu","Kheer","Payasam",
    "Semiya Payasam","Badam Kheer","Dry Fruit Kheer","Premium Dessert Combo","Luxury Dessert Platter",
    "Vanilla Sundae","Chocolate Sundae","Strawberry Sundae","Banana Split","Chocolate Fondue",
    "Nutella Brownie","Chocolate Muffin","Blueberry Muffin","Red Velvet Muffin","Honey Cake",
    "Coffee Cake","Marble Cake","Pineapple Cake","Butterscotch Cake","Dry Fruit Cake",
    "Chocolate Truffle Pastry","Mango Delight","Fruit Delight","Royal Kulfi Falooda","Ultimate Dessert Collection"
  ],

  "Soft Drinks": [
    "Coca Cola","Pepsi","Sprite","Fanta","Mountain Dew",
    "7 Up","Mirinda","Limca","Thums Up","Maaza",
    "Slice","Appy Fizz","Fresh Lime Soda","Sweet Lime Soda","Mint Mojito",
    "Blue Lagoon","Virgin Mojito","Watermelon Cooler","Orange Cooler","Lemon Iced Tea",
    "Peach Iced Tea","Green Apple Soda","Kiwi Cooler","Pineapple Punch","Tropical Fruit Punch",
    "Mango Juice","Orange Juice","Apple Juice","Pineapple Juice","Watermelon Juice",
    "Banana Shake","Chocolate Shake","Vanilla Shake","Strawberry Shake","Oreo Shake",
    "KitKat Shake","Cold Coffee","Chocolate Cold Coffee","Caramel Cold Coffee","Cappuccino Frappe",
    "Mint Cooler","Lemon Mint Cooler","Virgin Pina Colada","Coconut Cooler","Fresh Coconut Water",
    "Energy Drink Classic","Energy Drink Berry","Sparkling Apple Drink","Sparkling Grape Drink","Premium Mocktail Combo",
    "Classic Lemonade","Pink Lemonade","Strawberry Lemonade","Blueberry Lemonade","Kiwi Lemonade",
    "Mango Smoothie","Strawberry Smoothie","Banana Smoothie","Mixed Fruit Smoothie","Blueberry Smoothie",
    "Iced Americano","Iced Latte","Vanilla Latte","Hazelnut Latte","Mocha Frappe",
    "Chocolate Frappe","Caramel Frappe","Mint Frappe","Red Bull Classic","Red Bull Sugar Free",
    "Monster Energy","Monster Mango","Sparkling Berry Drink","Sparkling Peach Drink","Luxury Mocktail Platter",
    "Sunrise Mocktail","Sunset Mocktail","Green Mint Mocktail","Blue Ocean Mocktail","Watermelon Mojito",
    "Kiwi Mojito","Blueberry Mojito","Passion Fruit Mojito","Virgin Margarita","Mango Margarita",
    "Strawberry Margarita","Chocolate Milkshake Deluxe","Nutella Milkshake","Brownie Shake","Belgian Chocolate Shake",
    "Protein Smoothie","Avocado Smoothie","Berry Blast Smoothie","Detox Green Juice","Vitamin C Booster",
    "Premium Energy Combo","Family Mocktail Bucket","Premium Beverage Platter","Rose Milk","Badam Milk"
  ],

  Wines: [
    "Sula Red Wine","Sula White Wine","Cabernet Sauvignon","Merlot Reserve","Pinot Noir",
    "Shiraz Classic","Zinfandel Red","Malbec Reserve","Rose Wine","Sparkling Rose",
    "Chardonnay","Sauvignon Blanc","Riesling","Pinot Grigio","Moscato",
    "Champagne Classic","Premium Champagne","Brut Sparkling Wine","Dessert Wine","Port Wine",
    "Vintage Red Reserve","Royal White Reserve","Premium Rose Collection","Luxury Sparkling Wine","Executive Wine Collection",
    "Classic Merlot","French Merlot","Italian Red Wine","Spanish Rioja","Australian Shiraz",
    "Reserve Cabernet","Premium Cabernet","Golden Chardonnay","Premium Chardonnay","White Gold Wine",
    "Classic Riesling","German Riesling","Sweet Moscato","Premium Moscato","Blush Rose",
    "Pink Rose Reserve","Vintage Rose","Sparkling Brut","Sparkling Gold","Premium Brut Reserve",
    "Luxury Red Blend","Luxury White Blend","Royal Wine Reserve","Presidential Wine","Grand Wine Collection",
    "French Cabernet Reserve","French Merlot Reserve","Bordeaux Red","Bordeaux Grand Reserve","Italian Chianti",
    "Italian Chianti Classico","Tuscan Red","Vintage Tuscan Reserve","California Zinfandel","California Premium Red",
    "Australian Premium Shiraz","Australian Reserve Shiraz","New Zealand Sauvignon Blanc","Premium Sauvignon Blanc","Golden Pinot Grigio",
    "Premium Pinot Grigio","Reserve Sparkling Brut","Crystal Sparkling Wine","Luxury Champagne Gold","Royal Champagne Reserve",
    "Premium Dessert Wine Gold","Reserve Port Wine","Diamond Wine Collection","Elite Wine Collection","Luxury Executive Wine Set",
    "Imperial Red Reserve","Imperial White Reserve","King Cabernet","Queen Merlot","Ruby Rose Reserve",
    "Vintage Cabernet 2015","Vintage Merlot 2014","Vintage Shiraz 2016","Vintage Chardonnay","Vintage Sauvignon Blanc",
    "Platinum Sparkling Wine","Crystal Brut Reserve","Prestige Champagne","Gold Label Champagne","Royal Prestige Champagne",
    "Diamond Reserve Red","Diamond Reserve White","Black Label Wine","Gold Reserve Wine","Ultimate Luxury Wine Collection"
  ]
};

let menuItems = [];
let id = 1;

Object.keys(names).forEach((category) => {
  names[category].forEach((name, index) => {
    menuItems.push({
      id: id++,
      name,
      category,
      price:
        category === "Wines"
          ? 800 + index * 35
          : category === "Soft Drinks"
          ? 50 + index
          : category === "Desserts"
          ? 100 + index
          : 120 + index,
      prepTime:
        category === "Soft Drinks" || category === "Wines"
          ? "2 mins"
          : `${10 + (index % 20)} mins`,
      availability: true,
      image: images[category][index % images[category].length]
    });
  });
});

const db = {
  users: [
    {
      id: 1,
      name: "Akshay Gopisetti",
      email: "admin@gmail.com",
      password: "admin123",
      role: "Admin",
      phone: "9876543210",
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
  ],
  dashboard: {
    totalOrders: 350,
    totalRevenue: 125000,
    activeTables: 28,
    inventoryItems: 120
  },
  menuItems,
  orders: [],
  inventory: [],
  bills: [],
  notifications: [
    {
      id: 1,
      message: "Hotel Food Management System Started",
      time: new Date().toLocaleString()
    }
  ]
};

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

console.log("✅ db.json generated successfully");
console.log("✅ Total menu items:", menuItems.length);