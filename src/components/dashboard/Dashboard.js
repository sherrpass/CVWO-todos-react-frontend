import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todos";
import { getCategories, setCurrCategory } from "../../actions/categories";
import CategoriesSidebar from "./CategoriesSidebar";
// import BoardTopSection from "./BoardTopSection";
// import BoardMainSection from "./BoardMainSection";
import Loading from "../layout/Loading";

const Dashboard = ({
    getTodos,
    getCategories,
    setCurrCategory,
    loading,
    match: {
        params: { id },
    },
}) => {
    useEffect(() => {
        getTodos();
        getCategories();
    });
    useEffect(() => {
        if (id) {
            setCurrCategory(parseInt(id));
        } else {
            setCurrCategory();
        }
    }, [id]);
    return loading ? (
        <Loading />
    ) : (
        <div className="dashboard">
            <CategoriesSidebar />

            <div className="board"></div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loading: state.category.loading || state.todo.loading,
});
export default connect(mapStateToProps, {
    getTodos,
    getCategories,
    setCurrCategory,
})(Dashboard);

// class Dashboard extends Component {
//     componentDidMount() {
//         this.props.getTodos();
//         this.props.getCategories();
//     }
//     render() {
//         return this.props.loading ? (
//             <Loading />
//         ) : (
//             <div className="dashboard">
//                 <CategoriesSidebar />

//                 <div className="board"></div>
//             </div>
//         );
//     }
// }

// function mapStateToProps(state) {
//     return { loading: state.category.loading || state.todo.loading };
// }

// export default connect(mapStateToProps, { getTodos, getCategories })(Dashboard);
