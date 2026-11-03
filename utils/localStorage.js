        const form = document.getElementById("formulario");
        const nombreInput = document.getElementById("name");
   
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            localStorage.setItem("nombreUsuario", nombreInput.value.trim());
            window.location.href = "Home.html";
        });