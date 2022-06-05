import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import { initializeApp } from 'firebase/app';

import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const firebaseConfig = {
    apiKey: 'AIzaSyDvGHUQ3wWPs9gX5wfkrNZUvc2bQrRX2SA',
    authDomain: 'memories-mern-418ae.firebaseapp.com',
    projectId: 'memories-mern-418ae',
    storageBucket: 'memories-mern-418ae.appspot.com',
    messagingSenderId: '977005385259',
    appId: '1:977005385259:web:49f3b8e26348d4e824bc6e',
    measurementId: 'G-FFGFFWJ2DK',
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
