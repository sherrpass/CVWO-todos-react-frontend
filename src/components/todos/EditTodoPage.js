import React from 'react';
import TodoForm from "./TodoForm";
import { editTodo } from "../../actions/todos";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const EditTodoPage = ({editTodo, history, match, todo, loading}) => {
    if(loading){
        return <Redirect to="/dashboard"/>
    }
    const onSubmit = (todo) => {
        console.log(todo);
        editTodo(match.params.id, todo);
        history.push("/dashboard");
    }
    return (
        <div>
            Edit Todo
            <TodoForm isEdit={true} todo={todo} onSubmit={onSubmit} />
            <Link to="/">Back to the dashboard.</Link>
        </div>
    );
}

const mapStateToProps = (state, props) => ({
    todo: state.todo.todos.find((todo) => todo.id === parseInt(props.match.params.id)),
    loading: state.todo.loading
});

export default connect(mapStateToProps,{editTodo})(EditTodoPage);