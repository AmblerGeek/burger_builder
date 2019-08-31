import React, { Component } from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {


        // componentDidMount runs after child objects are rendered.
        // In order to implement interceptors they must occur in componentWillMount or earlier
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };

            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState( { error: null });
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use( response => response, error => {
                this.setState( { error: error });
            });

            // this.checkVariable = "check";
        }


        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }

};

export default withErrorHandler;