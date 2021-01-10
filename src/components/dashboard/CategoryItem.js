import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurrCategory } from "../../actions/categories";
const CategoryItem = ({ currCategoryId, category, setCurrCategory }) => {
    return (
        <>
            <div
                className={
                    "categories-sidebar__category_item" +
                    (currCategoryId === category.id ? "--selected" : "")
                }
                onClick={() => {
                    setCurrCategory(category.id);
                }}
            >
                <div className="categories-sidebar__category_name">
                    {category.name}
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    currCategoryId: state.category.currCategory,
});
export default connect(mapStateToProps, { setCurrCategory })(CategoryItem);
