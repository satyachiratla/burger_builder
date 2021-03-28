import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    'salad': 2,
    'meat': 4,
    'cheese': 1.5,
    'bacon': 4.5
}


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)
            this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldConunt = this.state.ingredients[type];
        const updatedCount = oldConunt + 1;
        const updatedIngrediets = {
            ...this.state.ingredients
        }
        updatedIngrediets[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngrediets });
        this.updatePurchaseState(updatedIngrediets);
    }

    removeIngredientHandler = (type) => {
        const oldConunt = this.state.ingredients[type];
        if (oldConunt <= 0) {
            return;
        }
        const updatedCount = oldConunt - 1;
        const updatedIngrediets = {
            ...this.state.ingredients
        }
        updatedIngrediets[type] = updatedCount;
        const priceRedution = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceRedution;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngrediets});
        this.updatePurchaseState(updatedIngrediets);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuueHandler = () => {
        alert('!You Continue');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinuueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                addedIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;