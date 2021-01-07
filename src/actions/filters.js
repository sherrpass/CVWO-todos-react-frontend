//sort by createAt
export const sortBy = (sortMethod = "dueBy") => ({
    type: "SORT_BY",
    payload: sortMethod,
});

export const editFilters = ({ completion, importance, dueBy }) => ({
    type: "EDIT_FILTERS",
    payload: { completion, importance, dueBy },
});
