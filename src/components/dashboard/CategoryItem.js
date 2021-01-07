import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const CategoryItem = ({ currCategoryId, category }) => {
    const history = useHistory();
    return (
        <>
            <div
                className={
                    "categories-sidebar__category_item" +
                    (currCategoryId === category.id ? "--selected" : "")
                }
                onClick={() => {
                    history.push("/dashboard/" + category.id);
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
export default connect(mapStateToProps)(CategoryItem);
