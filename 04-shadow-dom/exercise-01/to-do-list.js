import './to-do-item.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
        }
    
        ul {
            list-style: none;
            padding: 0;
        }
    
        input {
            font-size: 1em;
            padding: 0.5em;
            border: 2px solid #323232;
            border-radius: 2px;
        }
    
        button {
            background-color: #104436;
            border: 2px solid #08221b;
            border-radius: 2px;
            color: white; 
            cursor: pointer;
            font-size: 1em;
            padding: 0.5em 1em;
        }
    </style>
    <h1>To do</h1>
    <form id="todo-input">
        <input type="text" placeholder="Add a new to do"></input>
        <button>Voeg toe</button>
    </form>
    <ul id="todos"></ul>
`;

class ToDoList extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$todoList = this.__shadowRoot.querySelector('ul');
        this.$input = this.__shadowRoot.querySelector('input');

        this.$submitButton = this.__shadowRoot.querySelector('button');
        this.$submitButton.addEventListener('click', this._addTodo.bind(this))
    }

    _addTodo() {
        if(this.querySelector('input').value.length > 0){
            this._todos.push({
                text: this.querySelector('input').value, 
                checked: false 
            })
            this._renderTodoList();
            this.querySelector('input').value = '';
        }
    }

    _toggleTodo(event) {
        const todo = this._todos[event.detail];

        todo.checked = !todo.checked;

        this._renderTodoList();
    }

    _renderTodoList() {
        this.querySelector('#todos').innerHTML = '';

        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('to-do-item');
            $todoItem.setAttribute('text', todo.text);
            // if the to do is checked, set the attribute, else; omit it.
            if (todo.checked) {
                $todoItem.setAttribute('checked', '');                
            }
            // By setting index we have some state to keep track of the index
            // of the to do
            $todoItem.setAttribute('index', index);
            $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));
            this.querySelector('#todos').appendChild($todoItem);
        });
    }

    set todos(value) {
        this._todos = value;
        this._renderTodoList();
    }

    get todos() {
        return this._todos;
    }
}

window.customElements.define('to-do-list', ToDoList);