import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import ProgressCounter from '../store/ProgressCounter'

export default function Header() {

  const cartctx=useContext(CartContext);
  const progressctx=useContext(ProgressCounter);

  const totalCartItem=cartctx.items.length;

  function handleShowCart(){
    progressctx.showCart();
  }

  return ( 
    <header id='main-header'>
      <div id='title'>
    <img src={logoImg} alt="Restaurant"/>
      <h1>FoodCrunch</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItem})</Button>
        {/* <button>Cart (0)</button> */}
      </nav>
    </header>
  )
}
