import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street1: '',
            postalCode:''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState( { loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max S',
                address: {
                    line1: '1 Test Street',
                    line2: '',
                    city: 'Mount Laurel',
                    stateProvince: 'NJ',
                    postalCode: '08054',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'Express'
        };

        axios.post('/order.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street1" placeholder="Your street address" />
            <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" />
            <Button className={classes.Input} buttonType="Success" clicked={this.orderHandler} >ORDER</Button>
        </form>
        );

        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData} >
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };

}

export default ContactData;