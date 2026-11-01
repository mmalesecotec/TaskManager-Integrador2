
/* Guardar y recuperar tareas con LocalStorage */

export function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

export function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
