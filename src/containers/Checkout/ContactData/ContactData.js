import React, { useState } from 'react';
import { connect } from "react-redux";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {

    const [ orderForm, setOrderForm ] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        });

    const [ formIsValid, setFormIsValid ] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        const orderFormKeys = Object.keys(orderForm);
        for (let index = 0; index < orderFormKeys.length; index++) {
            formData[orderFormKeys[index]] = orderForm[orderFormKeys[index]].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onPurchaseBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        const orderFormKeys = Object.keys(updatedOrderForm);
        for (let index = 0; index < orderFormKeys.length; index++) {
            formIsValid = updatedOrderForm[orderFormKeys[index]].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };


    const formElements = [];
    // for (let key in this.state.orderForm) {
    const formKeys = Object.keys(orderForm);
    for (let i = 0; i < formKeys.length; i++) {
        formElements.push({
            id:  formKeys[i],
            config: orderForm[formKeys[i]]
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
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={ (event) =>  inputChangedHandler(event, formElement.id) }
                />
            ))}

            <Button className={classes.Input} buttonType="Success" disabled={!formIsValid} clicked={orderHandler} >ORDER</Button>
        </form>
    );

    if(props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData} >
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));