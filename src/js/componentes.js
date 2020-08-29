import {Todo} from '../classes'; 
import {Todolist} from '../index';

const divTodoList = document.querySelector('.todo-list');

const inputTodo = document.querySelector('.new-todo');
const btnDeletCompl = document.querySelector('.clear-completed');
const filterUl = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');
export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
                    <li class="${todo.completado? 'completed' :''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado? 'checked' :''} >
							<label>${todo.tarea} </label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
                    </li>`;
    
    

    divTodoList.innerHTML

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


inputTodo.addEventListener('keyup', (event) =>{

    const tarea = inputTodo.value;

    if(event.keyCode === 13 && tarea.length > 0){

        const nuevoTodo = new Todo(tarea);
        Todolist.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        inputTodo.value = '';
    }
});

divTodoList.addEventListener('click', (event) =>{

    const nombreElement = event.target.localName;

    const todoELement = event.target.parentElement.parentElement;

    const TodoId = todoELement.getAttribute('data-id');

    if(nombreElement.includes('input')){

        Todolist.marcarCompletado(TodoId);

        todoELement.classList.toggle('completed');

        console.log(Todolist);
    }else if(nombreElement.includes('button')){

        Todolist.eliminarTodo(TodoId);

        divTodoList.removeChild(todoELement);

    }
});

btnDeletCompl.addEventListener('click', () => {

    Todolist.eliminarCompletados();

    for (let i = divTodoList.children.length -1; i >= 0; i--){
        
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){

            console.log(elemento);
            divTodoList.removeChild(elemento);
        }
    }
});


filterUl.addEventListener('click',(event) =>{

    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});