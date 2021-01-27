import React from "react";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import { Alert as AlertType } from "../../allTypes";

type Props = PropsFromRedux;

const Alert = ({ alerts }: Props) => {
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert: AlertType) => (
            <div key={alert.id} className={`my-alert ${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    );
};

const mapStateToProps = (state: RootState) => ({
    alerts: state.alerts,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Alert);
