import { useContext, useEffect, useState, useRef} from "react";
import MenuContext from "../Store/MenuContext";
import AddonField from "./AddonField";

const CustomizeColumn = () => {
    const ctx = useContext(MenuContext);
    const ref = useRef();
    const sizeRef = useRef();
    const blendRef = useRef();
    const flavorRef = useRef();
    const quantityRef = useRef();

    const [size, setSize] = useState(0);

    useEffect(() => {
        setSize(0)
        if (ctx.item.id) {
            ref.current.reset()
        }
    }, [ctx.item])

    const changeSize = (size) => {
        const selectedSize = ctx.item.sizes.findIndex((indSize) => {
            return indSize.id === size
        })

        setSize(selectedSize)
    }

    const submit = (e) => {
        e.preventDefault();

        var cartedItem = {
            id: (Math.random() * 100) + Math.random(),
            item: ctx.item.type,
            size: sizeRef.current && sizeRef.current.value,
            blend: blendRef.current && blendRef.current.value,
            flavor: flavorRef.current && flavorRef.current.value,
            ogPrice: ctx.item.sizes[size].price,
            price: ctx.item.sizes[size].price,
            calories: ctx.item.sizes[size].calories,
            quantity: quantityRef.current.value,
            addons: []
        }

        const nodeList = [...ref.current.childNodes]
        nodeList.forEach((node) => {
            if (node.localName === "fieldset") {
                const innerNodes = [...node.childNodes]
                innerNodes.forEach((row) => {
                    if (row.className === "addonRow" && row.childNodes[1].value !== "0") {
                        cartedItem.addons.push({
                            key: row.childNodes[0].childNodes[0].innerText,
                            val: row.childNodes[1].value,
                        })
                        cartedItem.calories = +(cartedItem.calories + (+row.dataset.cal * +row.childNodes[1].value)).toFixed(2)

                        if (+row.dataset.price > 0.01) {
                            cartedItem.price = +(cartedItem.price + (+row.dataset.price * +row.childNodes[1].value)).toFixed(2)
                        }
                    }
                })
            }
        })

        cartedItem.calories = cartedItem.calories.toFixed(0)
        cartedItem.ogPrice = cartedItem.price
        cartedItem.price = cartedItem.price * cartedItem.quantity

        ctx.addToCart(cartedItem)
    }

    return (
        <section className="customizeColumn">
            {ctx.item.id && 
            <div className="indWrapper">
                <img src="/assets/placeholder.png" alt="Placeholder" />
                <div className="titleDiv">
                    <p>{ctx.item.type}</p>
                    { ctx.item.sizes[size] &&
                    <ul>
                        <li className="price">${ctx.item.sizes[size].price}</li>
                        <li className="cal">{ctx.item.sizes[size].calories} Cal</li>
                    </ul>
                    }
                </div>
                <form onSubmit={submit} ref={ref}>
                    {ctx.item.blend && 
                    <div className="dropRow">
                        <label htmlFor="blend">Blend</label>
                        <select ref={blendRef} id="blend">
                        {ctx.item.blend.map((blend) => {
                            return <option key={blend} value={blend}>{blend}</option>
                        })}
                        </select>
                    </div>}
                    {ctx.item.flavors && 
                    <div className="dropRow">
                        <label htmlFor="flavor">Flavor</label>
                        <select ref={flavorRef} id="flavor">
                        {ctx.item.flavors.map((blend) => {
                            return <option key={blend} value={blend}>{blend}</option>
                        })}
                        </select>
                    </div>}
                    {ctx.item.sizes[0].id !== "One Size" && <div className="dropRow">
                    <label htmlFor="size">Size</label>
                    <select ref={sizeRef} id="size" onChange={(e) => changeSize(e.target.value)}>
                        {ctx.item.sizes.map((size) => {
                            return <option key={size.id} value={size.id}>{size.id}</option>
                        })}
                    </select>
                    </div>}
                    {!ctx.item.noAddons &&
                        ctx.addons.map((addonCat) => {
                            return (
                                <AddonField key={addonCat.id} addonCat={addonCat} />
                            )
                        })
                    }
                    <div className="cartRow">
                        <button type="submit" className="submitButton">Add to Order</button>
                        <label htmlFor="quantity" className="sr-only">Quantity</label>
                        <input ref={quantityRef} type="number" id="quantity" defaultValue="1" min="1" max="5" />
                    </div>
                </form>
            </div>
            }
        </section>
    )
}

export default CustomizeColumn