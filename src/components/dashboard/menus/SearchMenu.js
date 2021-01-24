import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editFilters } from "../../../actions/filters";

const SearchMenu = ({ editFilters, search }) => {
    return (
        <>
            <div className="menu-title">Search</div>
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                    type="text"
                    autoFocus
                    className="form-control"
                    placeholder="Title"
                    value={search || ""}
                    onChange={(e) => {
                        editFilters({
                            search: e.target.value,
                        });
                    }}
                />
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    search: state.filters.filters.search,
});
export default connect(mapStateToProps, { editFilters })(SearchMenu);
