import { useState, useEffect } from 'react'
import { getAllRecipes } from '../../recipesApi'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import './Recipes.css'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Tous')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    if (selectedCountry === 'Tous') {
      setFilteredRecipes(recipes)
    } else {
      setFilteredRecipes(recipes.filter(recipe => recipe.pays === selectedCountry))
    }
  }, [selectedCountry, recipes])

  const loadRecipes = async () => {
    try {
      setLoading(true)
      const data = await getAllRecipes()
      setRecipes(data)
      setFilteredRecipes(data)
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error)
    } finally {
      setLoading(false)
    }
  }

  const countries = ['Tous', ...new Set(recipes.map(recipe => recipe.pays))]

  if (loading) {
    return (
      <div className="recipes-loading">
        <p>Chargement des recettes...</p>
      </div>
    )
  }

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h1 className="recipes-title">Nos Recettes du Monde</h1>
        <p className="recipes-subtitle">
          Explorez notre collection de recettes authentiques venues des quatre coins du monde. 
          Filtrez par pays pour trouver votre prochaine inspiration culinaire !
        </p>

        <div className="recipes-filters">
          <label className="filter-label">Filtrer par pays :</label>
          <div className="filter-buttons">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`filter-button ${selectedCountry === country ? 'active' : ''}`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div className="recipes-count">
          <strong>{filteredRecipes.length}</strong> recette{filteredRecipes.length > 1 ? 's' : ''} trouvée{filteredRecipes.length > 1 ? 's' : ''}
        </div>

        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="no-recipes">
            <p>Aucune recette trouvée pour ce pays.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes


