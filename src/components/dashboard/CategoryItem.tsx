import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import { setCurrCategory } from "../../actions/categories";
import { Category } from "../../allTypes";

type Props = PropsFromRedux & {
    category: Category;
    setCurrCategory: (
        id?: number | null
    ) => {
        type: string;
        payload: number | null;
    };
};
const CategoryItem = ({ currCategoryId, category, setCurrCategory }: Props) => {
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
const mapStateToProps = (state: RootState) => ({
    currCategoryId: state.category.currCategory,
});
const connector = connect(mapStateToProps, { setCurrCategory });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoryItem);
