import { createContext, useReducer } from "react";

// Define the initial state and context
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearcart:()=>{}
});

// Define the reducer function
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }


  if(action.type==='CLEAR_CART'){
    return {...state,items:[]}
  }

  return state;
}

// Create the provider component
export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: 'ADD_ITEM', item: item });
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_ITEM', id });
  }

  function clearcart(){
    dispatch({type:'CLEAR_CART'})
  }

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearcart
  };

  

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
