import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/common/NotFound";
import ContactsRouting from "./components/contacts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts/*" element={<ContactsRouting />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
