import AddRecipe from "./pages/AddRecipe/AddRecipe"
import { Routes, Route } from 'react-router-dom' 

function App() {

  return (
    <div className="app">
      
      <main className="main-content">
        <Routes>  
          {/* Route pour ajouter une recette */}
          <Route path="/admin/ajouter" element={<AddRecipe />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
