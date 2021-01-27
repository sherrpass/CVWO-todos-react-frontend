import React, { Component } from "react";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import Todos from "./Todos";
import { RootState } from "../../store/index";
type Props = PropsFromRedux;
class BoardMainSection extends Component<Props> {
    render() {
        return (
            <div className="board__main-section">
                {this.props.filters.sortBy === "dueBy" ? (
                    ["overdue", "dueToday", "upcoming", "unscheduled"].map(
                        (dueByItem) => {
                            return this.props.filters.filters.dueBy.includes(
                                dueByItem
                            ) ? (
                                <Todos dueBy={dueByItem} key={dueByItem} />
                            ) : null;
                        }
                    )
                ) : (
                    <Todos />
                )}
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        filters: state.filters,
    };
}
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BoardMainSection);
