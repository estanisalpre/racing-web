import { Routes, Route } from "react-router-dom"

// views
import LandingView from "./modules/landing/views/LandingView"

// components 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
    </Routes>
  )
}

export default App
