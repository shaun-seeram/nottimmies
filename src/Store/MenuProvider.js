import MenuContext from "./MenuContext"
import { useState, useEffect, useReducer } from "react";

const MenuProvider = (props) => {

    const [menu, setMenu] = useState([]);
    const [addons, setAddons] = useState([]);
    const [category, setCategory] = useState([]);
    const [item, setItem] = useState([]);

    const defaultCartState = {
        items: [],
        quantity: 0
    }

    const cartReducer = (prevState, action) => {

        if (action.type === "ADD") {
            const newCart = [...prevState.items]
            newCart.push(action.value)

            return {
                items: newCart,
                quantity: newCart.length
            }
        }

        if (action.type === "INCR") {
            
            const newCart = [...prevState.items]
            const index = prevState.items.findIndex((item) => {
                return item.id === action.id
            })

            const itemCopy = {...newCart[index]}

            if (itemCopy.quantity < 5) {
                itemCopy.quantity = +itemCopy.quantity + 1
                itemCopy.price = (+itemCopy.ogPrice * +itemCopy.quantity).toFixed(2)
            }

            newCart[index] = itemCopy

            return {
                items: newCart,
                quantity: newCart.length
            }
        }

        if (action.type === "DECR") {

            const newCart = [...prevState.items]
            const index = prevState.items.findIndex((item) => {
                return item.id === action.id
            })

            const itemCopy = {...newCart[index]}

            if (itemCopy.quantity === 1 || itemCopy.quantity === "1") {
                newCart.splice(index, 1)
            }

            if (itemCopy.quantity > 1) {
                itemCopy.quantity = +itemCopy.quantity - 1
                itemCopy.price = (+itemCopy.ogPrice * +itemCopy.quantity).toFixed(2)
                newCart[index] = itemCopy
            }


            return {
                items: newCart,
                quantity: newCart.length
            }

        }

        return defaultCartState

    }

    const addToCart = (item) => {
        cartDispatchAction({
            type: "ADD",
            value: item,
        })
    }

    const incrItem = (id) => {
        cartDispatchAction({
            type: "INCR",
            id
        })
    }

    const decrItem = (id) => {
        cartDispatchAction({
            type: "DECR",
            id
        })
    }

    const [cartState, cartDispatchAction] = useReducer(cartReducer, defaultCartState);

    useEffect(() => {

      fetch("https://nottimmies-default-rtdb.firebaseio.com/.json").then((data) => {
        return data.json()
      }).then((data) => {
        setAddons(data.Addons)
        setMenu(data.Menu)
      })

    }, []);


    const context = {
        addons,
        menu,
        category,
        item,
        cartState,
        setCategory,
        setItem,
        addToCart,
        incrItem,
        decrItem
    }

    return (
        <MenuContext.Provider value={context}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuProvider