let DB = null;

const abrirBD = () => {

    return new Promise((resolve, reject) => {

        const solicitud = indexedDB.open("PDA", 4);

        solicitud.onupgradeneeded = (evento) => {

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

            if (evento.oldVersion < 4) {
                const transaccion = evento.target.transaction;
                transaccion.objectStore("Productos").clear();
                transaccion.objectStore("Tareas").clear();
                transaccion.objectStore("Materias").clear();
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
    return guardarRegistroUsuario("Productos", producto);
};


// Obtener todos los productos
const leerProductos = async () => {
    return leerRegistrosUsuario("Productos");
};


// Obtener un producto por ID
const obtenerProducto = async (id) => {
    return obtenerRegistroUsuario("Productos", id);
};


// Actualizar producto
const actualizarProducto = async (producto) => {
    return actualizarRegistroUsuario("Productos", producto);
};


// Eliminar producto
const borrarProducto = async (id) => {
    return borrarRegistroUsuario("Productos", id);
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

const obtenerUsuarioIdActual = async () => {
    const sesion = await leerSesion();

    if (!sesion || sesion.usuarioId === undefined || sesion.usuarioId === null) {
        throw new Error("Se necesita una sesión iniciada para acceder a estos datos.");
    }

    return sesion.usuarioId;
};

const guardarRegistroUsuario = async (nombreAlmacen, registro) => {
    const db = DB || await abrirBD();
    const usuarioId = await obtenerUsuarioIdActual();

    return new Promise((resolve, reject) => {
        const almacen = db.transaction(nombreAlmacen, "readwrite").objectStore(nombreAlmacen);
        const solicitud = almacen.add({ ...registro, usuarioId });

        solicitud.onsuccess = () => resolve(solicitud.result);
        solicitud.onerror = () => reject(solicitud.error);
    });
};

const leerRegistrosUsuario = async (nombreAlmacen) => {
    const db = DB || await abrirBD();
    const usuarioId = await obtenerUsuarioIdActual();

    return new Promise((resolve, reject) => {
        const almacen = db.transaction(nombreAlmacen, "readonly").objectStore(nombreAlmacen);
        const solicitud = almacen.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result.filter((registro) => registro.usuarioId === usuarioId));
        };
        solicitud.onerror = () => reject(solicitud.error);
    });
};

const obtenerRegistroUsuario = async (nombreAlmacen, id) => {
    const db = DB || await abrirBD();
    const usuarioId = await obtenerUsuarioIdActual();

    return new Promise((resolve, reject) => {
        const almacen = db.transaction(nombreAlmacen, "readonly").objectStore(nombreAlmacen);
        const solicitud = almacen.get(id);

        solicitud.onsuccess = () => {
            const registro = solicitud.result;
            resolve(registro && registro.usuarioId === usuarioId ? registro : undefined);
        };
        solicitud.onerror = () => reject(solicitud.error);
    });
};

const actualizarRegistroUsuario = async (nombreAlmacen, registro) => {
    if (registro.id === undefined || registro.id === null) {
        throw new Error("Se necesita el ID del registro para actualizarlo.");
    }

    const db = DB || await abrirBD();
    const usuarioId = await obtenerUsuarioIdActual();

    return new Promise((resolve, reject) => {
        const almacen = db.transaction(nombreAlmacen, "readwrite").objectStore(nombreAlmacen);
        const solicitudActual = almacen.get(registro.id);

        solicitudActual.onsuccess = () => {
            const existente = solicitudActual.result;
            if (!existente || existente.usuarioId !== usuarioId) {
                reject(new Error("No se encontró el registro para el usuario actual."));
                return;
            }

            const solicitudGuardar = almacen.put({ ...registro, usuarioId });
            solicitudGuardar.onsuccess = () => resolve(solicitudGuardar.result);
            solicitudGuardar.onerror = () => reject(solicitudGuardar.error);
        };
        solicitudActual.onerror = () => reject(solicitudActual.error);
    });
};

const borrarRegistroUsuario = async (nombreAlmacen, id) => {
    const db = DB || await abrirBD();
    const usuarioId = await obtenerUsuarioIdActual();

    return new Promise((resolve, reject) => {
        const almacen = db.transaction(nombreAlmacen, "readwrite").objectStore(nombreAlmacen);
        const solicitudActual = almacen.get(id);

        solicitudActual.onsuccess = () => {
            const existente = solicitudActual.result;
            if (!existente || existente.usuarioId !== usuarioId) {
                reject(new Error("No se encontró el registro para el usuario actual."));
                return;
            }

            const solicitudBorrar = almacen.delete(id);
            solicitudBorrar.onsuccess = () => resolve();
            solicitudBorrar.onerror = () => reject(solicitudBorrar.error);
        };
        solicitudActual.onerror = () => reject(solicitudActual.error);
    });
};


// Guardar tarea
const guardarTarea = async (tarea) => {
    return guardarRegistroUsuario("Tareas", tarea);
};


// Obtener todas las tareas
const leerTareas = async () => {
    return leerRegistrosUsuario("Tareas");
};


// Obtener una tarea por ID
const obtenerTarea = async (id) => {
    return obtenerRegistroUsuario("Tareas", id);
};


// Actualizar tarea
const actualizarTarea = async (tarea) => {
    return actualizarRegistroUsuario("Tareas", tarea);
};


// Eliminar tarea
const borrarTarea = async (id) => {
    return borrarRegistroUsuario("Tareas", id);
};


// Guardar materia
const guardarMateria = async (materia) => {
    return guardarRegistroUsuario("Materias", materia);
};


// Obtener todas las materias
const leerMaterias = async () => {
    return leerRegistrosUsuario("Materias");
};


// Obtener una materia por ID
const obtenerMateria = async (id) => {
    return obtenerRegistroUsuario("Materias", id);
};


// Actualizar materia
const actualizarMateria = async (materia) => {
    return actualizarRegistroUsuario("Materias", materia);
};


// Eliminar materia
const borrarMateria = async (id) => {
    return borrarRegistroUsuario("Materias", id);
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