import React from 'react'
import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'

function Header({ title = 'My App', setSearchQuery }) {
  return (
    // <div className='header'>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightSection}>
        <SearchBar setSearchQuery={setSearchQuery} />
        <button className={styles.close} 
        onClick = {() => setSearchQuery('')}>X</button>
      </div>
    </div>
  )
}

export default Header