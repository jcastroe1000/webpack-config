//referentecias
import {Todo}         from '../classes';
import {todoList}     from '../index';

const divTodoList        = document.querySelector('.todo-list');
const agregar            = document.querySelector('.new-todo');
const limpiarCompletados = document.querySelector('.clear-completed');
const filtros            = document.querySelector('.filters');
const filtros2           = document.querySelectorAll('.filtro');



export const crearTodoHtml = (todo) =>{
    const htmlTodo=
    `<li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
				<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li> `;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;


}

//agregar nuevo

agregar.addEventListener('keyup',(event)=>{
  if(event.keyCode ===13 && agregar.value.length >0){
    const nuevoTodo = new Todo(agregar.value);
    console.log(agregar.value);
    todoList.nuevoTodo(nuevoTodo);
    console.log(todoList);
    crearTodoHtml(nuevoTodo);
    agregar.value='';
  }
});

divTodoList.addEventListener('click',(event) =>{
  const nombreElemento = event.target.localName;
  const todoElemento   = event.target.parentElement.parentElement;
  const todoId         =todoElemento.getAttribute('data-id');
  
  if (nombreElemento.includes('input')){
      todoList.marcarCompletado(todoId);
      todoElemento.classList.toggle('completed');
  }else if (nombreElemento.includes('button')){

    todoList.borrarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
})



limpiarCompletados.addEventListener('click',()=>{
  todoList.borrarCompletados();
  for (let i= divTodoList.children.length-1;i>=0;i--){
      const elemento =divTodoList.children[i];
      if(elemento.classList.contains('completed')){
        divTodoList.removeChild(elemento);
      }
  }
});

filtros.addEventListener('click', (event)=>{
  const filtro =event.target.text;
  if(!filtro) {return;}
  filtros2.forEach( elem  => elem.classList.remove('selected'));
  event.target.classList.add('selected');
  for (const elemento of divTodoList.children){
      elemento.classList.remove('hidden');
      const completado = elemento.classList.contains('completed');

      switch (filtro){
         case 'Pendientes':
           if (completado){
             elemento.classList.add('hidden');
           }
           break;
           case 'Completados':
           if (!completado){
             elemento.classList.add('hidden');
           }
           break;
      }
  }
})