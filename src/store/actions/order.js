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

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerBegin());
        axios.post('/order.json?auth=' + token, orderData)
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

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersBegin());
        const queryParameters = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/order.json' + queryParameters)
            .then(response => {
                const fetchOrders = [];
                const dataKeys = Object.keys(response.data);
                for (let i = 0; i < dataKeys.length; i++) {
                    fetchOrders.push({
                        ...response.data[dataKeys[i]],
                        id: dataKeys[i]
                    });
                }

                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailure(error));
            });
    }
};

export const fetchOrdersSuccess = (orders) => {
    console.log('fetchOrdersSuccess called', orders);
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error
    };
};

export const fetchOrdersBegin = () => {
    return {
        type: actionTypes.FETCH_ORDERS_BEGIN
    };
};