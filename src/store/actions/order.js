import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    };
};

export const purchaseBurgerBegin = () => {
    return {
      type: actionTypes.PURCHASE_BURGER_BEGIN
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerBegin());
        axios.post('/order.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error));
            });
    }

};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};