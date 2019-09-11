import React, { useState } from 'react';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

const Layout = (props) => {

    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const sideDrawerCloseHandler = () => {
        setSideDrawerVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    };


    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer isAuth={props.isAuthenticated} open={sideDrawerVisible} closed={sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        isAuthenticated: (state.auth.token !== null)
    };
};

export default connect(mapStateToProps)(Layout);