import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, projectReducer, userReducer, analyticsReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	project: projectReducer,
	analytics: analyticsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
