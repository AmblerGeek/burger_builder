import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {... }
    // }

    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(ingredientKey => {
           return ingredients[ingredientKey];
        }).reduce((sum, element) => {
            return sum + element;
        } , 0);
        return sum > 0;
    }

    //addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
        // this.updatePurchaseState(updatedIngredients);
    //};

    //removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // if(oldCount <= 0 ) {
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceDeduction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;
        // this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
        // this.updatePurchaseState(updatedIngredients);
    //};

    purchaseHandler = () => {
        this.setState( {purchasing: true} );
    };

    purchaseCancelHandler = () => {
        this.setState( {purchasing: false} );
    };

    purchaseContinueHandler = () => {

        // const queryParams = [];
        //
        // // for (let i in this.state.ingredients) {
        //
        // const ingredientKeys = Object.keys(this.state.ingredients);
        // for(let i = 0; i < ingredientKeys.length; i++) {
        //     queryParams.push(encodeURIComponent(ingredientKeys[i]) + '=' + encodeURIComponent(this.state.ingredients[ingredientKeys[i]]));
        // }
        // queryParams.push(encodeURIComponent("price") + '=' + encodeURIComponent(this.state.totalPrice));
        // const queryString = queryParams.join('&');

        this.props.history.push('/checkout');
    };

    // componentDidMount() {
    //     axios.get('/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data});
    //         })
    //         .catch(error => {
    //             this.setState({ error: true });
    //         });
    // }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        const disabledKeys = Object.keys(disabledInfo);
        for(let index = 0; index < disabledKeys.length; index++ ) {
            disabledInfo[disabledKeys[index]] = (disabledInfo[disabledKeys[index]] <= 0);
        }

        let orderSummary = null;

        let burger = this.state.error ?  <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));