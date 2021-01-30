import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/index";
import { editFilters } from "../../../actions/filters";

type Props = PropsFromRedux;
const SearchMenu = ({ editFilters, search }: Props) => {
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
const mapStateToProps = (state: RootState) => ({
    search: state.filters.filters.search,
});
const connector = connect(mapStateToProps, { editFilters });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SearchMenu);
