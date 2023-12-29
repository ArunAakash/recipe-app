import React, { useEffect, useState } from 'react'
import styles from './RecipeList.module.scss'
import { Link } from 'react-router-dom'
import cx from 'classnames'

function RecipeList({ recipes = [] }) {

    const [filteredData, setFilteredData] = useState(recipes)

    useEffect(() => {
        setFilteredData(recipes)
    }, [recipes])

    const checkForRecipies = () => {
        if (recipes.length === 0)
            return <div className={styles.noRecipes}>No recipes found, Search for different items.</div>
        else
            return renderList()
    }

    const renderList = () => {
        return <div className={styles.list}>
            {filteredData.map(recipes => (
                <Link
                    to={`/recipe/${recipes.id}`}
                    className={styles.linkItem}
                    key={recipes.id}>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardHeading}>
                            {recipes.title}
                        </div>
                        <div className={styles.recipeInfo}>
                            <span className={cx(styles.tag, styles.level)}>
                                {recipes.level}
                            </span>
                            <span className={cx(styles.tag, styles.time)}>
                                {recipes.time}
                            </span>
                            <span className={cx(styles.tag, styles.veg)}>
                                {recipes.isVeg ? "Veg" : "Non-Veg"}
                            </span>
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

    const handleFilter = (event) => {
        const value = event.target.value;
        if(value === ''){
            setFilteredData(recipes)
        }
        else{
            const filtered = recipes.filter((recipe) => {
                if(value === 'veg'){
                    return recipe.isVeg
                }
                else if(value === 'non-veg'){
                    return !recipe.isVeg
                }
                else{
                    return recipe.level === value
                }
            });
            setFilteredData(filtered)
        }
    }

    return (
        <div className={styles.recipeList}>
            <div className={styles.header}>
                <h3 className={styles.title}>Check out these recipes</h3>
                <select onChange={handleFilter} name='filter' id='filter'>
                    <option value=''>All</option>
                    <option value='veg'>Veg</option>
                    <option value='non-veg'>Non Veg</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
            </div>

            {checkForRecipies()}
        </div>
    )
}

export default RecipeList