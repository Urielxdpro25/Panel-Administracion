const gmail = "urix@yahoo.com.ar";
const password = "25507";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameMail = document.getElementById("email").value.trim();
    const passUsuario = document.getElementById("pass").value;

    if (gmail === nameMail && password === passUsuario) {
        window.location.href = "Home.html";
        return;
    }

    alert("El email o la contraseña son incorrectos.");
});
