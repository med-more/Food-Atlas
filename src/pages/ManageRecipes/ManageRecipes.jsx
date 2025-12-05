import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaCog, FaPlus, FaSyncAlt, FaEdit, FaTrash } from 'react-icons/fa'
import { getAllRecipes } from '../../recipesApi'
import EditModal from '../../components/EditModal/EditModal'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import toast from 'react-hot-toast'
import './ManageRecipes.css'

const ManageRecipes = () => {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [deletingRecipe, setDeletingRecipe] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    loadRecipes()
  }, [])
const loadRecipes = async () => {
    try {
      setLoading(true)
      const data = await getAllRecipes()
      setRecipes(data)
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error)
      toast.error('Erreur lors du chargement. Vérifiez que JSON Server est lancé sur le port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe)
    setIsEditModalOpen(true)
  }

  const handleDelete = (recipe) => {
    setDeletingRecipe(recipe)
    setIsDeleteModalOpen(true)
  }

  const handleUpdate = () => {
    loadRecipes()
  }

  const handleDeleteConfirm = () => {
    loadRecipes()
  }

  const stats = {
    total: recipes.length,
    pays: new Set(recipes.map(r => r.pays)).size,
    categories: new Set(recipes.map(r => r.categorie)).size
  }

  if (loading) {
    return (
      <div className="manage-recipes-loading">
        <p>Chargement des recettes...</p>
      </div>
    )
  }

  return (
    <div className="manage-recipes-page">
      <div className="manage-recipes-container">
        <div className="manage-header">
          <div className="header-left">
            <div className="header-icon">
              <FaCog className="cog-icon" />
            </div>
            <div>
              <h1 className="manage-title">Gestion des recettes</h1>
              <p className="manage-subtitle">
                Gérez, modifiez et supprimez vos recettes
              </p>
            </div>
          </div>

          <div className="header-right">
            <Link to="/admin/ajouter" className="add-recipe-button">
              <FaPlus className="button-icon" />
              <span>Ajouter une recette</span>
            </Link>
            <button onClick={loadRecipes} className="refresh-button">
              <FaSyncAlt className="button-icon" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

      

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total des recettes</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Pays représentés</h3>
            <p className="stat-value">{stats.pays}</p>
          </div>
          <div className="stat-card">
            <h3>Catégories</h3>
            <p className="stat-value">{stats.categories}</p>
          </div>
        </div>

        <div className="recipes-management-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-management-card">
              <div className="recipe-card-wrapper">
                <RecipeCard recipe={recipe} />
              </div>
              <div className="recipe-actions">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="action-button edit-button"
                >
                  <FaEdit className="action-icon" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDelete(recipe)}
                  className="action-button delete-button"
                >
                  <FaTrash className="action-icon" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="no-recipes">
            <p>Aucune recette trouvée. Ajoutez votre première recette !</p>
            <Link to="/admin/ajouter" className="add-first-recipe-button">
              <FaPlus className="button-icon" />
              <span>Ajouter une recette</span>
            </Link>
          </div>
        )}
      </div>

      <EditModal
        recipe={editingRecipe}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingRecipe(null)
        }}
        onUpdate={handleUpdate}
      />

      <DeleteModal
        recipe={deletingRecipe}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeletingRecipe(null)
        }}
        onDelete={handleDeleteConfirm}
      />
    </div>
  )
}

export default ManageRecipes

