import React from 'react'
import { Link } from 'react-router-dom'

const ManageRecipes = () => {
    return (
        <div>
            <div>
                <Link to='/admin/addRecipe'>Add Recipe</Link>
            </div>
            <div>
                <Link to='/admin/editRecipe'>Edit Recipe</Link>
            </div>
            <div>
                <Link to='/admin'>Delete Recipe</Link>
            </div>
        </div>
    )
}

export default ManageRecipes