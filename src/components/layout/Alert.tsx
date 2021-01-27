import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";

type Props = PropsFromRedux;

const Alert = ({ alerts }: Props) => {
    return alerts !== null && alerts.length > 0 ? (
        <div key={alerts[0].id} className={`my-alert ${alerts[0].alertType}`}>
            {alerts[0].msg}
        </div>
    ) : null;
};

const mapStateToProps = (state: RootState) => ({
    alerts: state.alerts,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Alert);
