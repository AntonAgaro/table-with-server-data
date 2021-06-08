export default class SortPointer {
    static createSortPointer(parentNode, sorted) {
        const parent = parentNode;
        const findPointer = document.querySelector('.pointer') || '';
        if (findPointer) {
            findPointer.remove();
        }
        const pointer = document.createElement('i');
        if (sorted) {
            pointer.className = 'fas fa-caret-down pointer';
        } else {
            pointer.className = 'fas fa-caret-down pointer pointer--reverse';
        }
        
        parent.append(pointer);
        console.log(findPointer);
        
    }
}