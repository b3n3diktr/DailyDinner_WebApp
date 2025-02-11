import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";

let devMode = false;

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
    devMode = true;
}

// @ts-ignore
const root = createRoot(document.getElementById('root'));

if(devMode) {
    root.render(
        <StrictMode>
                <App/>
        </StrictMode>
    )
}else{
    root.render(<App/>)
}
