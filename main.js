const form = document.getElementById("formulario");
const botonRegistro = document.getElementById("registro");

window.BaseDeDatos.abrirBD().catch((error) => {
    console.error("No se pudo abrir la base de datos:", error);
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const nameMail = document.getElementById("email").value.trim();
    const passUsuario = document.getElementById("pass").value;

    if (event.submitter === botonRegistro) {
        if (!nombre || !nameMail || !passUsuario) {
            alert("Completa todos los campos para registrarte.");
            return;
        }

        try {
            const usuarioExistente = await window.BaseDeDatos.buscarUsuarioPorCorreo(nameMail);
            if (usuarioExistente) {
                alert("Ya existe una cuenta registrada con ese correo.");
                return;
            }

            await window.BaseDeDatos.guardarUsuario({
                nombre,
                correo: nameMail.toLowerCase(),
                password: passUsuario,
            });
            alert("La cuenta se registró correctamente.");
        } catch (error) {
            console.error("Error al registrar la cuenta:", error);
            alert("No se pudo registrar la cuenta. Inténtalo nuevamente.");
        }
        return;
    }

    try {
        const usuario = await window.BaseDeDatos.buscarUsuarioPorCorreo(nameMail);
        if (usuario && usuario.password === passUsuario) {
            localStorage.setItem("nombreUsuario", usuario.nombre);
            window.location.href = "Home.html";
            return;
        }
    } catch (error) {
        console.error("Error al verificar la cuenta:", error);
        alert("No se pudo verificar la cuenta. Inténtalo nuevamente.");
        return;
    }

    alert("El email o la contraseña son incorrectos.");
});