// Import Library
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import RolesList from "./pages/roles/RolesList"
import RolesCreate from "./pages/roles/RolesCreate"
import RolesUpdate from "./pages/roles/RolesUpdate"
import TaskList from "./pages/task/TaskList"

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="roles" element={<RolesList />} />
          <Route path="roles/create" element={<RolesCreate />} />
          <Route path="roles/update/:roleId" element={<RolesUpdate />} />
          <Route path="tasks" element={<TaskList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
