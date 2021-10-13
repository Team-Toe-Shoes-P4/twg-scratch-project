import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';
import {AuthProvider} from "./context/authContext.jsx"


render(
    <AuthProvider>
    <App/>
    </AuthProvider>,
    document.getElementById('app')
);