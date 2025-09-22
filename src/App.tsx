import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PizzaBuilderPage from './pages/PizzaBuilderPage'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  return (
    <div className="min-h-screen">
      <BackgroundEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/build-pizza" element={<PizzaBuilderPage />} />
      </Routes>
    </div>
  )
}

export default App
