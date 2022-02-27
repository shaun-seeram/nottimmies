import { useContext, useState } from "react";
import MenuContext from "../Store/MenuContext";

const CategoryColumn = () => {

    const ctx = useContext(MenuContext);
    const [isOpen, setIsOpen] = useState(false);

    const changeCategory = (id) => {

        setIsOpen(false)
        const catIndex = ctx.menu.findIndex((indCategory) => {
            return indCategory.id === id
        })

        ctx.setCategory(ctx.menu[catIndex].data)
        ctx.setItem([])
    }

    const openMenu = () => {
        setIsOpen((prev) => !prev )
    }


    return (
        <section style={isOpen ? {left: "0"} : {left: "-40%"}} className="categoryColumn">
            {ctx.menu.map((item) => {
                return (
                    <button key={item.id} onClick={() => changeCategory(item.id)}>{item.id}</button>
                )
            })}

            <button onClick={openMenu} className="mobileMenuButton">Menu</button>

        </section>
    )
}

export default CategoryColumn