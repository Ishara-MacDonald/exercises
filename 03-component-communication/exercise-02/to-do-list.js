const template = document.createElement('template')
template.innerHTML = `
    <h1>To do</h1>
    <ul id="todos"></ul>
`;

class TodoList extends HTMLElement {
    _todos = []

    constructor() {
        super();
    }

    get todos(){
        return this._todos;
    }

    set todos(value){
        this._todos = value;

        this._renderList(this._todos);
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
    }

    _renderList(){
        // in the 'innerHTML' of #todos/ the ul, for every item in todos (todo) take the text and put them in <li>. then join() them.
        this.querySelector('#todos').innerHTML = this.todos.map(todo => `<li>${todo.text}</li>`).join('');
    }
}

window.customElements.define('to-do-list', TodoList);