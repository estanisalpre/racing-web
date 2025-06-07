import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// aside
import UserAsideComponent from "./components/UserAsideComponent"

// components - header & footer
import HeaderComponent from "./components/HeaderComponent"
// private routes
import PrivateRoute from "./routes/components/PrivateRoutes"

// views
import LandingView from "./modules/landing/views/LandingView"
import AuthView from "./modules/auth/views/AuthView"
import DashboardView from "./modules/dashboard/views/DashboardView"
import NotFoundView from "./views/NotFoundView"

function App() {
  return (
    <AuthProvider>
      <HeaderComponent/>
      
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<LandingView />} />
        <Route path="/auth" element={<AuthView />} />

        {/* Privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={ <DashboardView /> } />
          {/* <Route path="/profile" element={} /> */}
          {/* <Route path="/config" element={} /> */}
        </Route>

        {/* 404 NOT FOUND */}
        <Route path="*" element={ <NotFoundView /> } />
      </Routes>
    </AuthProvider>
  )
}

export default App
