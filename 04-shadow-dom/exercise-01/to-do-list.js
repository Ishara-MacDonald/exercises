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

        this.$todoList = this._shadowRoot.querySelector('ul');
        this.$input = this._shadowRoot.querySelector('input');

        this.$submitButton = this._shadowRoot.querySelector('button');
        this.$submitButton.addEventListener('click', this._addTodo.bind(this))
    }

    _addTodo(event) {
        event.preventDefault();

        if(this.$input.value.length > 0){
            this._todos.push({
                text: this.$input.value, 
                checked: false
            })
            this._renderTodoList();
            this.$input.value = '';
        }
    }

    _toggleTodo(event) {
        const todo = this._todos[event.detail];
        // this._todos[event.detail] = Object.assign({}, todo, {
        //     checked: !todo.checked
        // });

        todo.checked = !todo.checked;

        this._renderTodoList();
    }

    _renderTodoList() {
        this.$todoList.innerHTML = '';

        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('to-do-item');
            $todoItem.setAttribute('text', todo.text);
            
            if (todo.checked) {
                $todoItem.setAttribute('checked', '');                
            }
            
            $todoItem.setAttribute('index', index);
            $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));
            this.$todoList.appendChild($todoItem);
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