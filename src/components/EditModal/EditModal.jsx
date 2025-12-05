import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash, FaImage } from "react-icons/fa"
import { updateRecipe } from "../../recipesApi"
import toast from "react-hot-toast";
import "./EditModal.css"


const EditModal = ({recipe, isOpen, onUpdate, onClose}) => {
    const [formData, setFormData] = useState({
        nom: '',
        pays: '',
        categorie: '',
        image: '',
        description: '',
        tempsPreparation: '',
        portions: '',
        difficulte: '',
        ingredients: [''],
        etapes: ['']
    })

    const [imagePreview, setImagePreview] = useState(null);
    const [ imageFile, setImageFile ] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const countries = [
    'Maroc', 'Italie', 'Mexique', 'Japon', 'France', 'Inde', 
    'Espagne', 'Grèce', 'Thaïlande', 'Chine', 'Liban', 'Turquie'
  ]

  useEffect(()=>{
    if (recipe && isOpen) {
        setFormData({
            nom: recipe.nom || '',
            pays: recipe.pays || '',
            categorie: recipe.categorie || '',
            image: recipe.image || '',
            description: recipe.description || '',
            tempsPreparation: recipe.tempsPreparation || '',
            portions: recipe.portions || '',
            difficulte: recipe.difficulte || '',
            ingredients: recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients : [''],
            etapes: recipe.etapes && recipe.etapes.length > 0 ? recipe.etapes : ['']
        })

        setImagePreview(recipe.image || null)
        setImageFile(null)
    }
  }, [recipe, isOpen])

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
    if (name === 'image') {
        setImagePreview(value)
    }
  }

  const handleImageFileChange = (e) =>{
    const file = e.target.files[0]
    if (file) {
        if (!file.type.startsWith('image/')) {
            toast.error('Veuillez sélectionner un fichier image')
            return 
        }
        if (file.size > 5 * 1024* 1024) {
            toast.error('L\'image est trop volumineuse. Taille maximale : 5MB')
            return 
        }
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () =>{
            const base64Image = reader.result
            setImagePreview(base64Image)
            setFormData(prev => ({
                ...prev,
                image: base64Image
            }))
        }
        reader.readAsDataURL(file)
    }
  }

  const removeImage = () =>{
    setImagePreview(null)
    setImageFile(null)
    setFormData(prev =>({
        ...prev,
        image: ''
    }))
  }

  const handleIngredientChange = (index, value) =>{
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev =>({
        ...prev,
        ingredients: newIngredients
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 0) {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData(prev => ({
            ...prev,
            ingredients: newIngredients
        }))
    }
  }

  const handleStepChange = (index, value) => {
    const newEtapes = [...formData.etapes]
    newEtapes[index] = value
    setFormData(prev => ({
        ...prev,
        etapes: newEtapes
    }))
  }

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      etapes: [...prev.etapes, '']
    }))
  }

  const removeStep = (index) => {
    if (formData.etapes.length > 1) {
      const newEtapes = formData.etapes.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        etapes: newEtapes
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const recipeToUpdate = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        etapes: formData.etapes.filter(e => e.trim())
      }

      await updateRecipe(recipe.id, recipeToUpdate)
      toast.success('Recette modifiée avec succès !')
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      toast.error('Erreur lors de la mise à jour. Vérifiez que JSON Server est lancé.')
    } finally {
      setIsSubmitting(false)
    }
  }


    if (!isOpen || !recipe) return null


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Modifier la recette</h2>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>

        <p className="modal-subtitle">
          Modifiez les informations de la recette "{recipe.nom}"
        </p>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">Informations de base</h3>
            
            <div className="form-group">
              <label className="form-label">Nom de la recette *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pays *</label>
              <select
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Sélectionnez un pays</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Catégorie *</label>
              <input
                type="text"
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image de la recette *</label>
              
              {/* Option pour uploader un fichier local */}
              <div className="file-upload-container">
                <input
                  type="file"
                  id="edit-image-file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="file-input"
                />
                <label htmlFor="edit-image-file" className="file-upload-label">
                  <FaImage className="upload-icon" />
                  <span>{imageFile ? imageFile.name : 'Cliquez pour changer l\'image'}</span>
                </label>
                {imageFile && (
                  <p className="form-help">
                    Fichier sélectionné: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Ou modifier l'URL */}
              <p className="form-help" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Ou modifiez l'URL :</p>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="URL de l'image"
                className="form-input"
                required
              />

              {/* Aperçu de l'image */}
              {imagePreview && (
                <div className="image-preview-container" style={{ marginTop: '1rem' }}>
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Aperçu" className="image-preview" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="remove-image-button"
                      title="Supprimer l'image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Temps de préparation</label>
              <input
                type="text"
                name="tempsPreparation"
                value={formData.tempsPreparation}
                onChange={handleChange}
                placeholder="Ex: 30 minutes"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Portions</label>
              <input
                type="text"
                name="portions"
                value={formData.portions}
                onChange={handleChange}
                placeholder="Ex: 4-6 personnes"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Difficulté</label>
              <input
                type="text"
                name="difficulte"
                value={formData.difficulte}
                onChange={handleChange}
                placeholder="Ex: Facile, Moyen, Difficile"
                className="form-input"
              />
            </div>
          </div>

          {/* Section Ingrédients */}
          <div className="form-section">
            <h3 className="section-title">Ingrédients</h3>
            
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="dynamic-input-group">
                <label className="form-label">Ingrédient {index + 1}</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ex: 500g de viande`}
                    className="form-input"
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="remove-button"
                      title="Supprimer cet ingrédient"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addIngredient}
              className="add-item-button"
            >
              <FaPlus className="add-icon" />
              <span>Ajouter un ingrédient</span>
            </button>
          </div>

          {/* Section Étapes */}
          <div className="form-section">
            <h3 className="section-title">Étapes de préparation</h3>
            
            {formData.etapes.map((etape, index) => (
              <div key={index} className="dynamic-input-group">
                <label className="form-label">Étape {index + 1}</label>
                <div className="input-with-button">
                  <textarea
                    value={etape}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Décrivez l'étape ${index + 1}...`}
                    rows="3"
                    className="form-textarea"
                  />
                  {formData.etapes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="remove-button"
                      title="Supprimer cette étape"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addStep}
              className="add-item-button"
            >
              <FaPlus className="add-icon" />
              <span>Ajouter une étape</span>
            </button>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="save-button" disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal