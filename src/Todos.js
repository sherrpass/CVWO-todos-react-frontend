import React, { Component } from "react";
import { connect } from "react-redux";
import {
    categorySelector,
    filterSelector,
    sortSelector,
} from "../../selectors/todos";
import TodoItem from "./TodoItem";
import { Collapse } from "react-collapse";
class Todos extends Component {
    state = {
        showTodo: true,
    };
    dueByTitleConversion = (dueBy) => {
        return dueBy === "dueToday" ? "Today" : this.capitalise(dueBy);
    };
    capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    toggleShowTodos = () => {
        this.setState((prevState) => ({ showTodo: !prevState.showTodo }));
    };
    render() {
        return this.props.todos.length === 0 ? null : (
            <div className="todo__container">
                {this.props.dueBy ? (
                    <div
                        className="todo__container-title"
                        onClick={this.toggleShowTodos}
                    >
                        {this.state.showTodo ? (
                            <i className="fas fa-caret-down margin-right-sm"></i>
                        ) : (
                            <i className="fas fa-caret-right margin-right-sm"></i>
                        )}
                        {this.dueByTitleConversion(this.props.dueBy)}
                    </div>
                ) : null}
                <Collapse isOpened={this.state.showTodo}>
                    <div className="todo__collaspsible" id={this.props.dueBy}>
                        {this.props.todos.map((todo) => {
                            return <TodoItem key={todo.id} todo={todo} />;
                        })}
                    </div>
                </Collapse>
            </div>
        );
        // return (
        //     <div className="todo__container">
        //         {this.props.dueBy ? <div>{this.props.dueBy}</div> : null}
        //         {this.props.todos.map((todo) => {
        //             return <div>{todo.title}</div>;
        //         })}
        //     </div>
        // );
    }
}

function mapStateToProps(state, props) {
    return {
        todos: sortSelector(
            filterSelector(
                categorySelector(state.todo.todos, state.category.currCategory),
                props.dueBy
                    ? { ...state.filters.filters, dueBy: [props.dueBy] }
                    : state.filters.filters
            ),
            state.filters.sortBy
        ),
    };
}

export default connect(mapStateToProps)(Todos);
