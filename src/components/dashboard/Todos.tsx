import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import {
    categorySelector,
    filterSelector,
    sortSelector,
    cartSelector,
} from "../../selectors/todos";
import TodoItem from "./TodoItem";
//@ts-ignore
import { Collapse } from "react-collapse";
import { Todo } from "../../allTypes";

type DueBy = "overdue" | "dueToday" | "upcoming" | "unscheduled";
type Props = PropsFromRedux & {
    dueBy?: DueBy;
    isCart?: boolean;
};

type State = {
    showTodo: boolean;
};
class Todos extends Component<Props, State> {
    state = {
        showTodo: true,
    };
    dueByTitleConversion = (dueBy: DueBy) => {
        return dueBy === "dueToday" ? "Today" : this.capitalise(dueBy);
    };
    capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
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
                        {this.props.todos.map((todo: Todo) => {
                            return <TodoItem key={todo.id} todo={todo} />;
                        })}
                    </div>
                </Collapse>
            </div>
        );
    }
}

function mapStateToProps(
    state: RootState,
    props: { isCart?: boolean; dueBy?: DueBy }
) {
    return {
        todos: props.isCart
            ? cartSelector(state.todo.todos)
            : sortSelector(
                  filterSelector(
                      categorySelector(
                          state.todo.todos,
                          state.category.currCategory
                      ),
                      props.dueBy
                          ? {
                                ...state.filters.filters,
                                dueBy: [props.dueBy],
                            }
                          : state.filters.filters
                  ),
                  state.filters.sortBy
              ),
    };
}
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Todos);
