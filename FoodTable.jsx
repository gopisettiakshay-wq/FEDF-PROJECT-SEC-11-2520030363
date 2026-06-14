function FoodTable({ foods, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Food Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Prep Time</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No food items found
                </td>
              </tr>
            ) : (
              foods.map((food) => (
                <tr key={food.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {food.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {food.category}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹{food.price}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {food.prepTime}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        food.availability
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {food.availability ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(food)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(food.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
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
    </div>
  );
}

export default FoodTable;