const listaDeTareas = document.querySelector("#tareas");
const tareasInput = document.querySelector("#nuevatarea");
const btnAgregar = document.querySelector("#agregartarea");
const cuentaTareas = document.querySelector("#tareasTotal");
const cuentaTareasCompletadas = document.querySelector("#tareasCompletadas");

let tareas = [];
let tareasInicio = [
  {
    id: 832,
    nombre: 'Lavar ropa',
    complete: false
  },
  {
    id: 894,
    nombre: 'Cocinar almuerzo',
    complete: false
  },
  {
    id: 564,
    nombre: 'Bañar al perro',
    complete: false
  }
];

btnAgregar.addEventListener("click", () => {
  añadirTarea({
    id: new Date().getMilliseconds(),
    nombre: tareasInput.value,
    complete: false
  });
});

function añadirTarea(nuevaTarea) {
  tareas.unshift(nuevaTarea); 

  tareasInput.value = ""; 

  actualizarListaTareas();
}

function actualizarListaTareas() {
  let html = "";
  tareas.forEach(tarea => {
    const claseCompletada = tarea.complete ? 'completada' : '';
    html += `<li id="${tarea.id}" class="${claseCompletada}">
       <span>${tarea.id}</span>
      <span>${tarea.nombre}</span>
      <input class="checkbox" type="checkbox" id="check-${tarea.id}" ${tarea.complete ? 'checked' : ''} onchange="marcarCompleta(${tarea.id}, this)">
      <button onclick="borrarTarea(${tarea.id})"><i class="fa-solid fa-trash fa-xs"></i></button>
    </li>`;
  });
  listaDeTareas.innerHTML = html;
  cuentaTareas.textContent = `${tareas.length}`;
  cuentaTareasCompletadas.textContent = `${tareas.filter((tarea) => tarea.complete).length}`;
}

function borrarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
  actualizarListaTareas();
}

function marcarCompleta(id, checkbox) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.complete = checkbox.checked;
    actualizarListaTareas();
    
    const filaTarea = document.getElementById(id);
    if (filaTarea) {
      filaTarea.style.color = checkbox.checked ? 'green' : 'none';
      filaTarea.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    }
  }
}


const init = () => {
  tareasInicio.forEach(tarea => añadirTarea(tarea));
}

init();
