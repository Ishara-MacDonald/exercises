const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
        }
        .completed {
            text-decoration: line-through;
        }
        button {
            border: none;
            cursor: pointer;
        }
    </style>
    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>
`;

class TodoItem extends HTMLElement {
    __shadowRoot = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({mode:'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$item = this._shadowRoot.querySelector('.item');
        this.$text = this._shadowRoot.querySelector('label');
        this.$checkbox = this._shadowRoot.querySelector('input');

        this.$checkbox.addEventListener('click', (e) =>{
            this.dispatchEvent(new CustomEvent('OnToggle',{ detail : this.index }));
        });
    }

    static get observedAttributes(){
        return ['checked', 'index', 'text']
    }

    connectedCallback() {
        if(!this.hasAttribute('text')){
            this.setAttribute('text', 'placeholder');
        }

        this._renderTodoItem();
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

    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.$item.classList.add('completed');
            this.$checkbox.setAttribute('checked', '');
        } else {
            this.$item.classList.remove('completed');
            this.$checkbox.removeAttribute('checked');
        }

        this.$text.innerHTML = this._text;
    }

    set index(value) {
        this.setAttribute('index', value);
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