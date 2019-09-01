import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends  Component {

    state = {
        ingredients: null,
        price: 0
    };

    checkoutCancelled = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    componentDidMount() {
        const ingredients = {};
        let price = 0;

        new URLSearchParams(this.props.location.search).forEach( (value, key) => {
            if (key === 'price') {
                price = +value;
            } else {
                ingredients[key] = +value;
            }
        });

        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = +param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1]];
        //     }
        // }

        this.setState({ingredients: ingredients, price: price});
    };

    render() {
        return (
            <div>
                {this.state.ingredients ? <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                /> : null }
                <Route path={this.props.match.path + '/contact-data'} render={ (props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} /> } />
            </div>
        );
    };
}

export default Checkout;