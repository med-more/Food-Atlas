import { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import { FaArrowLeft, FaPlus, FaTrash, FaImage } from 'react-icons/fa' 
import { addRecipe } from '../../recipesApi' 
import toast from 'react-hot-toast' 
import './AddRecipe.css'
const AddRecipe = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      nom: '',
      pays: '',
      categorie: '',
      image: '',
      description: '',
      tempsPrepartion: '',
      portions: '',
      difficult: '',
      ingredients: [''],
      etapes: ['']
    })

    const [imagePreview, setImagePreview] = useState(null)

    const [imageFile, setImageFile] = useState(null)

    // form submition
    const [isSubmitting, setIsSubmitting] = useState()

    // list des pays
    const countries = [
      'Maroc', 'Italie', 'Turquie', 'Mexique', 'Indie', 'France', 'Chine',
      'Espagne', 'Thailand', 'Liban', 'Japon'
    ]

    //function appellé quand utilisateur tape sur un champ
    const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value

      setFormData({
        ...formData,
        [name]: value
      })
    }

    // fonction appellé quand l'utlisateur selection une image
    const handleImageFileChange = (event) => {
      const file = event.target.files[0] // selectioner le premier image

      if(file){
        if(!file.type.startsWith('image/')) {
          toast.error('Veuillez selectioner un fichier de type image')
        }

        if(file.size > 5 * 1024 * 1024) {
          toast.error('Taille maximale : 5MB')
          return
        }
        setImageFile()

        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Image = reader.result
          setImagePreview(base64Image)
          }
          reader.readAsDataURL(file) 
      }
    }

    // function pour supprimer un image
    const removeImage = () => {
      setImagePreview(null)
      setImageFile(null)
      setFormData({
        ...formData,
        image: ''
      })
    }

    const handleIngredientChange = (index, value) => {
      const newIngredients = [...formData.ingredients]

      newIngredients[index] = value

      setFormData({
        ...formData,
        ingredients: newIngredients
      })
    }

    // ajouter un Ingredient
    const addIngredient = () => {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, '']
      })
    }

    // supprimer un ingredient 
    const removeIngredient = (index) => {
      if(formData.ingredients.length > 1) {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData({
          ...formData,
          ingredients: newIngredients
        })
      }
    }

    // modifier les étapes
    const handleStepChange = (index, value) => {
      const newEtapes = [...formData.etapes]
      newEtapes[index] = value

      setFormData({
        ...formData,
        etapes: newEtapes
      })
    }

    // add nouvelle etape
    const addStep = () => {
      setFormData({
        ...formData,
        etapes: [...formData.etapes, '']
      })
    }

    //remove etape 
    const removeStep = (index) => {
      if(formData.etapes.length > 1) {
        const newEtapes = formData.etapes.filter((_, i) => i !== index)
        setFormData({
          ...formData,
          etapes: newEtapes
        })
      }
    }

  // Fonction pour vérifier que tous les champs requis sont remplis
  const validateForm = () => {
    // Vérifier le nom
    if (!formData.nom.trim()) {
      toast.error('Le nom de la recette est requis')
      return false
    }
    
    // Vérifier le pays
    if (!formData.pays) {
      toast.error('Le pays est requis')
      return false
    }
    
    // Vérifier la catégorie
    if (!formData.categorie.trim()) {
      toast.error('La catégorie est requise')
      return false
    }
    
    // Vérifier l'image : soit un fichier sélectionné, soit une image déjà présente (cas édition)
    if (!imageFile && !formData.image.trim()) {
      toast.error('L\'image est requise')
      return false
    }
    
    // Vérifier la description
    if (!formData.description.trim()) {
      toast.error('La description est requise')
      return false
    }
    
    // Vérifier qu'il y a au moins un ingrédient rempli
    const ingredientsRemplis = formData.ingredients.filter(i => i.trim())
    if (ingredientsRemplis.length === 0) {
      toast.error('Au moins un ingrédient est requis')
      return false
    }
    
    // Vérifier qu'il y a au moins une étape remplie
    const etapesRemplies = formData.etapes.filter(e => e.trim())
    if (etapesRemplies.length === 0) {
      toast.error('Au moins une étape est requise')
      return false
    }
    
    return true // Tout est bon !
  }

  // Fonction appelée quand l'utilisateur soumet le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault() // Empêcher le rechargement de la page

    // Vérifier que le formulaire est valide
    if (!validateForm()) {
      return // Arrêter si le formulaire n'est pas valide
    }

    setIsSubmitting(true) // Marquer que le formulaire est en cours de soumission

    try {
      // 1) Uploader l'image sur Cloudinary si un fichier a été sélectionné
      let imageUrl = formData.image

      if (imageFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

        if (!cloudName || !uploadPreset) {
          throw new Error('Les variables VITE_CLOUDINARY_CLOUD_NAME et VITE_CLOUDINARY_UPLOAD_PRESET ne sont pas configurées')
        }

        const formDataUpload = new FormData()
        formDataUpload.append('file', imageFile)
        formDataUpload.append('upload_preset', uploadPreset)

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formDataUpload
        })

        const data = await response.json()

        if (!response.ok) {
          console.error('Erreur Cloudinary:', data)
          throw new Error(data.error?.message || 'Erreur lors de l\'upload de l\'image sur Cloudinary')
        }

        imageUrl = data.secure_url
      }

      // 2) Préparer les données de la recette avec l'URL Cloudinary
      const recipeToAdd = {
        ...formData,
        image: imageUrl,
        // Enlever les ingrédients vides
        ingredients: formData.ingredients.filter(i => i.trim()),
        // Enlever les étapes vides
        etapes: formData.etapes.filter(e => e.trim()),
        // Valeurs par défaut si vide
        tempsPreparation: formData.tempsPreparation || 'Variable',
        portions: formData.portions || '4-6 personnes',
        difficulte: formData.difficulte || 'Moyen'
      }

      //Envoyer la recette à la base de données (attendre que ça se termine)
      await addRecipe(recipeToAdd)
      
      // Afficher un message de succès
      toast.success('Recette ajoutée avec succès !')
      
      // Aller à la page de gestion des recettes
      navigate('/admin/gestion')
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error)
      toast.error('Erreur lors de l\'ajout de la recette. Vérifiez que JSON Server est lancé.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour réinitialiser (vider) le formulaire
  const handleReset = () => {
    setFormData({
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
    setImagePreview(null)
    setImageFile(null)
    toast.success('Formulaire réinitialisé')
  }
    return (
    
    <div className="add-recipe-page">
      <div className="add-recipe-container">
        {/* Bouton pour retourner à la page de gestion */}
        <button onClick={() => navigate('/admin/gestion')} className="back-button">
          <FaArrowLeft className="back-icon" />
          <span>Retour à la gestion</span>
        </button>

        {/* En-tête de la page */}
        <div className="add-recipe-header">
          <h1 className="add-recipe-title">Ajouter une Recette</h1>
          <p className="add-recipe-subtitle">
            Créez une nouvelle recette pour enrichir votre collection Food Atlas
          </p>
        </div>

        {/* Le formulaire */}
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          {/* Section : Informations de base */}
          <div className="form-section">
            <h2 className="section-title">Informations de base</h2>
            
            {/* Champ : Nom de la recette */}
            <div className="form-group">
              <label htmlFor="nom" className="form-label">
                Nom de la recette *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex: Tajine aux légumes"
                className="form-input"
                required
              />
            </div>

            {/* Champ : Pays */}
            <div className="form-group">
              <label htmlFor="pays" className="form-label">
                Pays *
              </label>
              <select
                id="pays"
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Sélectionnez un pays</option>
                {/* Créer une option pour chaque pays */}
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Champ : Catégorie */}
            <div className="form-group">
              <label htmlFor="categorie" className="form-label">
                Catégorie *
              </label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                placeholder="Ex: Plat principal, Dessert, Entrée..."
                className="form-input"
                required
              />
            </div>

            {/* Champ : Image */}
            <div className="form-group">
              <label className="form-label">
                Image de la recette *
              </label>
              
              <div className="file-upload-container">
                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="file-input"
                />
                <label htmlFor="image-file" className="file-upload-label">
                  <FaImage className="upload-icon" />
                  <span>{imageFile ? imageFile.name : 'Cliquez pour sélectionner une image'}</span>
                </label>
                {imageFile && (
                  <p className="form-help">
                    Fichier sélectionné: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Afficher l'aperçu de l'image si une image est sélectionnée */}
              {imagePreview && (
                <div className="image-preview-container">
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

            {/* Champ : Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez la recette, son origine, ses particularités..."
                rows="5"
                className="form-textarea"
                required
              />
            </div>
          </div>

          {/* Section : Ingrédients */}
          <div className="form-section">
            <h2 className="section-title">Ingrédients</h2>
            
            {/* Afficher un champ pour chaque ingrédient */}
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
                  {/* Bouton supprimer (seulement s'il y a plus d'un ingrédient) */}
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
            
            {/* Bouton pour ajouter un ingrédient */}
            <button
              type="button"
              onClick={addIngredient}
              className="add-item-button"
            >
              <FaPlus className="add-icon" />
              <span>Ajouter un ingrédient</span>
            </button>
          </div>

          {/* Section : Étapes de préparation */}
          <div className="form-section">
            <h2 className="section-title">Étapes de préparation</h2>
            
            {/* Afficher un champ pour chaque étape */}
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
                  {/* Bouton supprimer (seulement s'il y a plus d'une étape) */}
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
            
            {/* Bouton pour ajouter une étape */}
            <button
              type="button"
              onClick={addStep}
              className="add-item-button"
            >
              <FaPlus className="add-icon" />
              <span>Ajouter une étape</span>
            </button>
          </div>

          {/* Boutons d'action du formulaire */}
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Ajout en cours...' : 'Ajouter la recette'}
            </button>
            <button type="button" onClick={handleReset} className="reset-button">
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>

    )
}

export default AddRecipe
