import React, { useEffect, useState } from 'react'
import { fetchRecipesById } from '../../utils/api'
import { Link, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import styles from './RecipeDetail.module.scss'
import cx from 'classnames'

function RecipeDetail() {

    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFavourite, setIsFavourite] = useState(false)

    //setRecipe(newValue) , setRecipe(prev => process)

    const { id } = useParams()

    useEffect(() => { //first time
        const fetchRecipesData = async () => {
            try {
                const data = await fetchRecipesById(id)
                setRecipe(data)
                setLoading(false)
            }
            catch {
                setLoading(false)
            }

        }
        fetchRecipesData()
    }, [id])

    //btn -> storage, storage check -> display

    //local storage ->get, set, array methods -> map, filter, some
    //array spread

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem('fav')) || []
        const isRecipeFav = fav.some(rec => rec.id === recipe.id)
        setIsFavourite(isRecipeFav)
    }, [recipe])

    const handleToggleFav = () => {
        setIsFavourite(preVal => !preVal)
        const fav = JSON.parse(localStorage.getItem('fav')) || []
        const updateFav = isFavourite ? fav.filter(rec => rec.id !== recipe.id)
        : [...fav, recipe]
        localStorage.setItem('fav',JSON.stringify(updateFav))
    }

    return (
        <div>
            {loading ? <Loader /> :
                <div className={styles.details}>
                    <Link to={'/'}>Go Back</Link>
                    <div className={styles.header}>
                        <h2>{recipe.title}</h2>
                        <button 
                        onClick={handleToggleFav}
                        className={styles.favBtn}>
                            {!isFavourite ? '+ Add to favourites' : '- Remove from favourites'}
                        </button>
                    </div>
                    <div className={styles.content}>
                        <img className={styles.image} src={recipe.image} alt={recipe.title}/>
                        <div className={styles.recipeInfo}>
                            {/* <span className='tag level'>{recipe.level}</span> */}
                            <span className={cx(styles.tag, styles.level)}>{recipe.level}</span>
                            <span className={cx(styles.tag, styles.time)}>{recipe.time}</span>
                            <span className={cx(styles.tag, styles.veg)}>{recipe.isVeg ? "Veg" : "Non-Veg"}</span>
                        </div>
                        <div className={styles.tags}>
                            {recipe.ingredients.map((ingredients,index) => (
                                <span className={styles.ingredient} key={index}>{ingredients}</span>
                            ))}
                        </div>
                        <h3>Instructions</h3>
                        <ol className={styles.instructions}>
                            {recipe.instructions.map((instructions,index) => (
                                <li key={index}>{instructions}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            }
        </div>
    )
}

export default RecipeDetail