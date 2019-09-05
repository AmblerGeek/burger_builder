import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState  = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (actionTypes) {
        case actionTypes.PURCHASE_INIT:
            return  {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_BEGIN:
            return  {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log(action);
            const successfulOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(successfulOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return  state;
    }
};

export default reducer;