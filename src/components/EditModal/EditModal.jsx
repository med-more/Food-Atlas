import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash, FaImage } from "react-icons/fa"
import { updateRecipe } from "../../recipesApi"
import toast from "react-hot-toast";
import "./EditModal.css"


const EditModal = () => {
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

  
  return (
    <div>EditModal</div>
  )
}

export default EditModal