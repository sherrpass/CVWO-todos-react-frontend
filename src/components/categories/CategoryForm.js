import React, { useState } from "react";

const CategoryForm = ({ onSubmit, category, isEdit }) => {
    const [name, setName] = useState(category ? category.name : "");
    const [description, setDescription] = useState(
        category ? category.description : ""
    );
    return (
        <div>
            <form onSubmit={() => onSubmit({ name, description })}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <button type="submit">
                    {isEdit ? "Confirm Changes" : "Add Category"}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
