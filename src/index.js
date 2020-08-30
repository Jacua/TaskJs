import './styles.css';
import {Todo,TodoList} from './classes/index';
import {crearTodoHtml} from './js/componentes';

export const Todolist = new TodoList();


Todolist.todos.forEach(todo => crearTodoHtml(todo));
 

