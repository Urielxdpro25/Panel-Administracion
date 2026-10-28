const elementoNombre = document.getElementById("nombre");

if (elementoNombre) {
    elementoNombre.textContent = localStorage.getItem("nombreUsuario") || "";
}