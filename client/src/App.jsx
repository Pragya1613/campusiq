import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import ScrollToHash from "./components/ScrollToHash";

function App() {
  return (
    <BrowserRouter>

      <ScrollToHash />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#172554",
            color: "#fff",
          },
          success: {
            style: {
              background: "#16a34a",
            },
          },
          error: {
            style: {
              background: "#dc2626",
            },
          },
        }}
      />

      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;