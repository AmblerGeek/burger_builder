import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";

import * as actions from "../../../store/actions";

const Logout = props =>  {

    const { onLogout } = props;

    useEffect(() => {
        onLogout();
    }, [ onLogout ]);

    return <Redirect to="/" />;
};


// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
