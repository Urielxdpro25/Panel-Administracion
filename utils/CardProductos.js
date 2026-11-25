const formulario = document.querySelector(".formularios");

const fila = document.getElementById("fila");

const crearTarjeta = (producto) => {
    const columna = document.createElement("div");
    columna.classList.add("col-12", "col-sm-6", "col-lg-4", "mt-3");
    columna.style.minWidth = "0";

    const card = document.createElement("div");
    card.classList.add("card", "h-100");
    if (producto.id !== undefined) {
        card.dataset.productId = producto.id;
    }

    let urlImagen = "";
    if (producto.imagen instanceof Blob) {
        urlImagen = URL.createObjectURL(producto.imagen);
        const imagen = document.createElement("img");
        imagen.src = urlImagen;
        imagen.alt = producto.nombre;
        imagen.classList.add("card-img-top");
        imagen.loading = "lazy";
        card.appendChild(imagen);
    } else {
        const placeholder = document.createElement("div");
        placeholder.className = "producto-sin-imagen";
        placeholder.setAttribute("aria-label", "Producto sin imagen");
        placeholder.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z"/><path d="m4 16 4.5-4.5 3.5 3.5 2.5-2.5 5.5 5"/><circle cx="15.5" cy="8.5" r="1.5"/></svg>';
        card.appendChild(placeholder);
    }

    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = producto.nombre;

    const textoPrecio = document.createElement("p");
    textoPrecio.classList.add("card-text", "precio-producto");
    const valor = Number(producto.precio);
    textoPrecio.textContent = Number.isFinite(valor)
        ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor)
        : `Precio: $${producto.precio}`;

    const textoDescripcion = document.createElement("p");
    textoDescripcion.classList.add("card-text");
    textoDescripcion.textContent = producto.descripcion;

    const botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.classList.add("btn", "btn-success");
    botonBorrar.textContent = "Borrar";

    const acciones = document.createElement("div");
    acciones.className = "acciones-producto";
    acciones.appendChild(botonBorrar);

    botonBorrar.addEventListener("click", async () => {
        try {
            if (card.dataset.productId) {
                await window.BaseDeDatos.borrarProducto(Number(card.dataset.productId));
            }
            if (urlImagen) {
                URL.revokeObjectURL(urlImagen);
            }
            columna.remove();
        } catch (error) {
            console.error("Error al borrar el producto:", error);
            alert("No se pudo borrar el producto.");
        }
    });

    cuerpo.append(titulo, textoPrecio, textoDescripcion, acciones);
    card.appendChild(cuerpo);
    columna.appendChild(card);
    fila.appendChild(columna);
};

const cargarProductos = async () => {
    try {
        const productos = await window.BaseDeDatos.leerProductos();
        productos.forEach(crearTarjeta);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        alert("No se pudieron cargar los productos.");
    }
};

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombreProd").value.trim();
    const precio = document.getElementById("precioProd").value;
    const descripcion = document.getElementById("descProd").value.trim();
    const archivoImagen = document.getElementById("ImgProd").files[0];

    if (!nombre || !precio || !descripcion) {
        alert("Uno o más campos incompletos");
        return;
    }

    try {
        const producto = { nombre, precio, descripcion };
        if (archivoImagen) {
            producto.imagen = archivoImagen;
        }
        const id = await window.BaseDeDatos.guardarProducto(producto);
        crearTarjeta({ ...producto, id });
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        alert("No se pudo guardar el producto.");
        return;
    }
    formulario.reset();
});

cargarProductos();
