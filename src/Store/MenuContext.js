import React from "react"

const MenuContext = React.createContext({
    addons: [],
    menu: [],
    category: {},
    item: {},
    setCategory: () => {},
    setItem: () => {}
})

export default MenuContext