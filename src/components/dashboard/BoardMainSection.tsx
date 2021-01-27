import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import Todos from "./Todos";
import { RootState } from "../../store/index";
type DueBy = "overdue" | "dueToday" | "upcoming" | "unscheduled";
type Props = PropsFromRedux;
class BoardMainSection extends Component<Props> {
    dueByCats: DueBy[] = ["overdue", "dueToday", "upcoming", "unscheduled"];
    render() {
        return (
            <div className="board__main-section">
                {this.props.filters.sortBy === "dueBy" ? (
                    this.dueByCats.map((dueByItem: DueBy) => {
                        return this.props.filters.filters.dueBy.includes(
                            dueByItem
                        ) ? (
                            <Todos dueBy={dueByItem} key={dueByItem} />
                        ) : null;
                    })
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
