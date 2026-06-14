import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#111827",
            color: "#ffffff",
            borderRadius: "12px",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;