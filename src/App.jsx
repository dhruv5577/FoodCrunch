import CartHandle from "./components/CartHandle.jsx";
import Checkout from "./components/Checkout.jsx";
import DashBoard from "./components/DashBoard";
import Header from "./components/Header";
import {CartContextProvider} from './store/CartContext.jsx'
import { ProgressCounterProvider } from "./store/ProgressCounter.jsx";

function App() {
  return (
    <ProgressCounterProvider>
    <CartContextProvider>
      <Header/>
      <DashBoard/>
      <CartHandle/>
      <Checkout/>
    </CartContextProvider>
    </ProgressCounterProvider>
  );
}

export default App;
