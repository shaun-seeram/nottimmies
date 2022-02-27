import MenuContext from "../Store/MenuContext";
import { useContext } from "react";

const Addons = () => {

    const ctx = useContext(MenuContext);

    return (
       <>
        {ctx.addons.map((addon) => {
            return (
                <h2>{addon.id}</h2>
            )
        })}
       </>
    )
}

export default Addons