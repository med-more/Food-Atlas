import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeById } from '../../recipesApi'
import { FaMapMarkerAlt, FaUtensils, FaClock, FaUsers, FaUserTie, FaCheck, FaArrowLeft } from 'react-icons/fa'
import './RecipeDetails.css'


const RecipeDetails = () => {
    const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipe()
  }, [id])

  const loadRecipe = async () => {
    try {
      setLoading(true)
      const data = await getRecipeById(id)
      setRecipe(data)
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="recipe-details-loading">
        <p>Chargement de la recette...</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="recipe-details-error">
        <p>Recette non trouvée</p>
        <button onClick={() => navigate('/recettes')} className="back-button">
          Retour aux recettes
        </button>
      </div>
    )
  }
  return (
    <div>RecipeDetails</div>
  )
}

export default RecipeDetails