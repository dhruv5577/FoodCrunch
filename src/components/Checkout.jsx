import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from "../utils/currency";
import Input from './UI/Input';
import Button from './UI/Button';
import ProgressCounter from '../store/ProgressCounter';

export default function Checkout() {

  const cartctx=useContext(CartContext);
  const Progressctx=useContext(ProgressCounter);

  const carttotal=cartctx.items.reduce(
    (totalamount,item)=>totalamount+item.quantity*item.price,0
  )

  function handleclose(){
    Progressctx.hideCheckout();
  }

  function handlesubmit(e){
    e.preventDefault();

    const fd=new FormData(e.target);
    const customerData=Object.fromEntries(fd.entries())
  }

  return <Modal open={Progressctx.progress==='checkout'} onClose={handleclose}>
    <form onSubmit={handlesubmit}>
      <h2>CheckOut</h2>
      <p>Total Amount : {currencyFormatter.format(carttotal)}</p>
      <Input label='Full Name' type='text' id='full-name'/>
      <Input label='Email Address' type='email' id='email'/>
      <Input label='Street' type='text' id='Street'/>
      <div className='control-row'>
        <Input label='Postal Code' type='text' id='Postal-code'/>
        <Input label='City ' type='text' id='city'/>
      </div>

      <p className='modal-actions'>
        <Button type='button' textOnly onClick={handleclose}>Close</Button>
        <Button >Proceed Order</Button>
      </p>
    </form>
  </Modal>
}
