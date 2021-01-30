import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/index";
import { sortBy } from "../../../actions/filters";

type Props = PropsFromRedux;
const SortMenu = ({ sortBy, sortMethod }: Props) => {
    const includeMixin = (bool: boolean) => {
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
const mapStateToProps = (state: RootState) => ({
    sortMethod: state.filters.sortBy,
});
const connector = connect(mapStateToProps, { sortBy });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SortMenu);
