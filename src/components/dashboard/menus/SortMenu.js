import React from "react";
import { connect } from "react-redux";
import { sortBy } from "../../../actions/filters";
const SortMenu = ({ sortBy, sortMethod }) => {
    const includeMixin = (bool) => {
        return bool ? "menu-column__item selected" : "menu-column__item";
    };
    return (
        <>
            <div className="menu-title">Sort By</div>
            <div className="menu-row">
                <div className="menu-column">
                    <div className="menu-column__items">
                        <div
                            onClick={() => {
                                sortBy("name");
                            }}
                            className={includeMixin(sortMethod === "name")}
                        >
                            Name
                        </div>
                        <div
                            onClick={() => {
                                sortBy("dueBy");
                            }}
                            className={includeMixin(sortMethod === "dueBy")}
                        >
                            Due Date
                        </div>
                        <div
                            onClick={() => {
                                sortBy("createdAt");
                            }}
                            className={includeMixin(sortMethod === "createdAt")}
                        >
                            Created Date
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    sortMethod: state.filters.sortBy,
});
export default connect(mapStateToProps, { sortBy })(SortMenu);
