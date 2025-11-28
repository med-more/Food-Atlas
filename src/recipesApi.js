import axios from 'axios';

const API_URL = 'http://localhost:3001/recettes';

//Fonction pour Avoir les recettes 
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette:', error);
    throw error;
  }
};
