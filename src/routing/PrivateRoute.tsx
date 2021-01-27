import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/index";
import Loading from "../components/layout/Loading";

type Props = PropsFromRedux & {
    component: React.ReactNode;
    exact: boolean;
    path: string;
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
                        //@ts-ignore
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
