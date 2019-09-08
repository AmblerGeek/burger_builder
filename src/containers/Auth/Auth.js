import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import axios from "../../axios-orders";

class Auth extends Component {

    state = {
      controls: {
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email Address'
              },
              value: '',
              validation: {
                  required: true,
                  isEmail: true
              },
              valid: false,
              touched: false
          },
          password: {
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  placeholder: 'Your Password'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 7
              },
              valid: false,
              touched: false
          }
        },
        isNewUser: false
    };

    componentDidMount() {
        if(!this.props.burgerBuilder && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }

    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isNewUser);
    };

    switchAuthModeHandler = () => {
        this.setState( previousState => {
            return {isNewUser: !previousState.isNewUser}
        });
    };

    render() {

        const formElements = [];
        const formKeys = Object.keys(this.state.controls);
        for (let i = 0; i < formKeys.length; i++) {
            formElements.push({
                id:  formKeys[i],
                config: this.state.controls[formKeys[i]]
            });
        }

        let form = formElements.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={ (event) =>  this.inputChangedHandler(event, formElement.id) }
            />
        ));

        if(this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                    <br />
                    <Button
                        buttonType="Danger"
                        clicked={this.switchAuthModeHandler}
                    >{this.state.isNewUser ? 'Sign In' : 'Create New User'}</Button>
                </form>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: (state.auth.token !== null),
        openOrder: state.burgerBuilder.openOrder,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isNewUser) => dispatch(actions.auth(email, password, isNewUser)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));

export default connect(mapStateToProps, mapDispatchToProps)(Auth);