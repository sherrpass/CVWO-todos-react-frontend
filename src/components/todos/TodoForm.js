import React, { Component } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {getCategories, addCategory} from "../../actions/categories";
import Loading from "../layout/Loading";
import ReactModal from 'react-modal';
import CategoryForm from "../categories/CategoryForm";

class TodoForm extends Component {
    state = {
        todo: {
            title: this.props.todo ? this.props.todo.title : "", 
            description: this.props.todo ? this.props.todo.description : "",
            completed: this.props.todo ? this.props.todo.completed : false,
            created_at: this.props.todo ? this.props.todo.created_at : moment().valueOf(),
            due_by: this.props.todo? (this.props.todo.due_by === null ? null : moment(this.props.todo.due_by).toDate()) : null, //i want the default to be no due date
            important: this.props.todo? this.props.todo.important : false,
            category_ids: this.props.todo? this.props.todo.categories.map((category)=>category.id) : [] //changes the array of categories objects to an array of categories_id
        },
        modalIsOpen:false
    }

    componentDidMount = () =>{
        this.props.getCategories();
    }

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, title}}));
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, description}}));
    }

    
    onCompleteChange = () => {
        this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, completed: true}}));
    }
    onImportanceChange = () => {
        this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, important: !prevState.todo.important}}));
    }
    onDateChange = (date) => {
        this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, due_by: date}}));
    }

    onOldCategoryClick = (e) => {
        console.log("clicked");
        if(this.state.todo.category_ids.includes(parseInt(e.target.value))){//if the category chosen was already in the categories, remove it
            console.log("removing...")
            this.setState((prevState)=>({...prevState, todo:{ ...prevState.todo, category_ids: prevState.todo.category_ids.filter((category_id)=>category_id !== parseInt(e.target.value))}}))
        }else{//else, add it
            console.log("adding...")
            this.setState((prevState)=>({...prevState, todo: { ...prevState.todo, category_ids:[...prevState.todo.category_ids, parseInt(e.target.value)]}}))
        }
        
    }

    onNewCategoryClick = () => {
        this.setState((prevState)=>({...prevState, modalIsOpen: true}));
    }

    onModalReqClose = () => {
        this.setState((prevState)=>({...prevState, modalIsOpen: false}));
    }
    onAddFormCategorySubmit = (name) => {
        this.props.addCategory({name});
        this.onModalReqClose();
    }
    tidyUpStateForSubmit = (todo) => {//corrects the due_by and category_ids values for add/editTodo action generator
        return { ...todo, category_ids:todo.category_ids.join(" "), due_by: todo.due_by === null ? null : moment(todo.due_by).valueOf()}
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(moment(this.state.todo.due_by).valueOf());
        if (!this.state.todo.title){
            this.setState(() => ({error: "Please provide title."}));
        }else{
            this.props.onSubmit(this.tidyUpStateForSubmit(this.state.todo));
        }
    }

    
    render() {
        return this.props.category.loading ? <Loading /> : (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Title" autoFocus value={this.state.todo.title} onChange={this.onTitleChange}/>
                    <input type="text" placeholder="Description(optional)" value={this.state.todo.description} onChange={this.onDescriptionChange} />
                    <DatePicker selected={this.state.todo.due_by} isClearable onChange={date => this.onDateChange(date)} /> 
                    {this.props.isEdit && <button type="button" disabled={this.state.todo.completed} onClick={this.onCompleteChange}>Complete</button>}
                    <button type="button" onClick={this.onImportanceChange}>{this.state.todo.important ? "Important" : "Not Important"}</button>

                    {/* for adding categories*/} 
                    <div>
                        <h4>Add categories:</h4>

                        <button type="button" onClick={this.onNewCategoryClick}>Add New Category</button>
                        <ReactModal isOpen={this.state.modalIsOpen} onRequestClose={this.onModalReqClose} ariaHideApp={false}>
                            <CategoryForm onSubmit={this.onAddFormCategorySubmit} isEdit={false}/>
                        </ReactModal>
                        {this.props.category.categories.map((category)=>(
                            <button type="button" key={category.id} onClick={this.onOldCategoryClick} value={category.id}>
                                {this.state.todo.category_ids.includes(category.id) ? category.name + " (Sel)" : category.name}
                            </button>
                        ))}
                    </div>
                    
                    <button type="submit">{this.props.isEdit ? "Confirm changes" : "Add Todo"}</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    category: state.category
})

export default connect(mapStateToProps,{getCategories, addCategory})(TodoForm);