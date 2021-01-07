import { DashboardOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import Modal from "react-modal";
import CategoryForm from "./CategoryForm";
import TodoForm from "./TodoForm";
class Dashboard extends Component {
    state = {
        menus: {
            showCatMenu: false,
            showFilterMenu: false,
            showSortMenu: false,
        },
        modals: {
            showCatModal: false,
            showDeleteCatModal: false,
            showTodoModal: false,
        },
    };
    openCatMenu = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                menus: { ...prevState.menus, showCatMenu: true },
            }),
            () => {
                console.log("here");
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
                console.log("here");
                document.addEventListener("click", this.closeFilterMenu);
            }
        );
    };
    closeFilterMenu = (e) => {
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
                console.log("here");
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
    render() {
        return (
            <>
                <div className="navigation">
                    <nav className="navigation__nav">
                        <div className="navigation__name">
                            <i className="fas fa-clipboard"></i> Todoit
                        </div>
                        <div className="navigation__list">
                            <a href="#" className="navigation__link">
                                Dashboard
                            </a>
                            <a href="#" className="navigation__link">
                                Pomodoro
                            </a>
                            <a href="#" className="navigation__link">
                                Logout <i className="fas fa-sign-out-alt"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="dashboard">
                    <div className="categories-sidebar">
                        <div className="categories-sidebar__top-section">
                            <div className="categories-sidebar__title-container">
                                <div className="heading-secondary">
                                    Categories
                                </div>
                            </div>
                            <div className="categories-sidebar__divider"></div>
                        </div>
                        <div className="categories-sidebar__main-section">
                            <div className="categories-sidebar__category_item--selected">
                                <div className="categories-sidebar__category_name">
                                    Everything
                                </div>
                            </div>
                            <div className="categories-sidebar__category_item">
                                <div className="categories-sidebar__category_name">
                                    Exercise
                                </div>
                            </div>
                            <div className="categories-sidebar__category_item">
                                <div className="categories-sidebar__category_name">
                                    School work
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="board">
                        <div className="board__top-section">
                            <div className="board__top-section--header">
                                <div className="board__top-section--header-title">
                                    <span className="heading-primary">
                                        Everything
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
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Urna duis convallis convallis tellus id.
                                    Eget egestas purus viverra accumsan in.
                                    Consequat semper viverra nam libero justo
                                    laoreet sit amet. Mauris cursus mattis
                                    molestie a iaculis at erat pellentesque
                                    adipiscing. Congue eu consequat ac felis
                                    donec et odio pellentesque diam.
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
                                        {this.state.menus.showFilterMenu ? (
                                            <div
                                                className="collaspible-menu filter-menu"
                                                ref={(e) => {
                                                    this.filterMenu = e;
                                                }}
                                            >
                                                <div className="menu-title">
                                                    Filters
                                                </div>
                                                <div className="menu-row">
                                                    <div className="menu-column">
                                                        <div className="menu-column__title">
                                                            Due Date
                                                        </div>
                                                        <div className="menu-column__items">
                                                            <div className="menu-column__item selected">
                                                                Overdue
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                Today
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                Upcoming
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                Unscheduled
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu-column">
                                                        <div className="menu-column__title">
                                                            Completion
                                                        </div>
                                                        <div className="menu-column__items">
                                                            <div className="menu-column__item">
                                                                Uncompleted
                                                            </div>
                                                            <div className="menu-column__item">
                                                                Completed
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                All
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu-column">
                                                        <div className="menu-column__title">
                                                            Importance
                                                        </div>
                                                        <div className="menu-column__items">
                                                            <div className="menu-column__item">
                                                                Important
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                All
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                        {this.state.menus.showSortMenu ? (
                                            <div
                                                className="collaspible-menu sort-menu"
                                                ref={(e) => {
                                                    this.sortMenu = e;
                                                }}
                                            >
                                                <div className="menu-title">
                                                    Sort By
                                                </div>
                                                <div className="menu-row">
                                                    <div className="menu-column">
                                                        <div className="menu-column__items">
                                                            <div className="menu-column__item">
                                                                Name
                                                            </div>
                                                            <div className="menu-column__item selected">
                                                                Due Date
                                                            </div>
                                                            <div className="menu-column__item">
                                                                Created Date
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="board__main-section">
                            <div className="todo__container">
                                <div className="todo__container-title">
                                    <i class="fas fa-caret-right margin-right-sm"></i>
                                    Overdue
                                </div>
                                <div className="todo__collaspsible">
                                    <div className="todo__item">
                                        <div className="todo__side-color"></div>
                                        <div className="todo__title">
                                            New Item
                                        </div>
                                        <div className="todo__others">
                                            <div className="todo__right todo__complete-true">
                                                <span>Done</span>
                                            </div>
                                            <div className="todo__right todo__date">
                                                <span>Dec 14, 2019</span>
                                            </div>
                                            <div className="appear-on-hover">
                                                <span className="todo__right todo__btn important-false">
                                                    <i className="todo__icon fas fa-exclamation-circle"></i>
                                                </span>
                                                <span className="todo__right todo__btn cart-false">
                                                    <i className="todo__icon fas fa-cart-plus"></i>
                                                </span>
                                                <span className="todo__right todo__btn delete">
                                                    <i className="todo__icon fas fa-trash"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo__item">
                                        <div className="todo__side-color"></div>
                                        <div className="todo__title">
                                            New Item
                                        </div>
                                        <div className="todo__others">
                                            <div className="todo__right todo__complete-true">
                                                <span>Done</span>
                                            </div>
                                            <div className="todo__right todo__date">
                                                <span>Dec 14, 2019</span>
                                            </div>
                                            <div className="appear-on-hover">
                                                <span className="todo__right todo__btn important-false">
                                                    <i className="todo__icon fas fa-exclamation-circle"></i>
                                                </span>
                                                <span className="todo__right todo__btn cart-false">
                                                    <i className="todo__icon fas fa-cart-plus"></i>
                                                </span>
                                                <span className="todo__right todo__btn delete">
                                                    <i className="todo__icon fas fa-trash"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo__item">
                                        <div className="todo__side-color"></div>
                                        <div className="todo__title">
                                            New Item
                                        </div>
                                        <div className="todo__others">
                                            <div className="todo__right todo__complete-true">
                                                <span>Done</span>
                                            </div>
                                            <div className="todo__right todo__date">
                                                <span>Dec 14, 2019</span>
                                            </div>
                                            <div className="appear-on-hover">
                                                <span className="todo__right todo__btn important-false">
                                                    <i className="todo__icon fas fa-exclamation-circle"></i>
                                                </span>
                                                <span className="todo__right todo__btn cart-false">
                                                    <i className="todo__icon fas fa-cart-plus"></i>
                                                </span>
                                                <span className="todo__right todo__btn delete">
                                                    <i className="todo__icon fas fa-trash"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="todo__container">
                                <div className="todo__container-title">
                                    <i class="fas fa-caret-right margin-right-sm"></i>
                                    Due Today
                                </div>
                                <div className="todo__item">
                                    <div className="todo__side-color"></div>
                                    <div className="todo__title">New Item</div>
                                    <div className="todo__others">
                                        <div className="todo__right todo__complete-true">
                                            <span>Done</span>
                                        </div>
                                        <div className="todo__right todo__date">
                                            <span>Dec 14, 2019</span>
                                        </div>
                                        <div className="appear-on-hover">
                                            <span className="todo__right todo__btn important-false">
                                                <i className="todo__icon fas fa-exclamation-circle"></i>
                                            </span>
                                            <span className="todo__right todo__btn cart-false">
                                                <i className="todo__icon fas fa-cart-plus"></i>
                                            </span>
                                            <span className="todo__right todo__btn delete">
                                                <i className="todo__icon fas fa-trash"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.modals.showCatModal}
                        className="my-modal add-edit-modal"
                        onRequestClose={this.closeCatModal}
                    >
                        <CategoryForm />
                    </Modal>
                    <Modal
                        isOpen={this.state.modals.showTodoModal}
                        className="my-modal todo-modal"
                        onRequestClose={this.closeTodoModal}
                    >
                        <TodoForm />
                    </Modal>
                </div>
            </>
        );
    }
}

export default Dashboard;

// import React, { useState, useEffect } from "react";
// const Dashboard = () => {
//     const [currShowCatMenu, setShowCatMenu] = useState(false);
//     const [currShowFilterMenu, setShowFilterMenu] = useState(false);
//     const [currShowSortMenu, setShowSortMenu] = useState(false);
//     useEffect(
//         () =>
//             currShowCatMenu
//                 ? document.addEventListener("click", closeCatMenu)
//                 : document.removeEventListener("click", closeCatMenu),
//         [currShowCatMenu]
//     );
//     useEffect(
//         () =>
//             currShowFilterMenu
//                 ? document.addEventListener("click", closeFilterMenu)
//                 : document.removeEventListener("click", closeFilterMenu),
//         [currShowFilterMenu]
//     );
//     useEffect(() => {
//         console.log(currShowSortMenu);
//         return currShowSortMenu
//             ? document.addEventListener("click", closeSortMenu)
//             : document.removeEventListener("click", closeSortMenu);
//     }, [currShowSortMenu]);
//     const showCatMenu = () => {
//         setShowCatMenu(true);
//     };
//     const closeCatMenu = (e) => {
//         if (catMenu && !catMenu.contains(e.target)) {
//             setShowCatMenu(false);
//         }
//     };
//     const showFilterMenu = () => {
//         setShowFilterMenu(true);
//     };
//     const closeFilterMenu = (e) => {
//         if (filterMenu && !filterMenu.contains(e.target)) {
//             setShowFilterMenu(false);
//         }
//     };
//     const showSortMenu = () => {
//         setShowSortMenu(true);
//     };
//     const closeSortMenu = (e) => {
//         // console.log(!!sortMenu);
//         // console.log("in here");
//         // console.log(sortMenu && !sortMenu.contains(e.target));

//         if (sortMenu && !sortMenu.contains(e.target)) {
//             console.log("got here");
//             setShowSortMenu(false);
//         }
//     };
//     let catMenu;
//     let filterMenu;
//     let sortMenu;
//     return (
//         <>
//             <div className="navigation">
//                 <nav className="navigation__nav">
//                     <div className="navigation__name">
//                         <i className="fas fa-clipboard"></i> Todoit
//                     </div>
//                     <div className="navigation__list">
//                         <a href="#" className="navigation__link">
//                             Dashboard
//                         </a>
//                         <a href="#" className="navigation__link">
//                             Pomodoro
//                         </a>
//                         <a href="#" className="navigation__link">
//                             Logout <i className="fas fa-sign-out-alt"></i>
//                         </a>
//                     </div>
//                 </nav>
//             </div>
//             <div className="dashboard">
//                 <div className="categories-sidebar">
//                     <div className="categories-sidebar__top-section">
//                         <div className="categories-sidebar__title-container">
//                             <div className="heading-secondary">Categories</div>
//                         </div>
//                         <div className="categories-sidebar__divider"></div>
//                     </div>
//                     <div className="categories-sidebar__main-section">
//                         <div className="categories-sidebar__category_item--selected">
//                             <div className="categories-sidebar__category_name">
//                                 Everything
//                             </div>
//                         </div>
//                         <div className="categories-sidebar__category_item">
//                             <div className="categories-sidebar__category_name">
//                                 Exercise
//                             </div>
//                         </div>
//                         <div className="categories-sidebar__category_item">
//                             <div className="categories-sidebar__category_name">
//                                 School work
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="board">
//                     <div className="board__top-section">
//                         <div className="board__top-section--header">
//                             <div className="board__top-section--header-title">
//                                 <span className="heading-primary">
//                                     Everything
//                                 </span>
//                             </div>
//                             <div>
//                                 <button
//                                     className="btn-secondary board__top-section--header-more"
//                                     onClick={() =>
//                                         !currShowCatMenu ? showCatMenu() : null
//                                     }
//                                 >
//                                     <i className="fas fa-ellipsis-h fa-lg"></i>
//                                 </button>
//                                 {currShowCatMenu ? (
//                                     <div
//                                         className="collaspible-menu cat-menu"
//                                         ref={(e) => {
//                                             catMenu = e;
//                                         }}
//                                     >
//                                         <span className="catMenu__btn margin-left-sm">
//                                             <i className="todo__icon fas fa-pen"></i>
//                                         </span>
//                                         <span className="catMenu__btn">
//                                             <i className="todo__icon fas fa-trash"></i>
//                                         </span>
//                                     </div>
//                                 ) : null}
//                             </div>
//                         </div>
//                         <div className="board__top-section--description">
//                             <span className="description">
//                                 Lorem ipsum dolor sit amet, consectetur
//                                 adipiscing elit, sed do eiusmod tempor
//                                 incididunt ut labore et dolore magna aliqua.
//                                 Urna duis convallis convallis tellus id. Eget
//                                 egestas purus viverra accumsan in. Consequat
//                                 semper viverra nam libero justo laoreet sit
//                                 amet. Mauris cursus mattis molestie a iaculis at
//                                 erat pellentesque adipiscing. Congue eu
//                                 consequat ac felis donec et odio pellentesque
//                                 diam.
//                             </span>
//                         </div>
//                         <div className="board__top-section--filter">
//                             <div className="board__top-section--filter-wrapper">
//                                 <div className="filter-buttons-wrapper">
//                                     <button className="btn-primary margin-right-sm">
//                                         + New Item
//                                     </button>
//                                     <button
//                                         className="btn-secondary filter-btn"
//                                         onClick={() =>
//                                             !currShowFilterMenu
//                                                 ? showFilterMenu()
//                                                 : null
//                                         }
//                                     >
//                                         <i className="fas fa-filter"></i>
//                                         <span className="margin-left-sm">
//                                             {" "}
//                                             Filter
//                                         </span>
//                                     </button>

//                                     <button
//                                         className="btn-secondary filter-btn"
//                                         onClick={() =>
//                                             !currShowSortMenu
//                                                 ? showSortMenu()
//                                                 : null
//                                         }
//                                     >
//                                         <i className="fas fa-sort"></i>
//                                         <span className="margin-left-sm">
//                                             {" "}
//                                             Sort
//                                         </span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {currShowFilterMenu ? (
//                             <div
//                                 className="collaspible-menu filter-menu"
//                                 ref={(e) => {
//                                     filterMenu = e;
//                                 }}
//                             ></div>
//                         ) : null}
//                         {currShowSortMenu ? (
//                             <div
//                                 className="collaspible-menu sort-menu"
//                                 ref={(e) => {
//                                     sortMenu = e;
//                                 }}
//                             ></div>
//                         ) : null}
//                     </div>
//                     <div className="board__main-section">
//                         <div className="todo__container">
//                             <div className="todo__item">
//                                 <div className="todo__side-color"></div>
//                                 <div className="todo__title">New Item</div>
//                                 <div className="todo__others">
//                                     <div className="todo__right todo__complete-true">
//                                         <span>Done</span>
//                                     </div>
//                                     <div className="todo__right todo__date">
//                                         <span>Dec 14, 2019</span>
//                                     </div>
//                                     <div className="appear-on-hover">
//                                         <span className="todo__right todo__btn important-false">
//                                             <i className="todo__icon fas fa-exclamation-circle"></i>
//                                         </span>
//                                         <span className="todo__right todo__btn cart-false">
//                                             <i className="todo__icon fas fa-cart-plus"></i>
//                                         </span>
//                                         <span className="todo__right todo__btn delete">
//                                             <i className="todo__icon fas fa-trash"></i>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Dashboard;
