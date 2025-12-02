import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import { deleteRecipe } from '../../recipesApi'
import toast from 'react-hot-toast'
import './DeleteModal.css'

const DeleteModal = ({ recipe, isOpen, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe.id)
      toast.success('Recette supprimée avec succès !')
      onDelete()
      onClose()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error('Erreur lors de la suppression. Vérifiez que JSON Server est lancé.')
    }
  }

  if (!isOpen || !recipe) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="warning-header">
            <FaExclamationTriangle className="warning-icon" />
            <h2 className="modal-title">Confirmer la suppression</h2>
          </div>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <p className="delete-question">
            Êtes-vous sûr de vouloir supprimer la recette <span className="recipe-name">"{recipe.nom}"</span> ?
          </p>
          <p className="delete-warning">
            Cette action est irréversible et supprimera définitivement cette recette de votre collection.
          </p>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Annuler
          </button>
          <button onClick={handleDelete} className="delete-button">
            Supprimer la recette
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal