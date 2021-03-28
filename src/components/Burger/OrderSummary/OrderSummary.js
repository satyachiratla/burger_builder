import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }
    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey} style={{textTransform: 'capitalize'}}><span>{igkey}</span>: {this.props.ingredients[igkey]}</li>
            )
        })
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with an ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p style={{fontWeight: 'bold'}}>Total Price: {this.props.price} </p>
            <p>Continue to Check?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
};

export default orderSummary;