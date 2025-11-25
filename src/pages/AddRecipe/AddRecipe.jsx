import React from 'react'
import './AddRecipe.css'
import { Link } from 'react-router-dom'
const AddRecipe = () => {
    return (
    <>
        <Link to= "/Admin">← Retour à la gestion</Link>

        <header className="header">
            <h1>Ajouter une Recette</h1>
            <p>Créez une nouvelle recette pour enrichir votre collection Food Atlas</p>
        </header>

        <section className="section">
            <h2 className="section-title">Informations de base</h2>
        <div className="row">
            <div className="field">
                <label>Nom de la recette *</label>
                <input type="text" name='name' placeholder="Ex: Tajine aux légumes"/>
            </div>

            <div className="field">
                <label>Pays *</label>
                <input type="text" name='pays' placeholder="Sélectionnez un pays" />
            </div>
        </div>

        <div className="field">
            <label>Catégorie *</label>
            <input type="text" name='categorie' placeholder="Ex: Plat principal, Dessert…"/>
        </div>

        <div className="field">
            <label>URL de l'image *</label>
            <input type="text" name='url' placeholder="https://images.unsplash.com/... ou URL Cloudinary" />
        </div>

        <div className="field">
            <label>Description *</label>
            <textarea rows="4" name='description' placeholder="Décrivez la recette, son origine…" ></textarea>
        </div>
    </section>

    <section className="section">
        <h2 class="section-title">Ingrédients</h2>

        <button className="add-btn">+ Ajouter un ingrédient</button>

        <input type="text" className="small-input" placeholder="Ingrédient 1" />
    </section>

    <section className="section">
        <h2 className="section-title">Étapes de préparation</h2>

        <button className="add-btn">+ Ajouter une étape</button>

        <div className="field">
            <label>Étape 1</label>
            <textarea rows="3" placeholder="Décrivez l'étape 1…"></textarea>
        </div>
    </section>

    <div className="bottom-buttons">
        <button className="primary-btn">Ajouter la recette</button>
        <button className="reset-btn">Réinitialiser</button>
    </div>
    </>
    )
}

export default AddRecipe
