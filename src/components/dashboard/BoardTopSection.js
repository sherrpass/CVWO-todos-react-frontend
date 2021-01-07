import React, { Component } from "react";
import { connect } from "react-redux";
import { sortBy, editFilters } from "../../actions/filters";

import SortMenu from "./menus/SortMenu";
import FilterMenu from "./menus/FilterMenu";
class BoardTopSection extends Component {
    state = {
        menus: {
            showCatMenu: false,
            showFilterMenu: false,
            showSortMenu: false,
        },
        modals: {
            showCatModal: false,
            showDeleteCatModal: false,
        },
    };
    openCatMenu = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                menus: { ...prevState.menus, showCatMenu: true },
            }),
            () => {
                document.addEventListener("click", this.closeCatMenu);
            }
        );
    };
    closeCatMenu = (e) => {
        if (
            !e ||
            (!this.catMenu.contains(e.target) &&
                !this.catMenuButton.contains(e.target))
        ) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    menus: { ...prevState.menus, showCatMenu: false },
                }),
                () => {
                    document.removeEventListener("click", this.closeCatMenu);
                }
            );
        }
    };
    openFilterMenu = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                menus: { ...prevState.menus, showFilterMenu: true },
            }),
            () => {
                console.log(this.state.menus.showFilterMenu);
                console.log("openFilterMenu");
                document.addEventListener("click", this.closeFilterMenu);
            }
        );
    };
    closeFilterMenu = (e) => {
        console.log("closed");
        if (
            !e ||
            (!this.filterMenu.contains(e.target) &&
                !this.filterMenuButton.contains(e.target))
        ) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    menus: { ...prevState.menus, showFilterMenu: false },
                }),
                () => {
                    console.log(this.state.menus.showFilterMenu);
                    console.log("closeFilterMenu");
                    document.removeEventListener("click", this.closeFilterMenu);
                }
            );
        }
    };
    openSortMenu = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                menus: { ...prevState.menus, showSortMenu: true },
            }),
            () => {
                document.addEventListener("click", this.closeSortMenu);
            }
        );
    };
    closeSortMenu = (e) => {
        if (
            !e ||
            (!this.sortMenu.contains(e.target) &&
                !this.sortMenuButton.contains(e.target))
        ) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    menus: { ...prevState.menus, showSortMenu: false },
                }),
                () => {
                    document.removeEventListener("click", this.closeSortMenu);
                }
            );
        }
    };
    capitalise = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    };
    render() {
        return (
            <div className="board__top-section">
                <div className="board__top-section--header">
                    <div className="board__top-section--header-title">
                        <span className="heading-primary">
                            {this.props.category
                                ? this.capitalise(this.props.category.name)
                                : "Everything"}
                        </span>
                    </div>
                    <div>
                        <button
                            className="btn-secondary board__top-section--header-more"
                            onClick={() =>
                                !this.state.menus.showCatMenu
                                    ? this.openCatMenu()
                                    : this.closeCatMenu()
                            }
                            ref={(e) => {
                                this.catMenuButton = e;
                            }}
                        >
                            <i className="fas fa-ellipsis-h fa-lg"></i>
                        </button>
                        {this.state.menus.showCatMenu ? (
                            <div
                                className="collaspible-menu cat-menu"
                                ref={(e) => {
                                    this.catMenu = e;
                                }}
                            >
                                <span
                                    onClick={this.openCatModal}
                                    className="catMenu__btn margin-left-sm"
                                >
                                    <i className="todo__icon fas fa-pen"></i>
                                </span>
                                <span className="catMenu__btn">
                                    <i className="todo__icon fas fa-trash"></i>
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="board__top-section--description">
                    <span className="description">
                        {this.props.category
                            ? this.props.category.description
                                ? this.props.category.description
                                : "All tasks belonging to " +
                                  this.capitalise(this.props.category.name)
                            : "All of your tasks. Let's do this."}
                    </span>
                </div>
                <div className="board__top-section--filter">
                    <div className="board__top-section--filter-wrapper">
                        <div className="filter-buttons-wrapper">
                            <button className="btn-primary margin-right-sm">
                                + New Item
                            </button>
                            <button
                                className="btn-secondary filter-btn"
                                onClick={() =>
                                    !this.state.menus.showFilterMenu
                                        ? this.openFilterMenu()
                                        : this.closeFilterMenu()
                                }
                                ref={(e) => {
                                    this.filterMenuButton = e;
                                }}
                            >
                                <i className="fas fa-filter"></i>
                                <span className="margin-left-sm"> Filter</span>
                            </button>

                            <button
                                className="btn-secondary filter-btn"
                                onClick={() =>
                                    !this.state.menus.showSortMenu
                                        ? this.openSortMenu()
                                        : this.closeSortMenu()
                                }
                                ref={(e) => {
                                    this.sortMenuButton = e;
                                }}
                            >
                                <i className="fas fa-sort"></i>
                                <span className="margin-left-sm"> Sort</span>
                            </button>
                            {this.state.menus.showFilterMenu ? (
                                <div
                                    className="collaspible-menu filter-menu"
                                    ref={(e) => {
                                        this.filterMenu = e;
                                    }}
                                >
                                    <FilterMenu />
                                </div>
                            ) : null}
                            {this.state.menus.showSortMenu ? (
                                <div
                                    className="collaspible-menu sort-menu"
                                    ref={(e) => {
                                        this.sortMenu = e;
                                    }}
                                >
                                    <SortMenu />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        category: state.category.categories.find(
            (category) => category.id === state.category.currCategory
        ),
    };
}

export default connect(mapStateToProps, { sortBy, editFilters })(
    BoardTopSection
);
