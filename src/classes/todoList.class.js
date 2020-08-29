import {Todo} from './todo.class';
export class TodoList {

    constructor (){
        this.getLocal();
    }

    nuevoTodo (todo){

        this.todos.push(todo);

        this.saveLocal();
    }

    eliminarTodo(id){
       this.todos =  this.todos.filter(todo => todo.id != id);

       this.saveLocal();
    }

    marcarCompletado(id){

        for (const todo of this.todos) {
            
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.saveLocal();
                break;
            }
        }
    }

    eliminarCompletados(){
        
        this.todos = this.todos.filter(todo => !todo.completado );

        this.saveLocal();
    }

    saveLocal(){

        localStorage.setItem('todoKey',JSON.stringify(this.todos));
    }

    getLocal(){
        this.todos =(localStorage.getItem('todoKey')) ? JSON.parse(localStorage.getItem('todoKey')) : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj)); 
        // map devuelve un obj y ese objeto lo mandamos de parametro a la fncion json que retorna el obje modificado y lo sobreescribe en el arr original
    }

    
}