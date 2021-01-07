import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import {
    categorySelector,
    filterSelector,
    sortSelector,
} from "../../selectors/todos";

const Todos = ({ title, todos, date = "due_by" }) => {
    return (
        <div>
            <h2>{title}</h2>
            {todos.map((todo) => (
                <Todo date={"due_by"} key={todo.id} {...todo} />
            ))}
        </div>
    );
};

function mapStateToProps(state, props) {
    console.log(props.category);
    return {
        todos: sortSelector(
            filterSelector(categorySelector(state.todo.todos, props.category), {
                ...state.filters.filters,
                dueBy: props.timeCategory
                    ? [props.timeCategory]
                    : state.filters.filters.dueBy,
            }),
            state.filters.sortBy
        ),
    };
}
// ["overdue", "dueToday", "upcoming", "unscheduled"]
export default connect(mapStateToProps)(Todos);
// categorySelector(
//     todosSelector(state.todo.todos, state.filters, props.timeCategory),
//     props.category
// )

// sortSelector(
//     filterSelector(categorySelector(state.todo.todos, props.category), {
//         ...state.filters.filters,
//         dueBy: props.timeCategory
//             ? [props.timeCategory]
//             : state.filters.filters.dueBy,
//     }),
//     state.filters.sortBy
// ),
