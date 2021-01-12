import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { getCategories, addCategory } from "../../../actions/categories";
import ReactModal from "react-modal";
import CategoryForm from "./CategoryForm";

class TodoForm extends Component {
    state = {
        // todo: {
        //     title: "",
        //     description: "",
        //     completed: false,
        //     created_at: moment().valueOf(),
        //     due_by: null, //i want the default to be no due date
        //     important: false,
        //     category_ids: [], //changes the array of categories objects to an array of categories_id
        // },
        // modalIsOpen: false,
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
                ? this.props.todo.categories.map((category) => category.id)
                : [], //changes the array of categories objects to an array of categories_id
            cart: this.props.todo ? this.props.todo.cart : false,
        },
        modalIsOpen: false,
        error: null,
    };

    // componentDidMount = () => {
    //     this.props.getCategories();
    // };

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, title },
        }));
    };
    onDescriptionChange = (e) => {
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
    onDateChange = (date) => {
        this.setState((prevState) => ({
            ...prevState,
            todo: { ...prevState.todo, due_by: date },
        }));
    };

    onOldCategoryClick = (e) => {
        console.log("clicked");
        if (this.state.todo.category_ids.includes(parseInt(e.target.value))) {
            //if the category chosen was already in the categories, remove it
            console.log("removing...");
            this.setState((prevState) => ({
                ...prevState,
                todo: {
                    ...prevState.todo,
                    category_ids: prevState.todo.category_ids.filter(
                        (category_id) =>
                            category_id !== parseInt(e.target.value)
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
                        parseInt(e.target.value),
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
    onAddFormCategorySubmit = (cat) => {
        this.props.addCategory(cat);
        this.onModalReqClose();
    };
    tidyUpStateForSubmit = (todo) => {
        //corrects the due_by and category_ids values for add/editTodo action generator
        return {
            ...todo,
            category_ids: todo.category_ids.join(" "),
            due_by: todo.due_by === null ? null : moment(todo.due_by).valueOf(),
        };
    };

    onSubmit = (e) => {
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
                <div className="margin-bottom-sm">
                    <span className="heading-primary">
                        {this.props.isEdit ? "Edit Todo" : "Add Todo"}
                    </span>
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
                                type="text"
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
                                onChange={(date) => this.onDateChange(date)}
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
                            >
                                <CategoryForm
                                    onSubmit={(cat) => {
                                        this.onAddFormCategorySubmit(cat);
                                    }}
                                    isEdit={false}
                                    isFromTodo={true}
                                />
                            </ReactModal>
                            <br />
                            <select
                                className="form-select-lg form-control"
                                multiple
                                aria-label="multiple select example"
                            >
                                {this.props.categories &&
                                    this.props.categories.map((category) => (
                                        <option
                                            selected={false}
                                            onClick={this.onOldCategoryClick}
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
                                            {category.name}
                                        </option>
                                    ))}
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
                                Add to cart
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
                            {this.props.isEdit ? "Confirm changes" : "Add Todo"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, { getCategories, addCategory })(
    TodoForm
);
