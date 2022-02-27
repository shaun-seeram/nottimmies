import { useContext } from 'react';
import MenuContext from '../Store/MenuContext';

const CartButton = ({setCart}) => {

    const ctx = useContext(MenuContext);
    
    return (
        <button disabled={ctx.cartState.quantity === 0} onClick={setCart}><span className="iconify" data-icon="fluent:drink-coffee-16-filled"></span><span className="cartItems">{ctx.cartState.quantity}</span></button>
    )
}

export default CartButton