import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// components - header & footer
import HeaderComponent from "./components/HeaderComponent"

// private routes
import PrivateRoute from "./routes/components/PrivateRoutes"
import HomeRedirect from "./routes/components/HomeRedirect"

// views
import LandingView from "./modules/landing/views/LandingView"
import AuthView from "./modules/auth/views/AuthView"
import DashboardView from "./modules/dashboard/views/DashboardView"
import NotFoundView from "./views/NotFoundView"
import SuperAdminDashboardView from "./modules/SuperAdminDashboard/views/SuperAdminDashboardView"
import AdminDashboardView from "./modules/AdminDashboard/views/AdminDashboardView"

function App() {
  return (
    <AuthProvider>
      <HeaderComponent />
      
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<LandingView />} />
        <Route path="/auth" element={<AuthView />} />

        {/* Privadas */}
        <Route element={<PrivateRoute />}>
          {/* Redirección según rol */}
          <Route path="/home" element={<HomeRedirect />} />
          
          {/* Rutas específicas por rol */}
          <Route path="/superadmin" element={<SuperAdminDashboardView />} />
          <Route path="/admin" element={<AdminDashboardView />} />
          <Route path="/racer" element={<DashboardView />} />
        </Route>

        {/* 404 NOT FOUND */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;