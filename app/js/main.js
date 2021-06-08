import AddNewTr from './modules/add-new-element/add-new-tr';
import ModalWindow from './modules/add-new-element/show-modal-window';
import Button from './modules/button';
import Filter from './modules/filter';
import {Sort} from './modules/sort/sort';


window.addEventListener('DOMContentLoaded', () => {
    const bigDataBtn = new Button('#big-data', 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}', '#table-wrapper', '#pagination', 15);
    bigDataBtn.bindBtn();

    const littleDataBtn = new Button('#little-data', 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}', '#table-wrapper', '#pagination', 15);
    littleDataBtn.bindBtn();

    document.addEventListener('click', (event) => {
        const target = event.target;
        //Filter function
        if (target.matches('#filter-btn')) {
            Filter.filter('.table', '#filter-input');
        }
        
        //Sort function
        if (target.matches('th')) {
            const ths = document.querySelectorAll('th');
            ths.forEach((item, index) => {
                if (item == target && (index == 0 || index == 8)) {
                    Sort.sort('.table', index);
                } else if (index == 4) {
                    return;
                }
                else 
                if (item == target && (index == 1 || index == 2 || index == 3 || index == 5 || index == 6 || index == 7)) {
                    Sort.lettersSort('.table', index);
                } 
            });
        }

        //Create and remove modalWindow 
        if (target.matches('#add-btn')) {
            ModalWindow.createModalWindow('.table');
        }
        if(target.matches('.overlay')) {
            ModalWindow.removeModalWindow('.overlay');
        }

        //Add new Element
        if (target.matches('#add-button')) {
            AddNewTr.createNewTr('.table');
            ModalWindow.removeModalWindow('.overlay');
        }
    });
});

