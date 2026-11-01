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
    tareas.forEach(function(tarea, indice) {
        const elemento = document.createElement("li");
        /* casilla para completar */
        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.completada;
        /* Texto */
        const texto = document.createElement("span");
        texto.textContent = " " + tarea.titulo +
            " - Prioridad: " + tarea.prioridad + " ";
        if (tarea.completada) {
            texto.style.textDecoration = "line-through";
        }
        /* Evento */
        casilla.addEventListener("change", function() {
            tarea.completada = casilla.checked;
            mostrarTareas();
        });
        /* boton editar */
const botonEditar = document.createElement("button");
botonEditar.textContent = "Editar";
botonEditar.className="boton-editar";/* asignan una clase CSS a cada botón */
botonEditar.addEventListener("click", function() {

    const nuevoTitulo = prompt(
        "Modifica el nombre de la tarea:",
        tarea.titulo
    );

    if (nuevoTitulo === null) {
        return;
    }

    if (nuevoTitulo.trim() === "") {
        alert("El nombre de la tarea no puede estar vacío.");
        return;
    }

    const nuevaPrioridad = prompt(
        "Escribe la prioridad: alta, media o baja",
        tarea.prioridad
    );

    if (nuevaPrioridad === null) {
        return;
    }

    const prioridadEditada = nuevaPrioridad.trim().toLowerCase();

    if (
        prioridadEditada !== "alta" &&
        prioridadEditada !== "media" &&
        prioridadEditada !== "baja"
    ) {
        alert("La prioridad debe ser alta, media o baja.");
        return;
    }

    tarea.titulo = nuevoTitulo.trim();
    tarea.prioridad = prioridadEditada;

    mostrarTareas();

}); /* fin editar */

        /* Boton eliminar */
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className="boton-eliminar";/* asignan una clase CSS a cada botón */
        botonEliminar.addEventListener("click", function() {

            const confirmar = confirm("¿Deseas eliminar esta tarea?");

            if (confirmar) {
                tareas.splice(indice, 1);
                mostrarTareas();
            }

        });

        /* Agregar a la lista */
        elemento.appendChild(casilla);
        elemento.appendChild(texto);
        elemento.appendChild(botonEliminar);
        elemento.appendChild(botonEditar);

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