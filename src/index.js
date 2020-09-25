import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";


// ========================================

window.Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

