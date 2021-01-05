import React, { useState } from 'react';

const CategoryForm = ({onSubmit, category, isEdit}) => {
    const [name, setName] = useState(category ? category.name : "");
    return (
        <div>
            <form onSubmit={()=>onSubmit(name)}>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <button type="submit">{isEdit ? "Confirm Changes" : "Add Category"}</button>
            </form>
        </div>
    );
};

export default CategoryForm;