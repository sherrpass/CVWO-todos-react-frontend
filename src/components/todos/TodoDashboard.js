import React, {useEffect} from 'react';
import { connect } from "react-redux";
import NamePage from "./NamePage";
import CreatedAtPage from "./CreatedAtPage";
import TodoFilters from "./TodoFilters";
import DueByPage from "./DueByPage";
import { getTodos } from "../../actions/todos";


const TodoDashboard = ({getTodos, sortBy}) => {
  useEffect(()=>{
    getTodos();
  },[getTodos])
  return (<div>
    <h1>Todos</h1>
    <TodoFilters />
    {sortBy === "name" ? <NamePage /> : (sortBy === "createdAt" ?  <CreatedAtPage/> : <DueByPage />)}
  </div>);
}
// class TodoDashboard extends React.Component {
//   componentDidMount() {
//     this.props.getTodos();
//   }
//   render(){
    
//   }
// }

const mapStateToProps = (state) => ({
  sortBy: state.filters.sortBy
});
export default connect(mapStateToProps, {getTodos})(TodoDashboard);
// export default connect(mapStateToProps)(TodoDashboard);