import React, { Component } from "react";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import DatePicker from "react-datepicker";
import { getCategories, addCategory } from "../../../actions/categories";
import ReactModal from "react-modal";
import CategoryForm from "./CategoryForm";
import { RootState } from "../../../store/index";
import {
    Todo,
    TodoRequest,
    Override,
    Category,
    CategoryRequest,
} from "../../../allTypes";

type Props = PropsFromRedux & {
    todo?: Todo;
    isPomo?: boolean;
    onSubmit: (todo: TodoRequest) => void;
    isEdit?: boolean;
    closeModal: () => void;
    onDelete?: () => void;
};
type FormTodo = Override<
    TodoRequest,
    {
        due_by: Date | null;
        category_ids: number[];
    }
>;
type State = {
    todo: FormTodo;
    modalIsOpen: boolean;
    error: string | null;
};
class TodoForm extends Component<Props, State> {
    state: State = {
        todo: {
            title: this.props.todo ? this.props.todo.title : "",
            description: this.props.todo ? this.props.todo.description : "",
            completed: this.props.todo ? this.props.todo.completed : false,
            created_at: this.props.todo
                ? this.props.todo.created_at
                : moment().valueOf(),
            due_by: this.props.todo
                ? this.props.todo.due_by === null
                    ? null
                    : moment(this.props.todo.due_by).toDate()
                : null, //i want the default to be no due date
            important: this.props.todo ? this.props.todo.important : false,
            category_ids: this.props.todo
                ? this.props.todo.categories.map(
                      (category: Category) => category.id
                  )
                : this.props.currCategory
                ? [this.props.currCategory]
                : [], //changes the array of categories objects to an array of categories_id
            cart: this.props.todo
                ? this.props.todo.cart
                : this.props.isPomo
                ? true
                : false,
        },
        modalIsOpen: false,
        error: null,
    };

    onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, title },
        }));
    };
    onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const description = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, description },
        }));
    };

    onCartChange = () => {
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, cart: !prevState.todo.cart },
        }));
    };
    onImportanceChange = () => {
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, important: !prevState.todo.important },
        }));
    };
    onDateChange = (date: Date | null) => {
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, due_by: date },
        }));
    };

    onOldCategoryClick = (
        e: React.MouseEvent<HTMLSelectElement, MouseEvent>
    ) => {
        console.log("clicked here.");
        const target = e.target as HTMLSelectElement;
        if (this.state.todo.category_ids.includes(parseInt(target.value))) {
            //if the category chosen was already in the categories, remove it
            this.setState((prevState) => ({
                ...prevState,
                todo: {
                    ...prevState.todo,
                    category_ids: prevState.todo.category_ids.filter(
                        (category_id) => category_id !== parseInt(target.value)
                    ),
                },
            }));
        } else {
            //else, add it
            console.log("adding...");
            this.setState((prevState) => ({
                ...prevState,
                todo: {
                    ...prevState.todo,
                    category_ids: [
                        ...prevState.todo.category_ids,
                        parseInt(target.value),
                    ],
                },
            }));
        }
    };

    onNewCategoryClick = () => {
        this.setState((prevState) => ({ ...prevState, modalIsOpen: true }));
    };

    onModalReqClose = () => {
        this.setState((prevState) => ({ ...prevState, modalIsOpen: false }));
    };
    onAddFormCategorySubmit = (cat: CategoryRequest) => {
        this.props.addCategory(cat);
        this.onModalReqClose();
    };
    tidyUpStateForSubmit = (todo: FormTodo) => {
        //corrects the due_by and category_ids values for add/editTodo action generator
        return {
            ...todo,
            category_ids: todo.category_ids.join(" "),
            due_by: todo.due_by === null ? null : moment(todo.due_by).valueOf(),
        };
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(moment(this.state.todo.due_by).valueOf());
        if (!this.state.todo.title) {
            this.setState(() => ({ error: "Please provide a title." }));
        } else {
            this.props.onSubmit(this.tidyUpStateForSubmit(this.state.todo));
        }
    };

    render() {
        // return this.props.category.loading ? (
        //     <Loading />
        // ) :
        return (
            <div>
                <div className="form__title margin-bottom-sm">
                    <span className="heading-primary">
                        {this.props.isEdit ? "Edit Todo" : "Add Todo"}
                    </span>
                    <div className="close-modal todo">
                        <i
                            className="fas fa-times"
                            onClick={this.props.closeModal}
                        ></i>
                    </div>
                </div>
                <div className="register__form">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label className=".form-label-sm">Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                autoFocus
                                className={
                                    "form-control" +
                                    (this.state.error ? " is-invalid" : "")
                                }
                                value={this.state.todo.title}
                                onChange={this.onTitleChange}
                            />
                            <div className="invalid-feedback">
                                {this.state.error}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className=".form-label-sm">
                                Description{" "}
                                <span className="description">(Optional)</span>
                            </label>
                            <textarea
                                placeholder="Description"
                                className={"form-control"}
                                value={this.state.todo.description}
                                onChange={this.onDescriptionChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className=".form-label-sm">
                                Due Date{" "}
                                <span className="description">(Optional)</span>
                            </label>
                            <br />
                            <DatePicker
                                selected={this.state.todo.due_by}
                                className={"form-control"}
                                isClearable
                                onChange={(date: Date | null) =>
                                    this.onDateChange(date)
                                }
                            />
                        </div>
                        <div className="margin-bottom-med">
                            {/* for adding categories*/}

                            <label className=".form-label-sm margin-bottom-sm margin-right-sm">
                                Categories
                            </label>

                            <button
                                type="button"
                                onClick={this.onNewCategoryClick}
                                className="btn-secondary new-cat-btn"
                            >
                                + New Category
                            </button>
                            <ReactModal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.onModalReqClose}
                                className="my-modal add-edit-modal"
                                ariaHideApp={false}
                            >
                                <CategoryForm
                                    onSubmit={(cat) => {
                                        this.onAddFormCategorySubmit(cat);
                                    }}
                                    closeModal={this.onModalReqClose}
                                    isEdit={false}
                                    isFromTodo={true}
                                />
                            </ReactModal>
                            <br />
                            <select
                                className="form-select-lg form-control"
                                multiple
                                aria-label="multiple select example"
                                onClick={this.onOldCategoryClick}
                            >
                                {this.props.categories &&
                                    this.props.categories.map(
                                        (category: Category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                                className={
                                                    this.state.todo.category_ids.includes(
                                                        category.id
                                                    )
                                                        ? "padding-sm category-option true"
                                                        : "padding-sm category-option false"
                                                }
                                            >
                                                {category.name +
                                                    (this.state.todo.category_ids.includes(
                                                        category.id
                                                    )
                                                        ? " <"
                                                        : "")}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className=".form-label-sm margin-right-med">
                                Important
                            </label>
                            <label
                                className="switch"
                                onClick={this.onImportanceChange}
                            >
                                <input
                                    type="checkbox"
                                    checked={this.state.todo.important}
                                    onChange={this.onImportanceChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div>
                            <label className=".form-label-sm margin-right-sm ">
                                Pomodoro
                            </label>
                            <label
                                className="switch"
                                onClick={this.onCartChange}
                            >
                                <input
                                    type="checkbox"
                                    checked={this.state.todo.cart}
                                    onChange={this.onCartChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <button
                            className="margin-top-med btn-primary"
                            type="submit"
                        >
                            {this.props.isEdit ? "Confirm" : "Add Todo"}
                        </button>
                        {this.props.isEdit && (
                            <button
                                className="margin-top-med margin-left-sm btn-danger"
                                type="button"
                                onClick={this.props.onDelete}
                            >
                                Delete
                            </button>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    categories: state.category.categories,
    currCategory: state.category.currCategory,
});
const connector = connect(mapStateToProps, { getCategories, addCategory });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(TodoForm);
