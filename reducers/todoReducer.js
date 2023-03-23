    import {ADD_TODO,REMOVE_TODO,EDIT_TODO, ADD_TEXT} from '../actions/ActionType'

    const INITIAL_STATE={
        todos:[],
        text:''
    };



    const todoReducer=(state=INITIAL_STATE,action)=>
    {
        switch(action.type)
        {

        case ADD_TEXT:
            return{...state,text:action.payload

        }
        case ADD_TODO:         
            return {
            todos:[...state.todos,action.payload]};

        case REMOVE_TODO:
        return {

        todos:handleRemoveTodo(action.payload,state.todos)
        };
        
        case EDIT_TODO:
            console.log("this workd") 
            return {     
                todos : editTodoHandler(action.payload,state.todos)
            }
        // return {
        //     ...state,text:state.todos[action.payload]
        // };


    default:
        return state;
        }
    };

    const handleRemoveTodo=(item,todos)=>
    {
        const todoIndex=todos.indexOf(item);
        todos.splice(todoIndex,1);
        return todos;
    };

    const editTodoHandler=(item,todos)=>{
        console.log(item)
        console.log(todos)
        const removefirst = todos.findIndex(todo => 
            (todo.id === item.id && todo.task === item.OldData.task))
            
            todos.splice(removefirst , 1);
            
        const newItem = {
            Date : item.Date,
            Time : item.Time,
            id : item.id,
            task : item.task
        }
        todos.push(newItem);
        return todos
        
    }

    export default todoReducer;