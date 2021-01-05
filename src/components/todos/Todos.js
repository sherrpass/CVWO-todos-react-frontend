import React from 'react';
import { connect } from 'react-redux';
import Todo from "./Todo";
import todosSelector from "../../selectors/todos";
import categorySelector from "../../selectors/categories";

const Todos = ({title, todos, date="due_by"}) => {
    return (
    <div>
        <h2>{title}</h2>
        {todos.map((todo)=><Todo date={date} key={todo.id} {...todo} />)}
    </div>);
};


function mapStateToProps(state, props) {
    console.log(props.category);
    return {
        todos: categorySelector(todosSelector(state.todo.todos, state.filters, props.timeCategory), props.category)
    };
}

export default connect(
    mapStateToProps,
)(Todos);