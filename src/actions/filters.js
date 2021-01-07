//sort by createAt
export const sortBy = (sortMethod = "dueBy") => ({
    type: "SORT_BY",
    payload: sortMethod,
});

export const editFilters = (filters) => ({
    type: "EDIT_FILTERS",
    payload: filters,
});
