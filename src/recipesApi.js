import axios from 'axios';

const API_URL = 'http://localhost:3001/recettes';

// Fonction pour obtenir toutes les recettes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    throw error;
  }
};

// Fonction pour MODIFIER une recette existante
export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.error('Erreur lors la modification de recette:', error);
    throw error;
  }
};

// Fonction pour AJOUTER une recette
export const addRecipe = async (recipe) => {
  try {
    const response = await axios.post(API_URL, recipe);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de recette:', error);
    throw error;
  }
};
