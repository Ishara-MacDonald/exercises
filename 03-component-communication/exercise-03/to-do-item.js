const template = document.createElement('template')
template.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>`

class TodoItem extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes(){
        return ['checked', 'index', 'text']
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case'checked':
                this._checked = this.hasAttribute('checked');
                break;
            case'index':
                this._index = parseInt(newValue);
                break;
            case'text':
                this._text = newValue;
                break;
        }

    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))

        this.querySelector('.item').addEventListener('click', (e) => {
            this.dispatchEvent(
            new CustomEvent('onToggle', {
                detail : this.getAttribute('index') 
            }));
        });

        this._renderTodoItem();
    }

    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.querySelector('.item').classList.add('completed');
        } else {
            this.querySelector('.item').classList.remove('completed');
        }

        this.querySelector('label').innerHTML = this._text;
    }

    set index(value) {
        this._index = value;
    }

    get index() {
        return this._index;
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }
}
window.customElements.define('to-do-item', TodoItem);