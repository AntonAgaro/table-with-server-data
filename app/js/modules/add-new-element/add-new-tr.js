export default class AddNewTr {

    static readInputsValue(modalWrapperSelector) {
        const modalWrapper = document.querySelector(modalWrapperSelector);
        const onliDivs = Array.from(modalWrapper.childNodes).filter(item => item.tagName == 'DIV');
        
        const allInputsValue = [];
        onliDivs.forEach(item => {
            item.childNodes.forEach(child => {
                if ( child.tagName == 'INPUT') {
                    allInputsValue.push(child.value);
                }
            });
        });
        
        return allInputsValue;
    }

    static createNewTr(tableSelector) {
        const table = document.querySelector(tableSelector);
        const {tBodies} = table;
        
        const newTr = document.createElement('tr');

        AddNewTr.readInputsValue('.modal-wrapper').forEach(item => {
            newTr.innerHTML += `<td>${item}</td>`;
        });

        tBodies[0].append(newTr);
        
    }
}