import React, { Component } from "react";
import { connect } from "react-redux";
import { editFilters } from "../../../actions/filters";

class FilterMenu extends Component {
    dueByIncludes = (str) => {
        return this.props.filters.dueBy.includes(str)
            ? "menu-column__item selected"
            : "menu-column__item";
    };
    includeMixin = (bool) => {
        return bool ? "menu-column__item selected" : "menu-column__item";
    };
    onDueByClick = (dueCat) => {
        if (this.props.filters.dueBy.includes(dueCat)) {
            this.props.editFilters({
                dueBy: this.props.filters.dueBy.filter(
                    (dueBy) => dueBy !== dueCat
                ),
            });
        } else {
            this.props.editFilters({
                dueBy: [...this.props.filters.dueBy, dueCat],
            });
        }
    };
    onImportanceClick = (impt) => {
        this.props.editFilters({
            importance: impt,
        });
    };
    onCompletionClick = (status) => {
        this.props.editFilters({
            completion: status,
        });
    };
    render() {
        return (
            <>
                <div className="menu-title">Filters</div>
                <div className="menu-row">
                    <div className="menu-column">
                        <div className="menu-column__title">Due Date</div>
                        <div className="menu-column__items">
                            <div
                                onClick={() => {
                                    this.onDueByClick("overdue");
                                }}
                                className={this.dueByIncludes("overdue")}
                            >
                                Overdue
                            </div>
                            <div
                                onClick={() => {
                                    this.onDueByClick("dueToday");
                                }}
                                className={this.dueByIncludes("dueToday")}
                            >
                                Today
                            </div>
                            <div
                                onClick={() => {
                                    this.onDueByClick("upcoming");
                                }}
                                className={this.dueByIncludes("upcoming")}
                            >
                                Upcoming
                            </div>
                            <div
                                onClick={() => {
                                    this.onDueByClick("unscheduled");
                                }}
                                className={this.dueByIncludes("unscheduled")}
                            >
                                Unscheduled
                            </div>
                        </div>
                    </div>
                    <div className="menu-column">
                        <div className="menu-column__title">Completion</div>
                        <div className="menu-column__items">
                            <div
                                onClick={() => {
                                    this.onCompletionClick("uncompleted");
                                }}
                                className={this.includeMixin(
                                    this.props.filters.completion ===
                                        "uncompleted"
                                )}
                            >
                                Uncompleted
                            </div>
                            <div
                                onClick={() => {
                                    this.onCompletionClick("completed");
                                }}
                                className={this.includeMixin(
                                    this.props.filters.completion ===
                                        "completed"
                                )}
                            >
                                Completed
                            </div>
                            <div
                                onClick={() => {
                                    this.onCompletionClick("all");
                                }}
                                className={this.includeMixin(
                                    this.props.filters.completion === "all"
                                )}
                            >
                                All
                            </div>
                        </div>
                    </div>
                    <div className="menu-column">
                        <div className="menu-column__title">Importance</div>
                        <div className="menu-column__items">
                            <div
                                onClick={() => {
                                    this.onImportanceClick("important");
                                }}
                                className={this.includeMixin(
                                    this.props.filters.importance ===
                                        "important"
                                )}
                            >
                                Important
                            </div>
                            <div
                                onClick={() => {
                                    this.onImportanceClick("all");
                                }}
                                className={this.includeMixin(
                                    this.props.filters.importance === "all"
                                )}
                            >
                                All
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters.filters,
    };
}

export default connect(mapStateToProps, { editFilters })(FilterMenu);
