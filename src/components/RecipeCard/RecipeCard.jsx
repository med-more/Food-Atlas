import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaUtensils } from 'react-icons/fa'
import './RecipeCard.css'

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recette/${recipe.id}`} className="recipe-card fade-in">
      <div className="recipe-card-image-container">
        <img src={recipe.image} alt={recipe.nom} className="recipe-card-image" />
        <div className="recipe-card-country-badge">
          <FaMapMarkerAlt className="badge-icon" />
          <span>{recipe.pays}</span>
        </div>
      </div>
      
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.nom}</h3>
        <div className="recipe-card-type">
          <FaUtensils className="type-icon" />
          <span>{recipe.categorie}</span>
        </div>
        <p className="recipe-card-description">
          {recipe.description.substring(0, 100)}...
        </p>
        <div className="recipe-card-stats">
          <span>{recipe.ingredients?.length || 0} ingrédients</span>
          <span>•</span>
          <span>{recipe.etapes?.length || 0} étapes</span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard

