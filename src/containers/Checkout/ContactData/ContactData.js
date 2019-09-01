import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                streetAddress1: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street Address 1'
                    },
                    value: ''
                },
                streetAddress2: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street Address 2'
                    },
                    value: ''
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'City'
                    },
                    value: ''
                },
                stateProvince: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'State'
                    },
                    value: ''
                },
                postalCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Postal Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                    },
                    value: ''
                }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState( { loading: true });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {

        const formElements = [];
        // for (let key in this.state.orderForm) {
        const formKeys = Object.keys(this.state.orderForm);
        for (let i = 0; i < formKeys.length; i++) {
            formElements.push({
                id:  formKeys[i],
                config: this.state.orderForm[formKeys[i]]
            });
        }

        let form = (
            <form>
                {formElements.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={ (event) =>  this.inputChangedHandler(event, formElement.id) }
                    />
                ))}

                {/*<Input elementType="..." elementConfig="..." value="..."*/}
                {/*    inputtype="input" className={classes.Input} type="text" name="name" placeholder="Your name" />*/}
                {/*<Input inputtype="input" className={classes.Input} type="email" name="email" placeholder="Your email" />*/}
                {/*<Input inputtype="input" className={classes.Input} type="text" name="street1" placeholder="Your street address" />*/}
                {/*<Input inputtype="input" className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" />*/}
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