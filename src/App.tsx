import { Routes, Route } from "react-router-dom"

// views
import LandingView from "./modules/landing/views/LandingView"
import AuthView from "./modules/auth/views/AuthView"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
      <Route path="/auth" element={<AuthView />} />
    </Routes>
  )
}

export default App
