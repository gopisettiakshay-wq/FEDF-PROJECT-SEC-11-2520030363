import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(storedNotifications);
  }, []);

  const clearNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify([]));
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell size={24} className="text-gray-700" />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-gray-700">
              Notifications
            </h3>

            <button
              onClick={clearNotifications}
              className="text-red-500 text-sm hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                No Notifications
              </p>
            ) : (
              notifications.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border-b hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-700">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item.time}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;