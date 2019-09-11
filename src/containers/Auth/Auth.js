import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";


const Auth = props =>  {

    const [controls, setControls ] = useState( {
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
        });

    const [ isNewUser, setIsNewUser ] = useState(false);

    const { burgerBuilder, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if(!burgerBuilder && authRedirectPath !== "/") {
            onSetAuthRedirectPath();
        }
    }, [ burgerBuilder, authRedirectPath, onSetAuthRedirectPath ]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        setControls(updatedControls);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      props.onAuth(controls.email.value, controls.password.value, isNewUser);
    };

    const switchAuthModeHandler = () => {
        setIsNewUser(!isNewUser);
    };

    const formElements = [];
    const formKeys = Object.keys(controls);
    for (let i = 0; i < formKeys.length; i++) {
        formElements.push({
            id:  formKeys[i],
            config: controls[formKeys[i]]
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
            changed={ (event) =>  inputChangedHandler(event, formElement.id) }
        />
    ));

    if(props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if(props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button buttonType="Success">Submit</Button>
                <br />
                <Button
                    buttonType="Danger"
                    clicked={switchAuthModeHandler}
                >{isNewUser ? 'Sign In' : 'Create New User'}</Button>
            </form>
        </div>
    );
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