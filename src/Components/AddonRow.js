const AddonRow = ({showField, indAddon}) => {
    return (
        <div className="addonRow" style={{display: !showField && "none"}} data-cal={indAddon.calories} data-price={indAddon.cost && indAddon.cost}>
            <ul>
                <li><label htmlFor={indAddon.type}>{indAddon.type}</label></li>
                <li className="cal">{indAddon.calories} cal {indAddon.cost && `- $${indAddon.cost.toFixed(2)}`}</li>
            </ul>
            <input type="number" id={indAddon.type} defaultValue="0" min="0" max="5" />
        </div>
    )
}

export default AddonRow