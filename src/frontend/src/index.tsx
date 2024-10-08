import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
