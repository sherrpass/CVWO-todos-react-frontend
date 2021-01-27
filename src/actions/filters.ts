import { Filters } from "../allTypes";

export const sortBy = (
    sortMethod: "dueBy" | "createdAt" | "name" = "dueBy"
) => ({
    type: "SORT_BY",
    payload: sortMethod,
});

export const editFilters = (filters: Filters) => ({
    type: "EDIT_FILTERS",
    payload: filters,
});
