import { useState } from "react"
import AddonRow from "./AddonRow"

const AddonField = ({addonCat}) => {

    const [showField, setShowField] = useState(false);

    const change = () => {
        setShowField((prev) => {
            return !prev
        })
    }

    return (
        <fieldset>
            <legend onClick={change}>{addonCat.id}<span>+</span></legend>
                {addonCat.data.map((indAddon) => {
                    return (
                        <AddonRow key={indAddon.id} showField={showField} indAddon={indAddon} />
                    )
                })}
        </fieldset>
    )
}

export default AddonField