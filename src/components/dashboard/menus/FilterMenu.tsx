import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/index";
import { editFilters } from "../../../actions/filters";

type DueBy = "overdue" | "dueToday" | "upcoming" | "unscheduled";
type Props = PropsFromRedux;
class FilterMenu extends Component<Props> {
    dueByIncludes = (str: DueBy) => {
        return this.props.filters.dueBy.includes(str)
            ? "menu-column__item selected"
            : "menu-column__item";
    };
    includeMixin = (bool: boolean) => {
        return bool ? "menu-column__item selected" : "menu-column__item";
    };
    onDueByClick = (dueCat: DueBy) => {
        if (this.props.filters.dueBy.includes(dueCat)) {
            this.props.editFilters({
                dueBy: this.props.filters.dueBy.filter(
                    (dueBy: DueBy) => dueBy !== dueCat
                ),
            });
        } else {
            this.props.editFilters({
                dueBy: [...this.props.filters.dueBy, dueCat],
            });
        }
    };
    onImportanceClick = (impt: "important" | "all") => {
        this.props.editFilters({
            importance: impt,
        });
    };
    onCompletionClick = (status: "completed" | "uncompleted" | "all") => {
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

function mapStateToProps(state: RootState) {
    return {
        filters: state.filters.filters,
    };
}
const connector = connect(mapStateToProps, { editFilters });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(FilterMenu);
