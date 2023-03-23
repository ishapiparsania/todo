import {ADD_TODO,REMOVE_TODO,EDIT_TODO,ADD_TEXT} from '../actions/ActionType';

export const AddText=(payload)=>(
    {type:ADD_TEXT,payload}
);

export const AddTodo=(payload)=>(
    {type:ADD_TODO,payload}
);

export const RemoveTodo=(payload)=>

    ({type:REMOVE_TODO,payload});


export const EditTodo=(payload)=>(
    {type:EDIT_TODO,payload}
);
