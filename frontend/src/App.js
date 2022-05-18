import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/common/NotFound";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import ContactsRouting from "./components/contacts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/contacts/*"
          element={
            <ProtectedRoutes>
              <ContactsRouting />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
