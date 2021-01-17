import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import watcherSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);
let store = createStore(
    rootReducer,
    enhancer
);

sagaMiddleware.run(watcherSaga);


export default store;