import { BrowserRouter,Routes,Route } from "react-router-dom"
import ManageRecipes from "./pages/ManageRecipes/ManageRecipes"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Admin" element={<ManageRecipes/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
