import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../module/authication/view/login.jsx";
import Register from "../module/authication/view/register.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
