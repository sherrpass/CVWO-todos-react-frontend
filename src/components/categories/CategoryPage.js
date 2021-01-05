import React, {useState} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';

import Todos from "../todos/Todos";
import {editCategory, deleteCategory} from "../../actions/categories";
import CategoryForm from "./CategoryForm";

const CategoryPage = ({loading, category, match, editCategory, deleteCategory}) => {
    const history = useHistory();
    const [modalIsOpen,setModalIsOpen] = useState(false);
    if (loading ) { //through ui its impossible but just in case the user gets here via url
        return <Redirect to="/categories"/>
    }

    const onEditCategoryClick = () => {
        setModalIsOpen(true);
    }

    const onDeleteCategoryClick = () => {
        deleteCategory(parseInt(match.params.id));
        history.push("/categories");
    }

    const onModalReqClose = () => {
        setModalIsOpen(false);
    }
    const onEditFormCategorySubmit = (name) => {
        editCategory(parseInt(match.params.id),{name});
        onModalReqClose();
    }
    return (
        <>
            <button onClick={onEditCategoryClick}>Edit category name</button>
            <ReactModal isOpen={modalIsOpen} onRequestClose={onModalReqClose} ariaHideApp={false}>
                <CategoryForm category={category} onSubmit={onEditFormCategorySubmit} isEdit={true}/>
            </ReactModal>
            <button onClick={onDeleteCategoryClick}>{"Delete Category(but not the todos within it)"}</button>
            <Todos title={category.name} category={category.id}/>
        </>
    );
};
//
const mapStateToProps = (state, props) => {
    return {loading: state.todo.loading || state.category.loading,
    category: state.category.categories.find((category)=>{
        return category.id === parseInt(props.match.params.id);
    })}
};

export default connect(mapStateToProps,{editCategory, deleteCategory})(CategoryPage);