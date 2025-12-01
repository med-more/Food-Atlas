import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash, FaImage } from "react-icons/fa"
import { updateRecipe } from "../../recipesApi"
import toast from "react-hot-toast";
import "./EditModal.css"


const EditModal = ({recipe, isOpen}) => {
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


  return (
    <div>EditModal</div>
  )
}

export default EditModal