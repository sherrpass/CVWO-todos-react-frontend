import { Category } from "../allTypes";
const categoriesSelector = (categories: Category[]) => {
    return categories.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
};

export default categoriesSelector;
