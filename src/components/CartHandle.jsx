import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/currency";
import Button from "./UI/Button";
import ProgressCounter from '../store/ProgressCounter'
import CartItem from "./CartItem";

export default function CartHandle() {


  const cartctx=useContext(CartContext);
  const Progressctx=useContext(ProgressCounter);

  const carttotal=cartctx.items.reduce(
    (totalamount,item)=>totalamount+item.quantity*item.price,0  
  )

  function handleclosemodal(){
    Progressctx.hideCart();
  } 

  function handleOpenCheckout(){
    Progressctx.showCheckout();
  }

  

  return (
   <Modal className="cart" 
   open={Progressctx.progress==='cart'} 
   onClose={Progressctx.progress==='cart'? handleclosemodal : null}>
    <h2>Your Cart</h2>
    <ul>
      {cartctx.items.map((item)=>
        (<CartItem key={item.id} 
          name={item.name} 
          quantity={item.quantity} 
          price={item.price}
          onDecrease={()=>cartctx.removeItem(item.id)}
          onIncrease={()=>cartctx.addItem(item)}
          />
      ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(carttotal)}</p>
    <p className="modal-actions">
      <Button onClick={handleclosemodal}>Close</Button>
      {cartctx.items.length>0 && <Button onClick={handleOpenCheckout}>Go to CheckOut</Button>}
    </p>
   </Modal>
  )
}
