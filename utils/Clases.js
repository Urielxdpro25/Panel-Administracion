export class Productos {
    static ContId = 1;
    #nombre;
    #precio;
    #descripcion;
    #categoria;
    #stock;
    constructor(nombre, precio, descripcion, categoria, stock) {
        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        this.#categoria = categoria;
        this.#stock = stock
    }
}

export class stock {
    #nombre;
    #cantidad;
    #fecha;
    constructor(nombre, cantidad,fecha ) {
        this.#nombre = nombre;
        this.#cantidad = cantidad;
        this.#fecha = fecha;
    }
}