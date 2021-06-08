export default class ModalWindow {
    static createModalWindow(tableSelector) {
        const table = document.querySelector(tableSelector);
        const {rows} = table;

        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const modalWindow = document.createElement('div');
        modalWindow.className = 'modal-window';
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'modal-wrapper';

        const ths = Array.from(rows[0].childNodes).filter(item => item.tagName == 'TH');
        ths.forEach(item => {
            modalWrapper.innerHTML += `
            <div>
                <label for="input-for-${item.innerHTML}" class="col-form-label">${item.innerHTML}</label>
                    <input type="text" class="form-control" id="input-for-${item.innerHTML}">
            </div>
            `;
            
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-dark';
        addBtn.id = 'add-button';
        addBtn.textContent = 'Add';
        
        modalWindow.append(modalWrapper);
        modalWindow.append(addBtn);

        overlay.append(modalWindow);
        document.body.append(overlay);
        
    }

    static removeModalWindow(overlaySelector) {
        const overlay = document.querySelector(overlaySelector);
        overlay.remove();
    }
}