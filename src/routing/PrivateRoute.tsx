//@ts-ignore
import { Route, Redirect } from "react-router-dom";
import React from "react";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/index";
import Loading from "../components/layout/Loading";

type Props = PropsFromRedux & {
    component: React.ComponentType;
};
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}: Props) => {
    return (
        <Route
            {...rest}
            render={(props: Object) => {
                if (loading) {
                    return <Loading />;
                } else {
                    if (isAuthenticated) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect to="/login" />;
                    }
                }
            }}
        />
    );
};

const mapStateToProps = (state: RootState) => {
    return { auth: state.auth };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PrivateRoute);
