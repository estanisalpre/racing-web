import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import { PageWrapper } from "./routes/components/PageWrapper";

// components - header & footer
import HeaderComponent from "./components/HeaderComponent";
import InscriptionComponent from "./modules/landing/components/InscriptionComponent";

// private routes
import PrivateRoute from "./routes/components/PrivateRoutes";
import HomeRedirect from "./routes/components/HomeRedirect";

// views
import LandingView from "./modules/landing/views/LandingView";
import AuthView from "./modules/auth/views/AuthView";
import DashboardView from "./modules/dashboard/views/DashboardView";
import NotFoundView from "./views/NotFoundView";
import SuperAdminDashboardView from "./modules/SuperAdminDashboard/views/SuperAdminDashboardView";
import AdminDashboardView from "./modules/AdminDashboard/views/AdminDashboardView";
import ScheduleComponent from "./modules/landing/components/ScheduleComponent";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <HeaderComponent />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Públicas */}
          <Route path="/" element={<PageWrapper><LandingView /></PageWrapper>} />
          <Route path="/auth" element={<PageWrapper><AuthView /></PageWrapper>} />
          <Route path="/inscription" element={<PageWrapper><InscriptionComponent /></PageWrapper>} />
          <Route path="/schedule" element={<PageWrapper><ScheduleComponent /></PageWrapper>} />

          {/* Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<PageWrapper><HomeRedirect /></PageWrapper>} />
            <Route path="/superadmin" element={<PageWrapper><SuperAdminDashboardView /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboardView /></PageWrapper>} />
            <Route path="/racer" element={<PageWrapper><DashboardView /></PageWrapper>} />
          </Route>

          {/* 404 NOT FOUND */}
          <Route path="*" element={<PageWrapper><NotFoundView /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;