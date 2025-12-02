import AddRecipe from "./pages/AddRecipe/AddRecipe"
import Contact from "./pages/Contact/Contact"
import { Routes, Route, BrowserRouter } from 'react-router-dom' 


function App() {

  return (
    <BrowserRouter>
      
      <main className="main-content">
        <Routes>  
          {/* Route pour ajouter une recette */}
          <Route path="/admin/ajouter" element={<AddRecipe />} />
          <Route path="/contact" element= {<Contact/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App