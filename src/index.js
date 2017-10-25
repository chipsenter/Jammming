import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import Footer from './Components/Footer/Footer';

ReactDOM.render(
    <App>
    <Footer/>
    </App>,
    document.getElementById('root'));
registerServiceWorker();
