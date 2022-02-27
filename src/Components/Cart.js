import { useContext } from 'react';
import MenuContext from '../Store/MenuContext';

const Cart = ({setCart}) => {

    const ctx = useContext(MenuContext);

    return (
        <div className="cartModule" onClick={setCart}>
            <div className="cartModuleInner" onClick={(e) => e.stopPropagation()}>
                <h2>Cart</h2>
                {ctx.cartState.items.map((item) => {
                    return (
                        <div key={item.id} className='cartItem'>
                            <div className='cartItem-row1'>
                                <p>{item.quantity}x {item.size !== "One Size" && item.size}{item.flavor && item.flavor} {item.item} {item.blend && `- ${item.blend}`}</p>
                                <p>{item.calories} cal/ea</p>
                            </div>
                            <div className='cartItem-custom'>
                                {item.addons.map((element) => {
                                    return (
                                        <p key={element.key}>- {element.val}x {element.key}</p>
                                    )
                                })}
                            </div>
                            <div className='cartItem-total'>
                                <p>Item Total</p>
                                <p>{item.price}</p>
                            </div>
                            <div className='cartItem-buttons'>
                                <button onClick={() => ctx.incrItem(item.id)}>+</button>
                                <button onClick={() => ctx.decrItem(item.id)}>-</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cart