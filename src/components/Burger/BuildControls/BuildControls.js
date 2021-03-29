import React from 'react';
import BuildControl from '../BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
];

const BuildControls = (props) => (
    <div className="BuildControls">
        <p><strong>Current Price: {props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => {
            return <BuildControl key={ctrl.label} label={ctrl.label}
            added={() => props.addedIngredient(ctrl.type)}
            removed={() => props.removeIngredient(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        })}
        <button onClick={props.ordered} disabled={!props.purchasable} className="OrderButton">ORDER NOW</button>
    </div>
);

export default BuildControls;