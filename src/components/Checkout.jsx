import React, { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from "../utils/currency";
import Input from './UI/Input';
import Button from './UI/Button';
import ProgressCounter from '../store/ProgressCounter';
import useHttp from '../Hooks/useHttp';
import Error from './Error';


const requestConfig={
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  }
}

export default function Checkout() {
  const cartctx = useContext(CartContext);
  const Progressctx = useContext(ProgressCounter);

  const {data,isLoading:isSending ,error,sendReq,cleardata } = useHttp('http://localhost:3000/orders',requestConfig)

  const carttotal = cartctx.items.reduce(
    (totalamount, item) => totalamount + item.quantity * item.price, 0
  );

  function handleclose() {
    Progressctx.hideCheckout();
  }

  function handleFinish(){
    Progressctx.hideCheckout();
    cartctx.clearcart();
    cleardata();
  }

  async function handlesubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());


    sendReq(
      JSON.stringify({
        order: {  
          items: cartctx.items,
          customer: customerData,
        },
      }))
 
  }

  let actions=(<>
    <Button type='button' textOnly onClick={handleclose}>Close</Button>
    <Button type='submit'>Proceed Order</Button>
  </>)


if(isSending){
  actions=<span>Sending Order Data...</span>
}

if(data && !error){
  return <Modal open={Progressctx.progress === 'checkout'} onClose={handleFinish} >
    <h2>Success!</h2>
    <p>Your Order Was Successfully</p>
    <p>Order Details will be shared with you via Email</p>
    <p className="modal-actions">
      <Button onClick={handleFinish}> Okay </Button>
    </p>
  </Modal>
}

  return (
    <Modal open={Progressctx.progress === 'checkout'} onClose={handleclose}>
      <form onSubmit={handlesubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount: {currencyFormatter.format(carttotal)}</p>
        <Input label='Full Name' type='text' id='name' name='name' />
        <Input label='Email Address' type='email' id='email' name='email' />
        <Input label='Street' type='text' id='street' name='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' name='postal-code' />
          <Input label='City' type='text' id='city' name='city' />
        </div>
        {error && <Error title='Failed To submit Order' message={error}  /> }
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
