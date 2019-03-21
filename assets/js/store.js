import { createStore, combineReducers } from 'redux'

function taskForm(state = {
                            title: "",
                            description: "",
                            completed: false,
                            user: {id: 0, email: ""}}, action) {
    switch(action.type) {
      case 'RESET_TASK_FORM':
        return {
               title: "",
               description: "",
               completed: false,
               user: {id: 0, email: ""}}
      case 'SET_TASK_FORM':
        return action.data;
      case 'UPDATE_TASK_TITLE':
        return {...state, title: action.data}
      case 'UPDATE_TASK_DESCRIPTION':
        return {...state, description: action.data}
      case 'UPDATE_TASK_COMPLETED':
        return {...state, completed: action.data}
      case 'UPDATE_TASK_USER':
        return {...state, user: action.data}
      default:
          return state;
    }
}

function modal(state = {show: false, type: ''}, action) {
  switch (action.type) {
      case 'SHOW_MODAL':
        return {...state, show: true};
      case 'HIDE_MODAL':
        return {...state, show: false};
      case 'SET_MODAL_TYPE':
        return {...state, type: action.data}
      default:
        return state;
  }
}

function selectedTask(state = null, action){
    switch (action.type) {
      case 'SET_TASK':
        return action.data;
      default:
        return state;
    }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
        return action.data;
    default:
        return state;
  }
}

function session(state = null, action){
  switch (action.type) {
    case 'NEW_SESSION':
        return action.data;
    default:
      return state;
  }
}

function tasks(state = [], action) {
  switch (action.type) {
      case 'TASK_LIST':
        return action.data;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
    console.log('reducer', state0, action);
    const reducer = combineReducers({users, session, tasks, selectedTask, modal, taskForm});
    const state1 = reducer(state0, action);
    return state1;
}

let store = createStore(root_reducer);
export default store;
