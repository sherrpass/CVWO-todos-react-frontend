import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import Modal from "react-modal";
import CategoryItem from "./CategoryItem";
import CategoryForm from "./forms/CategoryForm";
import { addCategory } from "../../actions/categories";
import { setCurrCategory } from "../../actions/categories";
import categoriesSelector from "../../selectors/categories";
import { CategoryRequest, Category } from "../../allTypes";

type Props = PropsFromRedux & {
    onClickCollaspe: () => void;
    showSideBar: boolean;
};
type State = {
    showCatModal: boolean;
};
class CategoriesSidebar extends Component<Props, State> {
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

    onSubmit = ({ name, description }: CategoryRequest) => {
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
                        className={
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
                    {this.props.categories.map((category: Category) => (
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

function mapStateToProps(state: RootState) {
    return {
        categories: categoriesSelector(state.category.categories),
        currCategory: state.category.currCategory,
    };
}
const connector = connect(mapStateToProps, { addCategory, setCurrCategory });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoriesSidebar);
