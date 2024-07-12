import { createContext, useState } from "react";

const ProgressCounter=createContext({
  progress:'', //'cart','checkout'
  showCart:()=>{},
  hideCart:()=>{},
  showCheckout:()=>{},
  hideCheckout:()=>{}

})


export function ProgressCounterProvider({children}){

  const [userProgress,setUserProgress]=useState('');

  function showCart(){
      setUserProgress('cart');
  }

  function hideCart(){
    setUserProgress('')
  }

  function showCheckout(){
    setUserProgress('checkout')
  }

  function hideCheckout(){
    setUserProgress('')
  }

  const userProgressctx={
    progress:userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }

  return (
    <ProgressCounter.Provider value={userProgressctx}>{children}</ProgressCounter.Provider>
  );
}

export default ProgressCounter;