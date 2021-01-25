import React from "react";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";

type Props = PropsFromRedux;
type AlertType = {
    id: number;
    msg: string;
    alertType: string;
};
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
