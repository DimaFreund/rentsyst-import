import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";


// ========================================

window.Date.prototype.yyyymmdd = function() {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();
    let yy = this.getFullYear();

    if(isNaN(yy)) {
        return false;
    }

    return [yy,
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};
window.Date.prototype.yymmddhhmmss = function() {
    let hh = this.getHours();
    let mm = this.getMinutes();
    let ss = this.getSeconds();

    let yymmdd = this.yyyymmdd();

    if(!yymmdd) {
        return false;
    }

    return yymmdd + ' ' + [
        (hh>9 ? '' : '0') + hh,
        (mm>9 ? '' : '0') + mm,
        (ss>9 ? '' : '0') + ss
    ].join(':');
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

