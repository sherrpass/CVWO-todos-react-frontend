const defaultState = {
    categories: [],
    loading: true,
    error: {}
};
  
export default (state = defaultState, {type, payload}) =>{
    switch(type){
        case("GET_CATEGORIES"):
            return {
                ...state,
                categories: payload,
                loading: false
            };
        case("ADD_CATEGORY"):
            return {
                ...state,
                categories: [payload, ...state.categories]
            };
        case("EDIT_CATEGORY"):
            return state.loading ? state : {
                ...state,
                categories: state.categories.map((category) => {
                    // console.log(typeof payload.id);
                    return category.id === payload.id ? payload.category : category
                })
            }
        case("DELETE_CATEGORY"):
            return {
                ...state,
                categories: state.categories.filter((category) => category.id !== payload)
            };
        case("CATEGORY_ERROR"):
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ("LOADING"):
            return {
                ...state,
                loading: true,
            };
        default:
        return state;
        }
}