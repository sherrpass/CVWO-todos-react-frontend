import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
// import CategoryForm from "./CategoryForm";
import CategoryItem from "./CategoryItem";
import CategoryForm from "./forms/CategoryForm";
import { addCategory } from "../../actions/categories";
import { setCurrCategory } from "../../actions/categories";
import categoriesSelector from "../../selectors/categories";
class CategoriesSidebar extends Component {
    state = {
        showCatModal: false,
    };
    closeCatModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            showCatModal: false,
        }));
    };
    openCatModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            showCatModal: true,
        }));
    };

    onSubmit = ({ name, description }) => {
        this.closeCatModal();
        this.props.addCategory({ name, description });
    };
    render() {
        return (
            <>
                <div
                    className="categories-sidebar__btn"
                    onClick={this.props.onClickCollaspe}
                >
                    <i
                        class={
                            "fas fa-chevron-" +
                            (this.props.showSideBar ? "left" : "right")
                        }
                    ></i>
                </div>
                <div className="categories-sidebar__top-section">
                    <div className="categories-sidebar__title-container">
                        <div className="heading-secondary">Categories </div>
                        <i
                            className="fas fa-plus fa-sm add-category-icon"
                            onClick={this.openCatModal}
                        ></i>
                    </div>
                    <div className="categories-sidebar__divider"></div>
                </div>
                <div className="categories-sidebar__main-section">
                    <div
                        className={
                            "categories-sidebar__category_item" +
                            (this.props.currCategory ? "" : "--selected")
                        }
                        onClick={() => {
                            this.props.setCurrCategory(null);
                        }}
                    >
                        <div className="categories-sidebar__category_name">
                            Everything
                        </div>
                    </div>
                    {this.props.categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </div>
                <Modal
                    isOpen={this.state.showCatModal}
                    className="my-modal add-edit-modal"
                    onRequestClose={this.closeCatModal}
                    ariaHideApp={false}
                >
                    <CategoryForm
                        isEdit={false}
                        onSubmit={this.onSubmit}
                        closeModal={this.closeCatModal}
                    />
                </Modal>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: categoriesSelector(state.category.categories),
        currCategory: state.category.currCategory,
    };
}

export default connect(mapStateToProps, { addCategory, setCurrCategory })(
    CategoriesSidebar
);
