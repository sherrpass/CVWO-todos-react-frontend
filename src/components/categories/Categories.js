import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import ReactModal from 'react-modal';

import {getCategories,addCategory} from "../../actions/categories";
import {getTodos} from "../../actions/todos";
import Loading from "../layout/Loading";
import CategoryItem from "./CategoryItem";
import CategoryForm from "./CategoryForm";

const Categories = ({category: {categories, loading}, getTodos, getCategories, addCategory}) => {
    useEffect(()=>{
        getTodos();
        getCategories();
    },[getTodos,getCategories])
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const onAddCategoryClick = () => {
        setModalIsOpen(true);
    }

    const onModalReqClose = () => {
        setModalIsOpen(false);
    }
    const onAddFormCategorySubmit = (name) => {
        addCategory({name});
        onModalReqClose();
    }
    return (
        <>
            <h1>Categories</h1>
            <button onClick={onAddCategoryClick}>Add a Category</button>
            <ReactModal isOpen={modalIsOpen} onRequestClose={onModalReqClose} ariaHideApp={false}>
                <CategoryForm onSubmit={onAddFormCategorySubmit} isEdit={false}/>
            </ReactModal>
            {loading ? (<Loading/>) : categories.map((category)=><CategoryItem key={category.id} category={category}/>)}
        </>
    );
};

const mapStateToProps = (state) => ({
    category: state.category
})

export default connect(mapStateToProps,{getTodos, getCategories, addCategory})(Categories);