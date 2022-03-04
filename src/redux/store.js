// ./store/store
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataProductReducer from './reducers/dataProductReducer';
import shippingAddresReducer from './reducers/shippingAddresReducer';
import bagReducer from './reducers/bagReducer';
import UIReducer from './reducers/UIReducer';
import urlHeadnavReducer from './reducers/URL_HeadnavReducer';
import urlProfileReducer from './reducers/URL_ProfileButtonTabReducer';
import seputarOngkirReducer from './reducers/SeputarOngkirReducer';
import seputarOngkirForCheckoutReducer from './reducers/SeputarOngkirForCheckoutReducer';
import formLoginReducer from './reducers/formLoginReducer';
import idUniqCartReducer from './reducers/idUniqCartReducer';
import orderReducer from './reducers/orderReducer';

import uiPesanan from '../pages/admin/pesanan/redux/reducer/uiPesanan';
import storage from './sync_storage';

//Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import dataHistoryOrder from './reducers/dataHistoryOrderReducer';

// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// const storage = require('redux-persist/lib/storage').default;

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
    user: userReducer, // semua hasil dari userReducer akan disimpan kedlam state user
    dataProduct: dataProductReducer,
    shippingAddres: shippingAddresReducer,
    bag: bagReducer,
    detailOngkir: seputarOngkirReducer,
    detailOngkirForCheckout: seputarOngkirForCheckoutReducer,
    formLoginData: formLoginReducer,
    UI: UIReducer,
    url: urlHeadnavReducer,
    url_profile: urlProfileReducer,
    data_history_order: dataHistoryOrder,
    idUniqCart: idUniqCartReducer,
    orderUniq: orderReducer,
    uiPesanan
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        // const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
    if (isServer) {
        //If it's on server side, create a store
        return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
    } else {
        //If it's on client side, create a store which will persist
        // const { persistStore, persistReducer } = require('redux-persist');

        const persistConfig = {
            key: 'nextjs',
            blacklist: ['url_profile'],
            whitelist: [
                'user',
                'url',
                'dataProduct',
                'bag',
                'shippingAddres',
                'detailOngkirForCheckout',
                'idUniqCart',
                'orderUniq'
            ],

            storage // if needed, use a safer storage
        };

        const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

        const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware])); // Creating the store again

        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return store;
    }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
