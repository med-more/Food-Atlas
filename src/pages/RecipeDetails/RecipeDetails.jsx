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
    <div className="recipe-details-page">
      <div className="recipe-details-container">
        <button onClick={() => navigate('/recettes')} className="back-button-top">
          <FaArrowLeft className="back-icon" />
          <span>Retour aux recettes</span>
        </button>

        <div className="recipe-hero">
          <div className="recipe-hero-image-container">
            <img src={recipe.image} alt={recipe.nom} className="recipe-hero-image" />
            <div className="recipe-hero-overlay">
              <div className="recipe-hero-badge">
                <FaMapMarkerAlt className="badge-icon" />
                <span>{recipe.pays}</span>
              </div>
              <h1 className="recipe-hero-title">{recipe.nom}</h1>
              <div className="recipe-hero-type">
                <FaUtensils className="type-icon" />
                <span>{recipe.categorie}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-info-cards">
          <div className="info-card">
            <FaClock className="info-icon" />
            <div>
              <h3>Temps de préparation</h3>
              <p>{recipe.tempsPreparation || 'Variable'}</p>
            </div>
          </div>
          <div className="info-card">
            <FaUsers className="info-icon" />
            <div>
              <h3>Portions</h3>
              <p>{recipe.portions || '4-6 personnes'}</p>
            </div>
          </div>
          <div className="info-card">
            <FaUserTie className="info-icon" />
            <div>
              <h3>Difficulté</h3>
              <p>{recipe.difficulte || 'Moyen'}</p>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="recipe-description-section">
            <h2 className="section-title">Description</h2>
            <p className="recipe-description-text">{recipe.description}</p>
          </div>

          <div className="recipe-details-grid">
            <div className="ingredients-section">
              <h2 className="section-title">Ingrédients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <FaCheck className="check-icon" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="steps-section">
              <h2 className="section-title">Étapes de préparation</h2>
              <ol className="steps-list">
                {recipe.etapes && recipe.etapes.map((etape, index) => (
                  <li key={index} className="step-item">
                    <span className="step-number">{index + 1}</span>
                    <span className="step-text">{etape}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/recettes')} className="back-button-bottom">
          <FaArrowLeft className="back-icon" />
          <span>Retour à la liste des recettes</span>
        </button>
      </div>
    </div>
  )
}

export default RecipeDetails