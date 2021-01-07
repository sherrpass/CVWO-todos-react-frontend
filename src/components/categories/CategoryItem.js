import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category: { id, name, description } }) => {
    return (
        <div>
            <Link to={`/categories/${id}`}>{name}</Link>
            <p>{description}</p>
        </div>
    );
};

export default CategoryItem;
