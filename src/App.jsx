import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddRecipe from './pages/AddRecipe/AddRecipe'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/addRecipe' element={<AddRecipe />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
