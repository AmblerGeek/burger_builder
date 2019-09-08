import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState  = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    openOrder: false
};

const INGREDIENT_PRICES = {
    lettuce: 0.2,
    tomato: 0.3,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        openOrder: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        openOrder: true
    };
    return updateObject(state, updatedState);
};

const burgerBuilder = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, { ingredients: action.ingredients, totalPrice: 4, error: false, openOrder: false });
        case actionTypes.FETCH_INGREDIENTS_FAILURE:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default burgerBuilder;