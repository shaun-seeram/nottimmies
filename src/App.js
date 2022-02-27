import './App.css';
import CategoryColumn from './Components/CategoryColumn';
import ItemColumn from './Components/ItemColumn';
import CustomizeColumn from './Components/CustomizeColumn';
import MenuProvider from './Store/MenuProvider';
import CartButton from './Components/CartButton';
import Cart from './Components/Cart';
import { useState } from 'react';

function App() {

  const [showCart, setShowCart] = useState(false);

  const setCart = () => {
    setShowCart((curr) => {
      return !curr
    })
  }

  return (
  <MenuProvider>
    <header>
        <div className="wrapper">
          <h1>notTimmies</h1>
          <CartButton setCart={setCart} />
        </div>
      </header>
      <main className='wrapper'>
          <CategoryColumn/>
          <ItemColumn />
          <CustomizeColumn />
      </main>
      {showCart && <Cart setCart={setCart} />}
  </MenuProvider>
  );
}

export default App;
