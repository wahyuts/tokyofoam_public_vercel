import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
// import dataReducer from './reducers/dataReducer';
import dataProductReducer from './reducers/dataProductReducer';
import shippingAddresReducer from './reducers/shippingAddresReducer';
import UIReducer from './reducers/UIReducer';

//Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//State dasar /base pada redux (bentuknya object)
const initialState = {};

//kumpulan middleware
const middleware = [thunk];

// create rootReducer or combine reducer disini dimana setiap state disini menyimpan hasil dari reducer masing2
const reducers = combineReducers({
    user: userReducer, // semua hasil dari userReducer akan disimpan kedlam state user
    // data: dataReducer,
    dataProduct: dataProductReducer,
    shippingAddres: shippingAddresReducer,
    UI: UIReducer
});

// store and combine with redux persist
//(NOTED: matikan or comment bagian yang terhubung dengan redux persist jika tidak mau menggunakan redux persisit)

const persistConfig = {
    //persistConfig bagian dari redux persist
    key: 'root',
    blacklist: ['shippingAddres', 'dataProduct'],
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers); //bagian redux persist

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
    persistedReducer, // Bagian redux persist
    initialState,
    enhancer
);

const persistor = persistStore(store); // bagian redux persist

module.exports = store;
