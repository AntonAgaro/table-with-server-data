export default class Filter {
    static filter(tableSelector, inputSelector) {
        const table = document.querySelector(tableSelector);
        const input = document.querySelector(inputSelector);

        const {rows} = table;
        const regExpr = new RegExp(input.value, 'ig');
        rows.forEach(item => {
            if (regExpr.test(item.innerHTML)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}