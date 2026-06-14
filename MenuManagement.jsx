import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getData, saveData, addNotification } from "../api/api";

const emptyFood = {
  name: "",
  category: "Veg",
  price: "",
  prepTime: "",
  image: "",
  availability: true,
};

const categories = [
  "All",
  "Veg",
  "Non-Veg",
  "Snacks",
  "Desserts",
  "Wines",
  "Soft Drinks",
];

function MenuManagement() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [form, setForm] = useState(emptyFood);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;

  useEffect(() => {
    loadFoods();

    const handleGlobalSearch = () => {
      setSearch(localStorage.getItem("globalSearch") || "");
      setPage(1);
    };

    window.addEventListener("globalSearchUpdated", handleGlobalSearch);

    return () => {
      window.removeEventListener("globalSearchUpdated", handleGlobalSearch);
    };
  }, []);

  const loadFoods = async () => {
    const data = await getData("menuItems");
    setFoods(data);
  };

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        food.name.toLowerCase().includes(keyword) ||
        food.category.toLowerCase().includes(keyword) ||
        String(food.price).includes(keyword);

      const matchCategory =
        activeCategory === "All" || food.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [foods, search, activeCategory]);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage) || 1;

  const paginatedFoods = filteredFoods.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categoryCount = (category) => {
    if (category === "All") return foods.length;
    return foods.filter((food) => food.category === category).length;
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const openAddForm = () => {
    setEditingFood(null);
    setForm(emptyFood);
    setShowForm(true);
  };

  const openEditForm = (food) => {
    setEditingFood(food);
    setForm(food);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.prepTime) {
      toast.error("Please fill all required fields");
      return;
    }

    const foodData = {
      ...form,
      price: Number(form.price),
      image:
        form.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    };

    let updatedFoods;

    if (editingFood) {
      updatedFoods = foods.map((food) =>
        food.id === editingFood.id
          ? { ...foodData, id: editingFood.id }
          : food
      );

      toast.success("Dish updated successfully");
      await addNotification(`${form.name} updated in menu`);
    } else {
      updatedFoods = [
        {
          ...foodData,
          id: Date.now(),
        },
        ...foods,
      ];

      toast.success("Dish added successfully");
      await addNotification(`${form.name} added to menu`);
    }

    await saveData("menuItems", updatedFoods);

    setFoods(updatedFoods);
    setForm(emptyFood);
    setEditingFood(null);
    setShowForm(false);
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this dish?")) return;

    const updatedFoods = foods.filter((food) => food.id !== id);

    await saveData("menuItems", updatedFoods);
    await addNotification("Dish deleted from menu");

    setFoods(updatedFoods);
    toast.success("Dish deleted");
  };

  const toggleAvailability = async (id) => {
    const updatedFoods = foods.map((food) =>
      food.id === id
        ? { ...food, availability: !food.availability }
        : food
    );

    await saveData("menuItems", updatedFoods);
    setFoods(updatedFoods);

    toast.success("Availability updated");
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Menu Management</h1>
          <p>
            Search, filter, add, edit and manage 600+ dishes with different food
            images.
          </p>
        </div>

        <div className="menu-actions">
          <button onClick={() => setView(view === "grid" ? "table" : "grid")}>
            {view === "grid" ? "Table View" : "Grid View"}
          </button>

          <button onClick={openAddForm}>+ Add Dish</button>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => changeCategory(category)}
            className={activeCategory === category ? "active" : ""}
          >
            {category} ({categoryCount(category)})
          </button>
        ))}
      </div>

      {showForm && (
        <form className="panel menu-form" onSubmit={handleSubmit}>
          <input
            placeholder="Dish Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Snacks</option>
            <option>Desserts</option>
            <option>Wines</option>
            <option>Soft Drinks</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Preparation Time"
            value={form.prepTime}
            onChange={(e) => setForm({ ...form, prepTime: e.target.value })}
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <label className="check-box">
            <input
              type="checkbox"
              checked={form.availability}
              onChange={(e) =>
                setForm({ ...form, availability: e.target.checked })
              }
            />
            Available
          </label>

          <button type="submit">
            {editingFood ? "Update Dish" : "Save Dish"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setShowForm(false);
              setEditingFood(null);
              setForm(emptyFood);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <input
        className="full-input"
        placeholder="Search dishes by name, category or price..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="menu-summary">
        <div>
          <h3>{filteredFoods.length}</h3>
          <p>Items Showing</p>
        </div>

        <div>
          <h3>{activeCategory}</h3>
          <p>Selected Category</p>
        </div>

        <div>
          <h3>
            {page} / {totalPages}
          </h3>
          <p>Current Page</p>
        </div>
      </div>

      {view === "grid" ? (
        <div className="cards">
          {paginatedFoods.length === 0 ? (
            <div className="panel empty-box">
              <h3>No dishes found</h3>
              <p>Try another search or category.</p>
            </div>
          ) : (
            paginatedFoods.map((food) => (
              <div className="food-card" key={food.id}>
                <img src={food.image} alt={food.name} />

                <h3>{food.name}</h3>

                <p>
                  {food.category} • {food.prepTime}
                </p>

                <div className="food-row">
                  <b>₹{food.price}</b>

                  <span
                    className={food.availability ? "available" : "unavailable"}
                  >
                    {food.availability ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="food-buttons">
                  <button onClick={() => openEditForm(food)}>Edit</button>

                  <button onClick={() => toggleAvailability(food.id)}>
                    {food.availability ? "Disable" : "Enable"}
                  </button>

                  <button onClick={() => deleteFood(food.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Dish</th>
                <th>Category</th>
                <th>Price</th>
                <th>Prep Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedFoods.length === 0 ? (
                <tr>
                  <td colSpan="7">No dishes found</td>
                </tr>
              ) : (
                paginatedFoods.map((food) => (
                  <tr key={food.id}>
                    <td>
                      <img
                        src={food.image}
                        alt={food.name}
                        style={{
                          width: "55px",
                          height: "55px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </td>

                    <td>{food.name}</td>
                    <td>{food.category}</td>
                    <td>₹{food.price}</td>
                    <td>{food.prepTime}</td>

                    <td>
                      <span
                        className={
                          food.availability ? "available" : "unavailable"
                        }
                      >
                        {food.availability ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td>
                      <div className="table-actions">
                        <button onClick={() => openEditForm(food)}>Edit</button>

                        <button onClick={() => deleteFood(food.id)}>
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
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MenuManagement;