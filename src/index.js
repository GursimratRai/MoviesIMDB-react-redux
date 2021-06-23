import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './Components/App';
import rootReducer from './Reducers';

//Curry Function
//curried form of function logger(obj,next,action)
//logger(obj)(next)(action) internally by redux.
//Method 1 :
// const logger = function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       //middleware
//       console.log('MIDDLEWARE ACTION TYPE=',action.type);
//       next(action);
//     }
//   }
// }

//Method 2: using arrow function
const logger = ({dispatch,getState}) => (next) => (action) => {
  if(typeof action !== 'function'){
    console.log("MIDDLEWARE ACTION TYPE=",action.type);
  }
  next(action);
}

//handle search 
// const thunk = ({dispatch,getState}) => (next) => (action) => {
//   if(typeof action === 'function')
//   {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer,applyMiddleware(logger,thunk));
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies: [{name:'Superman'}]
// });
// console.log('after',store);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
