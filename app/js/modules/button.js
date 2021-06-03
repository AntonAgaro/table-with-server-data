export default class Button {
    constructor(btnElement, url, tableWrapper, paginationWrapper, rowOnPage) {
        this.btn = document.querySelector(btnElement);
        this.url = url;
        this.tableWrapper = document.querySelector(tableWrapper);
        this.paginationWrapper = document.querySelector(paginationWrapper);
        this.rowOnPage = rowOnPage;
        this.dataStorage;
    }

    async uploadData() {
    await fetch(this.url)
        .then(res => res.json())
        .then(json => JSON.stringify(json))
        .then(obj => JSON.parse(obj))
        .then(obj => this.dataStorage = obj);
    }

    createPagination() {
        const paginationNum = Math.ceil(this.dataStorage.length / this.rowOnPage);
        for (let i = 1; i <= paginationNum; i++) {
            const pagItem = document.createElement('div');
            pagItem.className = 'pagination__item';
            pagItem.textContent = i;
            this.paginationWrapper.append(pagItem);
        }
    }

    createTable(pageNumber) {
        //Clean table wrapper
        this.tableWrapper.innerHTML = '';
        // Create table
        const table = document.createElement('table');
        table.className = 'table table-dark table-bordered border border-white';
        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Zip</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        this.tableWrapper.append(table);
        //Pagination formula
        const start = (pageNumber - 1) * this.rowOnPage;
        const end = start + this.rowOnPage;
        const partOfStorage = this.dataStorage.slice(start, end);
        //Create part of the main array with data for display right amount of rows on the active page
        partOfStorage.forEach(item => {
            const row = document.createElement('tr');
            const {id, firstName, lastName, email, phone, address} = item;
            const {streetAddress, city, state, zip} = address;
            //Create row
            row.innerHTML = `
                <td>${id}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${streetAddress}</td>
                <td>${city}</td>
                <td>${state}</td>
                <td>${zip}</td>
            `;

            const tableBody = document.querySelector(`.table > tbody`);
            tableBody.append(row);
        });
        //add active class on active page with deleting active class from prev page
        const pages = this.paginationWrapper.childNodes;
        pages.forEach(page => {
            if (page.classList.contains('pagination__item--active')) {
                page.classList.remove('pagination__item--active');
            }
            if (page.textContent == pageNumber) {
                page.classList.add('pagination__item--active');
            }
        });
    }

    bindBtn() {
        this.btn.addEventListener('click', async () => {
            //Clean table and pagination wrappers
            this.tableWrapper.innerHTML = '';
            this.paginationWrapper.innerHTML = '';
            //Upload
            await this.uploadData();
            //Create pagination and create page 1 of the table
            this.createPagination();
            this.createTable(1);
            //add Event listener on pagination wrapper
            this.paginationWrapper.addEventListener('click', (e) => {
                if (e.target.matches('.pagination__item')) {
                    const pageNumber = +e.target.textContent;
                    this.createTable(pageNumber);
                }
            });
        });
    }
}