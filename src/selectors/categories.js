export default (todos, category_id = null) => {
    return category_id === null ? todos : todos.filter((todo)=>todo.categories.findIndex((categoryItem)=>categoryItem.id === category_id) !== -1);
}