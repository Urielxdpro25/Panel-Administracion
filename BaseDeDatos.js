let DB = null;

const abrirBD = () => {

    return new Promise((resolve, reject) => {

        const solicitud = indexedDB.open("PDA", 3);

        solicitud.onupgradeneeded = () => {

            const db = solicitud.result;

            if (!db.objectStoreNames.contains("Productos")) {
                db.createObjectStore("Productos", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains("Usuarios")) {
                db.createObjectStore("Usuarios", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains("Tareas")) {
                db.createObjectStore("Tareas", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains("Materias")) {
                db.createObjectStore("Materias", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains("Sesion")) {
                db.createObjectStore("Sesion", {
                    keyPath: "id"
                });
            }
        };

        solicitud.onsuccess = () => {
            DB = solicitud.result;
            resolve(DB);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Guardar producto
const guardarProducto = async (producto) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Productos", "readwrite");
        const almacen = transaccion.objectStore("Productos");

        const solicitud = almacen.add(producto);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener todos los productos
const leerProductos = async () => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Productos", "readonly");
        const almacen = transaccion.objectStore("Productos");

        const solicitud = almacen.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener un producto por ID
const obtenerProducto = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Productos", "readonly");
        const almacen = transaccion.objectStore("Productos");

        const solicitud = almacen.get(id);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Actualizar producto
const actualizarProducto = async (producto) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Productos", "readwrite");
        const almacen = transaccion.objectStore("Productos");

        const solicitud = almacen.put(producto);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Eliminar producto
const borrarProducto = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Productos", "readwrite");
        const almacen = transaccion.objectStore("Productos");

        const solicitud = almacen.delete(id);

        solicitud.onsuccess = () => {
            resolve();
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};

// USuarios


// Guardar producto
const guardarUsuario = async (usuario) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Usuarios", "readwrite");
        const almacen = transaccion.objectStore("Usuarios");

        const solicitud = almacen.add(usuario);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener todos los usuarios
const leerUsuarios = async () => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Usuarios", "readonly");
        const almacen = transaccion.objectStore("Usuarios");

        const solicitud = almacen.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener un usuario por ID
const obtenerUsuario = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Usuarios", "readonly");
        const almacen = transaccion.objectStore("Usuarios");

        const solicitud = almacen.get(id);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Actualizar usuario
const actualizarUsuario = async (usuario) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Usuarios", "readwrite");
        const almacen = transaccion.objectStore("Usuarios");

        const solicitud = almacen.put(usuario);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Eliminar usuario
const borrarUsuario = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Usuarios", "readwrite");
        const almacen = transaccion.objectStore("Usuarios");

        const solicitud = almacen.delete(id);

        solicitud.onsuccess = () => {
            resolve();
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Buscar usuario por correo
const buscarUsuarioPorCorreo = async (correo) => {
    const correoNormalizado = correo.trim().toLowerCase();
    const usuarios = await leerUsuarios();

    return usuarios.find((usuario) =>
        typeof usuario.correo === "string" &&
        usuario.correo.trim().toLowerCase() === correoNormalizado
    );
};

const guardarSesion = async (usuario) => {
    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction("Sesion", "readwrite");
        const almacen = transaccion.objectStore("Sesion");
        const solicitud = almacen.put({
            id: "actual",
            usuarioId: usuario.id,
            nombre: usuario.nombre,
        });

        solicitud.onsuccess = () => resolve();
        solicitud.onerror = () => reject(solicitud.error);
    });
};

const leerSesion = async () => {
    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction("Sesion", "readonly");
        const almacen = transaccion.objectStore("Sesion");
        const solicitud = almacen.get("actual");

        solicitud.onsuccess = () => resolve(solicitud.result);
        solicitud.onerror = () => reject(solicitud.error);
    });
};

const borrarSesion = async () => {
    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction("Sesion", "readwrite");
        const almacen = transaccion.objectStore("Sesion");
        const solicitud = almacen.delete("actual");

        solicitud.onsuccess = () => resolve();
        solicitud.onerror = () => reject(solicitud.error);
    });
};


// Guardar tarea
const guardarTarea = async (tarea) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Tareas", "readwrite");
        const almacen = transaccion.objectStore("Tareas");

        const solicitud = almacen.add(tarea);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener todas las tareas
const leerTareas = async () => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Tareas", "readonly");
        const almacen = transaccion.objectStore("Tareas");

        const solicitud = almacen.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener una tarea por ID
const obtenerTarea = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Tareas", "readonly");
        const almacen = transaccion.objectStore("Tareas");

        const solicitud = almacen.get(id);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Actualizar tarea
const actualizarTarea = async (tarea) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Tareas", "readwrite");
        const almacen = transaccion.objectStore("Tareas");

        const solicitud = almacen.put(tarea);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Eliminar tarea
const borrarTarea = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Tareas", "readwrite");
        const almacen = transaccion.objectStore("Tareas");

        const solicitud = almacen.delete(id);

        solicitud.onsuccess = () => {
            resolve();
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Guardar materia
const guardarMateria = async (materia) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Materias", "readwrite");
        const almacen = transaccion.objectStore("Materias");

        const solicitud = almacen.add(materia);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener todas las materias
const leerMaterias = async () => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Materias", "readonly");
        const almacen = transaccion.objectStore("Materias");

        const solicitud = almacen.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Obtener una materia por ID
const obtenerMateria = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Materias", "readonly");
        const almacen = transaccion.objectStore("Materias");

        const solicitud = almacen.get(id);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Actualizar materia
const actualizarMateria = async (materia) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Materias", "readwrite");
        const almacen = transaccion.objectStore("Materias");

        const solicitud = almacen.put(materia);

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


// Eliminar materia
const borrarMateria = async (id) => {

    const db = DB || await abrirBD();

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("Materias", "readwrite");
        const almacen = transaccion.objectStore("Materias");

        const solicitud = almacen.delete(id);

        solicitud.onsuccess = () => {
            resolve();
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
};


window.BaseDeDatos = Object.freeze({
    abrirBD,
    guardarProducto,
    leerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    guardarUsuario,
    leerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    borrarUsuario,
    buscarUsuarioPorCorreo,
    guardarSesion,
    leerSesion,
    borrarSesion,
    guardarTarea,
    leerTareas,
    obtenerTarea,
    actualizarTarea,
    borrarTarea,
    guardarMateria,
    leerMaterias,
    obtenerMateria,
    actualizarMateria,
    borrarMateria,
});