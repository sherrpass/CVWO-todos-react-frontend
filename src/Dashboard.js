import React from "react";
import { Button } from "react-bootstrap";
const Dashboard = () => {
    return (
        <>
            <div className="navigation">
                <nav className="navigation__nav">
                    <div className="navigation__name">
                        <i className="fas fa-clipboard"></i>
                        Todoify
                    </div>
                    <div className="navigation__list">
                        <a href="#" className="navigation__link">
                            Dashboard
                        </a>
                        <a href="#" className="navigation__link">
                            Pomodoro
                        </a>
                        <a href="#" className="navigation__link">
                            Logout
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </div>
                </nav>
            </div>

            <div className="dashboard">
                <div className="categories-sidebar">
                    <div className="categories-sidebar__top-section">
                        <div className="categories-sidebar__title-container">
                            <div className="heading-secondary">Categories</div>
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
                            <button className="btn board__top-section--header-more">
                                <i className="fas fa-ellipsis-h fa-lg"></i>
                            </button>
                        </div>
                        <div className="board__top-section--description">
                            <span className="description">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Urna duis convallis convallis tellus id. Eget
                                egestas purus viverra accumsan in. Consequat
                                semper viverra nam libero justo laoreet sit
                                amet. Mauris cursus mattis molestie a iaculis at
                                erat pellentesque adipiscing. Congue eu
                                consequat ac felis donec et odio pellentesque
                                diam.
                            </span>
                        </div>

                        <div className="board__top-section--filter">
                            <div className="board__top-section--filter-wrapper">
                                <div className="filter-buttons-wrapper">
                                    <button className="btn filter-btn btn-primary">
                                        + New Item
                                    </button>
                                    <button className="btn filter-btn btn-w-icon">
                                        <i className="fas fa-filter"></i>
                                        <span>Filter</span>
                                    </button>
                                    <button className="btn filter-btn btn-w-icon">
                                        <i className="fas fa-sort"></i>
                                        <span>Sort</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="board__main-section">
                        <div className="todo__container">
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
                                        <span className="todo__right todo__btn important-true">
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
            </div>
        </>
    );
};

export default Dashboard;
