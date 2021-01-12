import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todos";
import { getCategories } from "../../actions/categories";
import CategoriesSidebar from "./CategoriesSidebar";
import BoardTopSection from "./BoardTopSection";
import BoardMainSection from "./BoardMainSection";
import Loading from "../layout/Loading";

const Dashboard = ({ getTodos, getCategories, loading }) => {
    const [showSideBar, setShowSideBar] = useState(true);
    useEffect(() => {
        getTodos();
        getCategories();
    });
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };
    return loading ? (
        <Loading />
    ) : (
        <div className="dashboard">
            <div
                className={
                    "categories-sidebar" + (showSideBar ? "" : " closed")
                }
                onClick={toggleSideBar}
            >
                <CategoriesSidebar showSideBar={showSideBar} />
            </div>
            <div className={"board" + (showSideBar ? "" : " closed")}>
                <BoardTopSection />
                <BoardMainSection />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loading: state.category.loading || state.todo.loading,
});
export default connect(mapStateToProps, {
    getTodos,
    getCategories,
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
