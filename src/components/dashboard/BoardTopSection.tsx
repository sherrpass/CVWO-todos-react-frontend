import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { sortBy, editFilters } from "../../actions/filters";
import {
    editCategory,
    deleteCategory,
    setCurrCategory,
} from "../../actions/categories";
import { addTodo } from "../../actions/todos";
import Modal from "react-modal";
import SortMenu from "./menus/SortMenu";
import FilterMenu from "./menus/FilterMenu";
import SearchMenu from "./menus/SearchMenu";
import CategoryForm from "./forms/CategoryForm";
import TodoForm from "./forms/TodoForm";
import { RootState } from "../../store";
import { Category, TodoRequest } from "../../allTypes";

type Props = PropsFromRedux;
type State = {
    menus: {
        showCatMenu: boolean;
        showFilterMenu: boolean;
        showSortMenu: boolean;
        showSearchMenu: boolean;
    };
    modals: {
        showCatModal: boolean;
        showDelCatModal: boolean;
        showTodoModal: boolean;
    };
    largeWidth: boolean;
};
class BoardTopSection extends Component<Props, State> {
    componentDidMount() {
        this.mm.addListener(this.handler);
    }
    componentWillUnmount() {
        this.mm.removeListener(this.handler);
    }
    catMenuButton: HTMLButtonElement | null = null;
    catMenu: HTMLDivElement | null = null;
    searchMenuButton: HTMLButtonElement | null = null;
    searchMenu: HTMLDivElement | null = null;
    filterMenuButton: HTMLButtonElement | null = null;
    filterMenu: HTMLDivElement | null = null;
    sortMenuButton: HTMLButtonElement | null = null;
    sortMenu: HTMLDivElement | null = null;
    state: State = {
        menus: {
            showCatMenu: false,
            showFilterMenu: false,
            showSortMenu: false,
            showSearchMenu: false,
        },
        modals: {
            showCatModal: false,
            showDelCatModal: false,
            showTodoModal: false,
        },
        largeWidth: window.matchMedia("(min-width: 1060px)").matches,
    };
    mm = window.matchMedia("(min-width: 1060px)");
    handler = (e: MediaQueryListEvent) =>
        this.setState(() => ({ largeWidth: e.matches }));
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
    closeCatMenu = (e?: MouseEvent) => {
        if (
            !e ||
            (this.catMenu &&
                this.catMenuButton &&
                !this.catMenu.contains(e.target as Node) &&
                !this.catMenuButton.contains(e.target as Node))
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
    openSearchMenu = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                menus: { ...prevState.menus, showSearchMenu: true },
            }),
            () => {
                document.addEventListener("click", this.closeSearchMenu);
            }
        );
    };
    closeSearchMenu = (e?: MouseEvent) => {
        if (
            !e ||
            (this.searchMenu &&
                this.searchMenuButton &&
                !this.searchMenu.contains(e.target as Node) &&
                !this.searchMenuButton.contains(e.target as Node))
        ) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    menus: { ...prevState.menus, showSearchMenu: false },
                }),
                () => {
                    document.removeEventListener("click", this.closeSearchMenu);
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
                document.addEventListener("click", this.closeFilterMenu);
            }
        );
    };
    closeFilterMenu = (e?: MouseEvent) => {
        if (
            !e ||
            (this.filterMenu &&
                this.filterMenuButton &&
                !this.filterMenu.contains(e.target as Node) &&
                !this.filterMenuButton.contains(e.target as Node))
        ) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    menus: { ...prevState.menus, showFilterMenu: false },
                }),
                () => {
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
    closeSortMenu = (e?: MouseEvent) => {
        if (
            !e ||
            (this.sortMenu &&
                this.sortMenuButton &&
                !this.sortMenu.contains(e.target as Node) &&
                !this.sortMenuButton.contains(e.target as Node))
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
    capitalise = (str: string) => {
        return str[0].toUpperCase() + str.substring(1);
    };

    closeCatModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showCatModal: false },
        }));
    };
    openCatModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showCatModal: true },
        }));
    };
    closeDelCatModal = (func = () => {}) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                modals: { ...prevState.modals, showDelCatModal: false },
            }),
            () => func()
        );
    };
    openDelCatModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showDelCatModal: true },
        }));
    };
    closeTodoModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showTodoModal: false },
        }));
    };
    openTodoModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showTodoModal: true },
        }));
    };
    delOnSubmit = () => {
        this.closeDelCatModal(() => {
            this.props.setCurrCategory(null);
            this.props.deleteCategory(this.props.category.id);
        });
    };
    render() {
        return (
            <>
                <div className="board__top-section">
                    <div
                        className={
                            "board__top-section--header" +
                            (this.state.largeWidth ? " large" : " small")
                        }
                    >
                        <div className="board__top-section--header-title">
                            <span className="heading-primary">
                                {this.props.category
                                    ? this.capitalise(this.props.category.name)
                                    : "Everything"}
                            </span>
                        </div>
                        <div>
                            {this.props.category ? (
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
                            ) : null}
                            {this.state.menus.showCatMenu &&
                            this.props.category ? (
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
                                        {/*HEREEEEEEEEEEEEEEEEEE*/}
                                        <i className="todo__icon fas fa-pen"></i>
                                    </span>
                                    <span
                                        className="catMenu__btn"
                                        onClick={this.openDelCatModal}
                                    >
                                        <i className="todo__icon fas fa-trash"></i>
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div
                        className={
                            "board__top-section--description" +
                            (this.state.largeWidth ? " large" : " small")
                        }
                    >
                        <span className="description">
                            {this.props.category
                                ? this.props.category.description
                                    ? this.props.category.description
                                    : "All tasks belonging to " +
                                      this.capitalise(this.props.category.name)
                                : "All of your tasks. Let's do this."}
                        </span>
                    </div>

                    {/*Filter Buttons*/}
                    <div className="board__top-section--filter">
                        <div
                            className={
                                "board__top-section--filter-wrapper" +
                                (this.state.largeWidth ? " large" : " small")
                            }
                        >
                            <div className="filter-buttons-wrapper">
                                <button
                                    className="btn-primary margin-right-sm"
                                    onClick={this.openTodoModal}
                                >
                                    + New Item
                                </button>
                                <button
                                    className="btn-secondary filter-btn"
                                    onClick={() =>
                                        !this.state.menus.showSearchMenu
                                            ? this.openSearchMenu()
                                            : this.closeSearchMenu()
                                    }
                                    ref={(e) => {
                                        this.searchMenuButton = e;
                                    }}
                                >
                                    <i className="fas fa-search"></i>
                                    <span className="margin-left-sm">
                                        {" "}
                                        Search
                                    </span>
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
                                    <span className="margin-left-sm">
                                        {" "}
                                        Filter
                                    </span>
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
                                    <span className="margin-left-sm">
                                        {" "}
                                        Sort
                                    </span>
                                </button>

                                {/*Menus*/}
                                {this.state.menus.showSearchMenu ? (
                                    <div
                                        className={
                                            "collaspible-menu search-menu" +
                                            (this.state.largeWidth
                                                ? " large"
                                                : " small")
                                        }
                                        ref={(e) => {
                                            this.searchMenu = e;
                                        }}
                                    >
                                        <SearchMenu />
                                    </div>
                                ) : null}
                                {this.state.menus.showFilterMenu ? (
                                    <div
                                        className={
                                            "collaspible-menu filter-menu" +
                                            (this.state.largeWidth
                                                ? " large"
                                                : " small")
                                        }
                                        ref={(e) => {
                                            this.filterMenu = e;
                                        }}
                                    >
                                        <FilterMenu />
                                    </div>
                                ) : null}
                                {this.state.menus.showSortMenu ? (
                                    <div
                                        className={
                                            "collaspible-menu sort-menu" +
                                            (this.state.largeWidth
                                                ? " large"
                                                : " small")
                                        }
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

                {/*Modals*/}
                <Modal
                    isOpen={this.state.modals.showCatModal}
                    className="my-modal add-edit-modal"
                    onRequestClose={this.closeCatModal}
                >
                    <CategoryForm
                        isEdit={true}
                        category={this.props.category}
                        closeModal={this.closeCatModal}
                        onSubmit={(category) => {
                            this.closeCatModal();
                            this.props.editCategory(
                                this.props.category.id,
                                category
                            );
                        }}
                    />
                </Modal>
                <Modal
                    isOpen={this.state.modals.showDelCatModal}
                    className="my-modal del-cat-modal"
                    //@ts-ignore
                    onRequestClose={this.closeDelCatModal}
                    ariaHideApp={false}
                >
                    <div className="del-title">
                        <span className="heading-secondary">
                            Delete this category
                        </span>{" "}
                        <br />
                        <span className="description">
                            (But not it's tasks)
                        </span>
                    </div>
                    <div className="del-btn-container">
                        <div className="del-centre">
                            <button
                                onClick={this.delOnSubmit}
                                className="margin-top-med btn-primary"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.modals.showTodoModal}
                    className="my-modal todo-modal"
                    onRequestClose={this.closeTodoModal}
                    ariaHideApp={false}
                >
                    <TodoForm
                        isEdit={false}
                        onSubmit={(todo: TodoRequest) => {
                            this.closeTodoModal();
                            this.props.addTodo(todo);
                        }}
                        closeModal={this.closeTodoModal}
                    />
                </Modal>
            </>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        category: state.category.categories.find(
            (category: Category) => category.id === state.category.currCategory
        ) as Category,
    };
}
const connector = connect(mapStateToProps, {
    sortBy,
    editFilters,
    editCategory,
    deleteCategory,
    setCurrCategory,
    addTodo,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BoardTopSection);
