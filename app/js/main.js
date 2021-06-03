import Button from './modules/button';

window.addEventListener('DOMContentLoaded', () => {
    const bigDataBtn = new Button('#big-data', 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}', '#table-wrapper', '#pagination', 15);
    bigDataBtn.bindBtn();

    const littleDataBtn = new Button('#little-data', 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}', '#table-wrapper', '#pagination', 15);
    littleDataBtn.bindBtn();
});