import React from "react";

const CategoryForm = () => {
    return (
        <>
            <div className="register__title">
                <span className="heading-primary">Edit Category</span>
            </div>
            <div className="register__form">
                <form noValidate>
                    <div className="mb-3">
                        <label className="form-label">Category name</label>
                        <input
                            placeholder="Enter a category name"
                            className={"form-control"}
                            // name="email"
                            // value={email}
                            // onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            placeholder="(Optional)"
                            className={"form-control"}
                            // name="password"
                            // value={password}
                            // onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="margin-top-med btn-primary"
                    >
                        Confirm Changes
                    </button>
                </form>
            </div>
        </>
    );
};

export default CategoryForm;
