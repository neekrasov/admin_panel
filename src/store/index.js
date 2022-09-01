import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') return oldDispatch({type: action});
        return oldDispatch(action);
    }

    return store
    
}

const store = createStore(combineReducers({filters, heroes}), compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;