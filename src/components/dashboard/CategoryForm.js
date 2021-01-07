import React, { useState } from "react";

const CategoryForm = ({ isEdit, category, onSubmit }) => {
    const [name, setName] = useState(category ? category.name : "");
    const [description, setDescription] = useState(
        category ? category.description : ""
    );
    return (
        <>
            <div className="register__title">
                <span className="heading-primary">
                    {isEdit ? "Edit Category" : "New Category"}
                </span>
            </div>
            <div className="register__form">
                <form
                    noValidate
                    onSubmit={() => onSubmit({ name, description })}
                >
                    <div className="mb-3">
                        <label className="form-label">Category name</label>
                        <input
                            placeholder="Enter a category name"
                            value={name}
                            className={"form-control"}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            // name="email"
                            // value={email}
                            // onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            value={description}
                            placeholder="(Optional)"
                            className={"form-control"}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="margin-top-med btn-primary"
                    >
                        {isEdit ? "Confirm Changes" : "Add Category"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CategoryForm;
