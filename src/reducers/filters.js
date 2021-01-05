const defaultState = {
    sortBy: "createdAt", //createdAt, dueBy or name
    importantOnly: false //whether to only display important only things
}

export default (state = defaultState, action) => {
    switch(action.type){
        case("SORT_BY_CREATED_AT"):
            return {...state, sortBy: "createdAt"}
        case("SORT_BY_DUE_BY"):
            return {...state, sortBy: "dueBy"}
        case("SORT_BY_NAME"):
            return {...state, sortBy: "name"}
        case("TOGGLE_IMPORTANT_ONLY"):
            return {...state, importantOnly: !state.importantOnly}
        default:
            return state;
    }
}