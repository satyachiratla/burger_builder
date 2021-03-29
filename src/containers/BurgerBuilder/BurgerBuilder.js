import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    'salad': 0.3,
    'meat': 1,
    'cheese': 0.1,
    'bacon': 0.5,
}


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        this.setState({loading: true});
        //alert('!You Continue');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Vivek Chowdary',
                address: {
                    area: 'Peddada',
                    town: 'Kakinada',
                    zipcode: 533344,
                },
                email: 'vivekchowdary77@gmail.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {
        let orderSummary = null;

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if(this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinuueHandler} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);