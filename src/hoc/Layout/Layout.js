import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState( { showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState( (prevSate) => {
            return {showSideDrawer: !prevSate.showSideDrawer };
        });
    };

    render () {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}


const mapStateToProps = state => {
    return {
        isAuthenticated: (state.auth.token !== null)
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email, password, isNewUser) => dispatch(actions.auth(email, password, isNewUser))
//     };
// };

export default connect(mapStateToProps)(Layout);