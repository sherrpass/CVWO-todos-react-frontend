import React from 'react';
import {Link} from "react-router-dom";

const CategoryItem = ({category:{id,name}}) => {
    return (
        <div>
            <Link to={`/categories/${id}`}>{name}</Link>
            
        </div>
    );
};

export default CategoryItem;