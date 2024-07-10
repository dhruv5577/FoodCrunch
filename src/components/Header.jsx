import React from 'react'
import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button'

export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
    <img src={logoImg} alt="Restaurant"/>
      <h1>FoodCrunch</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
        {/* <button>Cart (0)</button> */}
      </nav>
    </header>
  )
}
