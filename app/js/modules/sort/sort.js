import SortPointer from "./add-sort-pointer";

let sorted = true;
let lettersSorted = true;
    class Sort {
    static sort (tableSelector, i) {
        const table = document.querySelector(tableSelector);
        const {rows, tBodies} = table;
        const parent = Array.from(rows[0].childNodes).filter(item => item.tagName == 'TH')[i];
        //Take rows, cut tr (title), then sort them by content in FIRST td (id) 
        const sortedRows = Array.from(rows)
        .slice(1);
        if (sorted == true) {
            sortedRows.sort((rowA, rowB) => +rowA.cells[i].innerHTML - +rowB.cells[i].innerHTML);
            SortPointer.createSortPointer(parent, sorted);
            sorted = false; 
        } else
        if (sorted == false) {
            sortedRows.sort((rowA, rowB) => +rowB.cells[i].innerHTML - +rowA.cells[i].innerHTML);
            SortPointer.createSortPointer(parent, sorted);
            sorted = true; 
        }
        tBodies[0].append(...sortedRows);
    }

    static lettersSort(tableSelector, i) {
        const table = document.querySelector(tableSelector);
        const {rows, tBodies} = table;
        const parent = Array.from(rows[0].childNodes).filter(item => item.tagName == 'TH')[i];
        const sortedRows = Array.from(rows)
        .slice(1);
        if (lettersSorted == true) {
            sortedRows.sort((rowA, rowB) => rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1);
            SortPointer.createSortPointer(parent, lettersSorted);
            lettersSorted = false; 
        } else
        if (lettersSorted == false) {
            sortedRows.sort((rowA, rowB) => rowB.cells[i].innerHTML > rowA.cells[i].innerHTML ? 1 : -1);
            SortPointer.createSortPointer(parent, lettersSorted);
            lettersSorted = true; 
        }
        tBodies[0].append(...sortedRows);
    }
}

export {Sort};