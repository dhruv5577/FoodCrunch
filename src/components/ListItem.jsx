import React, { useContext } from 'react'
import {currencyFormatter} from '../utils/currency.js'
import Button from './UI/Button.jsx'
import CartContext from '../store/CartContext.jsx'


export default function ListItem({meal}) {

const cartctx=useContext(CartContext);

  function handleAdditem(){
    cartctx.addItem(meal )
  }

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'> {currencyFormatter.format(meal.price)}</p>
          <p className='meal-item-description'> {meal.description} </p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAdditem}>Add to Cart</Button>
          {/* <button>Add to Cart</button> */}
        </p>
      </article>
    </li>
  )
}
