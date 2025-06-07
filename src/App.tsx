import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// views
import LandingView from "./modules/landing/views/LandingView"
import AuthView from "./modules/auth/views/AuthView"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/auth" element={<AuthView />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
