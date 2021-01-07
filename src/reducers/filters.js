const defaultState = {
    sortBy: "dueBy", //createdAt, dueBy or name
    filters: {
        completion: "all",
        importance: "all",
        dueBy: ["overdue", "dueToday", "upcoming", "unscheduled"],
    },
};

const filtersReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "SORT_BY":
            return { ...state, sortBy: payload };
        case "EDIT_FILTERS":
            return { ...state, filters: payload };
        default:
            return state;
    }
};

export default filtersReducer;
