import { Todo } from "./todo.class";


export class TodoList{

    constructor(){
        this.cargarLocalStrorage();
    }


    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }


    borrarTodo(id){
       this.todos= this.todos.filter(todo => todo.id !=id);
    }


    marcarCompletado(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado =!todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    borrarCompletados(){
        this.todos= this.todos.filter(todo =>!todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
     
    }

    cargarLocalStrorage(){
       this.todos = (localStorage.getItem('todo')) ?JSON.parse(localStorage.getItem('todo')) : [];

       this.todos = this.todos.map( Todo.fromJson);
    }

}