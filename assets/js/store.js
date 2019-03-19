import { createStore, combineReducers } from 'redux'



function session(state = null, action){
  switch (action.type) {
    case 'NEW_SESSION':
        return action.data;
    defualt:
      return state
  }
}

function root_reducer(state0, action) {
    console.log('reducer', state0, action);
    return state0;
}

let store = createStore(root_reducer);
export default store;
