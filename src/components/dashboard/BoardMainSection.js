import React, { Component } from "react";
import { connect } from "react-redux";
import Todos from "./Todos";
class BoardMainSection extends Component {
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

function mapStateToProps(state) {
    return {
        filters: state.filters,
    };
}

export default connect(mapStateToProps)(BoardMainSection);
