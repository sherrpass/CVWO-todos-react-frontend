const defaultState = {
  todos:[],
  loading: TextTrackCueList,
  error: {}
};

export default (state = defaultState, {type, payload}) =>{
  switch(type){
    case("GET_TODOS"):
      return {
        ...state,
        todos:payload,
        loading:false
      };
    case("DELETE_TODO"):
      return {...state,
        todos:state.todos.filter((todo) => todo.id !== payload),
        loading: false
      };
    case("COMPLETE_TODO"):
      return {
        ...state,
        todos: state.todos.map((todo)=>(
        todo.id === payload ? {...todo, completed:true} : todo)),
        loading: false
        };
    case("TOGGLE_IMPORTANCE_TODO"):
      return {
        ...state,
        todos: state.todos.map((todo)=>
        (todo.id === payload ? {...todo, important:!todo.important} : todo)),
        loading: false
      };
    case("CLEAR_ALL_COMPLETED_TODOS"):
      return {
        ...state,
        todos: state.todos.filter((todo)=>!todo.completed),
        loading: false
      };
    case("TODO_ERROR"):
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ("LOADING"):
      return {
          ...state,
          loading: true,
        };
    default:
      return state;
  }
}

// case("ADD_TODO"):
    //   return {
    //     ...state,
    //     todos:[payload, ...state.todos],
    //     loading: false
    //   };
    // case("EDIT_TODO"):
    //   return {
    //     ...state,
    //     todos: state.todos.map((todo) =>
    //     (todo.id === payload.id ? {...todo, ...payload.update} : todo)),
    //     loading: false
    //   };