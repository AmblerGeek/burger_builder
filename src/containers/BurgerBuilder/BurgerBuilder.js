import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {

    const [ purchasing, setPurchasing ] = useState(false);

    const dispatch = useDispatch();
    const ingredients = useSelector(state => { return state.burgerBuilder.ingredients; });
    const price = useSelector(state => { return state.burgerBuilder.totalPrice; });
    const error = useSelector(state => { return state.burgerBuilder.error; });
    const isAuthenticated = useSelector(state => { return  (state.auth.token !== null); });

    const onIngredientAdded = ingredientName => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = ingredientName => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirect(path));

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
           return ingredients[ingredientKey];
        }).reduce((sum, element) => {
            return sum + element;
        } , 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push("/auth");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    useEffect(() => {
        onInitIngredients();
    }, [ onInitIngredients ]);


    const disabledInfo = {
        ...ingredients
    };

    const disabledKeys = Object.keys(disabledInfo);
    for(let index = 0; index < disabledKeys.length; index++ ) {
        disabledInfo[disabledKeys[index]] = (disabledInfo[disabledKeys[index]] <= 0);
    }

    let orderSummary = null;

    let burger = error ?  <p>Ingredients can't be loaded</p> : <Spinner />;

    if(props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchaseable={updatePurchaseState(ingredients)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price}
        />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: (state.auth.token !== null)
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
//         onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
//     };
// };

export default withErrorHandler(BurgerBuilder, axios);