import { useContext } from "react";
import MenuContext from "../Store/MenuContext";

const ItemColumn = () => {

    const ctx = useContext(MenuContext);

    const changeItem = (id) => {

        const catIndex = ctx.category.findIndex((indCategory) => {
            return indCategory.id === id
        })

        ctx.setItem(ctx.category[catIndex])

    }

    return (
        <section className="itemColumn">

            { ctx.category.length > 0 && ctx.category.map((item) => {
                return (
                    <button key={item.id} onClick={() => changeItem(item.id)}>
                        <img src="/assets/placeholder.png" alt="Placeholder"  />
                        {item.type}
                    </button>
                )
            }) }

        </section>
    )

}


export default ItemColumn