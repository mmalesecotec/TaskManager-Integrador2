/* Arregolo de tareas */
let tareas = [];

/* Datos del HTML */
/* getElementById() busca un elemento de HTML */
const formulario = document.getElementById("formulario-tarea");
const titulo = document.getElementById("titulo");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("lista-tareas");

/* Mostrar las tareas */
function mostrarTareas() {
    lista.innerHTML = "";
    tareas.forEach(function(tarea) {
        const elemento = document.createElement("li");
        elemento.textContent = tarea.titulo + " - Prioridad: " + tarea.prioridad;
        lista.appendChild(elemento);
    });
}

/* Agregar tarea */
/* addEventListener Detecta cuando pulsamos Agraegar */
/* preventDefault evita que el formulario recargue la página */
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nombreTarea = titulo.value.trim();
    /* preguntar si no esta vacio */
    if (nombreTarea === "") {
        alert("Por favor, escribe el nombre de la tarea.");
        return;
    }

    /* crear la nueva tarea */
    const nuevaTarea = {
        titulo: nombreTarea,
        prioridad: prioridad.value,
        completada: false,
        fecha: new Date().toISOString()
    };

    /* Agregar la tarea al arreglo */
    tareas.push(nuevaTarea);

    /* actualizar la lista */
    mostrarTareas();

    /* inicializar el campo */
    titulo.value = "";

});