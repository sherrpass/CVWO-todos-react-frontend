//sort by createAt
export const sortByCreatedAt = () => ({
    type: "SORT_BY_CREATED_AT"
})
//sort by dueBy
export const sortByDueBy = () => ({
    type: "SORT_BY_DUE_BY"
})
//sort by name
export const sortByName = () => ({
    type: "SORT_BY_NAME"
})
//toggle importantOnly
export const toggleImportantOnly = () =>({
    type: "TOGGLE_IMPORTANT_ONLY"
})