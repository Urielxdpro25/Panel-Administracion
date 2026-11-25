const elementoNombre = document.getElementById("nombre");

if (elementoNombre) {
    window.BaseDeDatos.leerSesion()
        .then((sesion) => {
            elementoNombre.textContent = sesion ? sesion.nombre : "";
        })
        .catch((error) => {
            console.error("Error al cargar la sesión:", error);
        });
}