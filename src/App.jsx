import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Recipes from './pages/Recipes/Recipes'
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import Contact from './pages/Contact/Contact'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import ManageRecipes from './pages/ManageRecipes/ManageRecipes'

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recettes" element={<Recipes />} />
          <Route path="/recette/:id" element={<RecipeDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/ajouter" element={<AddRecipe />} />
          <Route path="/admin/gestion" element={<ManageRecipes />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
