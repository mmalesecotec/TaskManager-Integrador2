import { nombreVacio } from "./utilidades.js";
/* Arregolo de tareas */
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtroActual = "todas";/* Esta variable almacena qué tipo de tareas queremos mostrar */

/* Guardar las tareas en LocalStorage */
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
/* fin Guardar las tareas en LocalStorage */

/* Datos del HTML */
/* getElementById() busca un elemento de HTML */
const formulario = document.getElementById("formulario-tarea");
const titulo = document.getElementById("titulo");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("lista-tareas");

/* Mostrar las tareas */
function mostrarTareas() {
    guardarTareas();
    actualizarDashboard();
    lista.innerHTML = "";
    /* preparar las areas para ordenarlas */
    let tareasOrdenadas = tareas.map(function(tarea, indice) {
    return { tarea: tarea, indice: indice };
    });

    /* Ordenar por prioridad */
    if (selectorOrden.value === "prioridad") {

    const valoresPrioridad = {
        alta: 1,
        media: 2,
        baja: 3
    };

    tareasOrdenadas.sort(function(a, b) {
        return valoresPrioridad[a.tarea.prioridad.toLowerCase()] -
               valoresPrioridad[b.tarea.prioridad.toLowerCase()];
    });

}
/* Fin preparar las areas para ordenarlas */

    tareasOrdenadas.forEach(function(elementoOrdenado) {
    const tarea = elementoOrdenado.tarea;
    const indice = elementoOrdenado.indice;

    /* Comprobar si la tarea debe mostrarce */
    if (filtroActual === "pendientes" && tarea.completada) {
        return;
    }

    if (filtroActual === "completadas" && !tarea.completada) {
        return;
    }
    /* fin comprobar si la tarea debe mostrarce */
    /* Comprobar el texto de busqueda */
    const textoBusqueda = campoBusqueda.value.toLowerCase().trim();

    if (!tarea.titulo.toLowerCase().includes(textoBusqueda)) { /* esta condición filtra lo que coincide */
    return;
    }
    /* fin comprobar el texto de busqueda */

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

    /* Verificar si el nuevo nombre ya existe */
const nombreRepetido = tareas.some(function(otraTarea) {
    return otraTarea !== tarea &&
           otraTarea.titulo.toLowerCase() === nuevoTitulo.trim().toLowerCase();
});

if (nombreRepetido) {
    alert("Ya existe otra tarea con ese nombre.");
    return;
}
/* Fin verificar nombre repetido */


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
    if (nombreVacio(nombreTarea)) {
        alert("Por favor, escribe el nombre de la tarea.");
        return;
    }

    /* Verificar si la tarea ya existe */
    const tareaExiste = tareas.some(function(tarea) { /*revisa si ya existe la tarea */
    /*no distingue mayúsculas ni minúsculas */
    return tarea.titulo.toLowerCase() === nombreTarea.toLowerCase();
    });

    if (tareaExiste) {
    alert("Esta tarea ya está registrada.");
    return;
    }
    /* Fin verificar tarea duplicada */

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

/* Botones de fltro */
const botonTodas = document.getElementById("filtro-todas");
const botonPendientes = document.getElementById("filtro-pendientes");
const botonCompletadas = document.getElementById("filtro-completadas");

/* Todas las tareas */
botonTodas.addEventListener("click", function() {
    filtroActual = "todas";
    mostrarTareas();
});

/* Tareas pendientes */
botonPendientes.addEventListener("click", function() {
    filtroActual = "pendientes";
    mostrarTareas();
});

/* Tareas completas */
botonCompletadas.addEventListener("click", function() {
    filtroActual = "completadas";
    mostrarTareas();
});

/* Buscar tarea por nombre */
const campoBusqueda = document.getElementById("buscar-tarea");

campoBusqueda.addEventListener("input", function() {
    mostrarTareas();
});

/* Seleccionar orden de tareas */
const selectorOrden = document.getElementById("orden-prioridad");

selectorOrden.addEventListener("change", function() {
    mostrarTareas();
});
/* fin Seleccionar orden de tareas */

/* Actualizar Dashboard */
function actualizarDashboard() {

    /* Contar todas las tareas */
    const total = tareas.length;

    /* Contar tareas completadas */
    const completadas = tareas.filter(function(tarea) {
        return tarea.completada === true;
    }).length;

    /* contar tareas pendientes */
    const pendientes = total - completadas;

    /* Mostrar resultados */
    document.getElementById("total-tareas").textContent = total;
    document.getElementById("tareas-pendientes").textContent = pendientes;
    document.getElementById("tareas-completadas").textContent = completadas;

}
/* Fin Actualizar Dashboard */

/* Consultar tareas a JSONPLACEHOLDER */
function consultarAPI() {

    const mensajeAPI = document.getElementById("mensaje-api");
	mensajeAPI.textContent = "Cargando tareas...";

    /*solicita información- 5 tareas*/
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(function(respuesta) {
    /* Verifica que la respuesta sea correcta */
    if (!respuesta.ok) {
        throw new Error("Error al consultar el servidor");
    }
    return respuesta.json();
    })
        .then(function(datos) {
        mensajeAPI.textContent = "Tareas cargadas correctamente.";
        console.log("Tareas recibidas desde la API:");
        console.log(datos);
        /* Mostrar tareas en pantalla */
        const listaAPI = document.getElementById("lista-api");
        listaAPI.innerHTML = "";
        datos.forEach(function(tarea) {
        const elemento = document.createElement("li");
        elemento.textContent = tarea.title + " - " +
            (tarea.completed ? "Completada" : "Pendiente");
        listaAPI.appendChild(elemento);
    });

})
        .catch(function(error) {
            mensajeAPI.textContent = "No se pudieron cargar las tareas.";
            console.log("Error al consultar la API:", error);
        });

}

/* Consultar API al hacer Click */
/* no se ejecuta al abrir la pagina, solo al hacer click */
document.getElementById("btn-cargar-api").addEventListener("click", function() {
    consultarAPI();
});
/* Fin Consultar tareas a JSONPLACEHOLDER */
/* Mostrar las tareas guardadas al iniciar */
mostrarTareas();
/* Fin mostrar las tareas guardadas al iniciar */