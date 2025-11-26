import axios from 'axios';

const API_URL = 'http://localhost:3001/recettes';

//Fonction pour MODIFIER une recette existante
export const updateRecipe = async (id, recipe) =>{
    try {
        const response = await axios.put(`${API_URL}/${id}`, recipe);
        return response.data;
    } catch (error) {
        console.error('Erreur lors la modification de recette:', error);
        throw error;
    }
};