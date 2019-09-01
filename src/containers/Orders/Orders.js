import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchOrders = [];
                const dataKeys = Object.keys(response.data);
                for(let i = 0; i < dataKeys.length; i++) {
                    fetchOrders.push({
                        ...response.data[dataKeys[i]],
                        id: dataKeys[i]
                    });
                }

                //console.log(fetchOrders);

                this.setState({ orders: fetchOrders, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    };
}

export default withErrorHandler(Orders, axios);