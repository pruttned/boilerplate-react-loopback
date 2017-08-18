// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render(<App />, document.getElementById('main'));

if (module.hot) {
    module.hot.accept();
}