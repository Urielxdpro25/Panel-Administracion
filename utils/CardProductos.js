const formulario = document.querySelector(".formularios");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombreProd").value.trim();
    const precio = document.getElementById("precioProd").value;
    const descripcion = document.getElementById("descProd").value.trim();
    const archivoImagen = document.getElementById("ImgProd").files[0];

    if (!nombre || !precio || !descripcion) {
        alert("Uno o más campos incompletos");
        return;
    }

    const fila = document.getElementById("fila");
    const columna = document.createElement("div");
    columna.classList.add("col-12", "col-sm-6", "col-lg-4", "mt-3");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    let urlImagen;
    if (archivoImagen) {
        urlImagen = URL.createObjectURL(archivoImagen);

        const imagen = document.createElement("img");
        imagen.src = urlImagen;
        imagen.alt = nombre;
        imagen.classList.add("card-img-top");
        card.appendChild(imagen);
    }

    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = nombre;

    const textoPrecio = document.createElement("p");
    textoPrecio.classList.add("card-text");
    textoPrecio.textContent = `Precio: $${precio}`;

    const textoDescripcion = document.createElement("p");
    textoDescripcion.classList.add("card-text");
    textoDescripcion.textContent = descripcion;

    const botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.classList.add("btn", "btn-success");
    botonBorrar.textContent = "Borrar";

    const CargarProd = document.createElement("button");
    CargarProd.textContent= "Cargar Producto"
    CargarProd.type = "button";
    CargarProd.classList.add("CargarProd");

    botonBorrar.addEventListener("click", () => {
        if (urlImagen) {
            URL.revokeObjectURL(urlImagen);
        }
        columna.remove();
    });

    cuerpo.append(titulo, textoPrecio, textoDescripcion, CargarProd,botonBorrar);
    card.appendChild(cuerpo);
    columna.appendChild(card);
    fila.appendChild(columna);

    formulario.reset();
});
