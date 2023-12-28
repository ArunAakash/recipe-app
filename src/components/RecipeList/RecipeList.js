import React from 'react'
import styles from './RecipeList.module.scss'
import { Link } from 'react-router-dom'
import cx from 'classnames'

function RecipeList({ recipes = [] }) {

    const checkForRecipies = () => {
        if (recipes.length === 0)
            return <div className={styles.noRecipes}>No recipes found, Search for different items.</div>
        else
            return renderList()
    }

    const renderList = () => {
        return <div className={styles.list}>
            {recipes.map(recipes => (
                <Link
                    to={`/recipe/${recipes.id}`}
                    className={styles.linkItem}
                    key={recipes.id}>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardHeading}>
                            {recipes.title}
                        </div>
                        <div className={styles.recipeInfo}>
                            <span className={cx(styles.tag, styles.level)}>{recipes.level}</span>
                            <span className={cx(styles.tag, styles.time)}>{recipes.time}</span>
                            <span className={cx(styles.tag, styles.veg)}>{recipes.isVeg ? "Veg" : "Non-Veg"}</span>
                        </div>
                        <img
                            src={recipes.image}
                            alt={recipes.title}
                            className={styles.image}
                        />
                    </div>
                </Link>
            ))}
        </div>
    }

    return (
        <div className={styles.recipeList}>
            <h3 className={styles.title}>Check out these recipes</h3>
            {checkForRecipies()}
        </div>
    )
}

export default RecipeList