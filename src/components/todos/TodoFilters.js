import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortByCreatedAt, sortByDueBy, sortByName, toggleImportantOnly} from "../../actions/filters";
import { clearCompletedTodos } from "../../actions/todos";


class TodoFilters extends Component {
    onCreatedAtSelect = () => {
        this.props.dispatch(sortByCreatedAt());
    }

    onDueBySelect = () => {
        this.props.dispatch(sortByDueBy());
    }
    onNameSelect = () => {
        this.props.dispatch(sortByName());
    }
    onToggleImportance = () => {
        this.props.dispatch(toggleImportantOnly());
    }
    onClearAllCompleted = () => {
        this.props.dispatch(clearCompletedTodos());
    }
    render() {
        return (
            <div>
                <p>
                    Sort by:
                    <button disabled={this.props.filters.sortBy === "createdAt"} onClick={this.onCreatedAtSelect}>Created Date</button>
                    <button disabled={this.props.filters.sortBy === "dueBy"} onClick={this.onDueBySelect}>Due Date</button>
                    <button disabled={this.props.filters.sortBy === "name"} onClick={this.onNameSelect}>Title</button>
                </p>
                <p>
                    View:
                    <button onClick={this.onToggleImportance}>{this.props.filters.importantOnly ? "Important only" : "All"}</button>
                </p>
                <p>
                    <button disabled={!this.props.anyCompleted} onClick={this.onClearAllCompleted}>Clear all completed</button>
                </p>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters:state.filters,
        anyCompleted: !!state.todo.todos.find((todo) => todo.completed)
    };
}

export default connect(
    mapStateToProps,
)(TodoFilters);