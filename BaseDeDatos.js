let DB = null;
let aperturaBD = null;

const abrirBD = () => {
    if (typeof indexedDB === "undefined") {
        return Promise.reject(new Error("Este navegador no admite IndexedDB."));
    }

    if (DB) {
        return Promise.resolve(DB);
    }

    if (aperturaBD) {
        return aperturaBD;
    }

    aperturaBD = new Promise((resolve, reject) => {
        const req = indexedDB.open("PDA", 2);

        req.onupgradeneeded = () => {
            const db = req.result;
            const almacenes = ["Usuarios", "Productos", "Materias", "Tareas"];

            almacenes.forEach((nombre) => {
                if (!db.objectStoreNames.contains(nombre)) {
                    db.createObjectStore(nombre, {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                }
            });
        };
        req.onsuccess = () => {
            DB = req.result;
            DB.onversionchange = () => {
                DB.close();
                DB = null;
                aperturaBD = null;
            };
            resolve(DB);
        };

        req.onerror = () => {
            aperturaBD = null;
            reject(req.error);
        };

        req.onblocked = () => {
            aperturaBD = null;
            reject(new Error("La base de datos está bloqueada por otra pestaña."));
        };
    });

    return aperturaBD;
};

const ejecutar = async (almacen, modo, crearSolicitud) => {
    const db = DB || (await abrirBD());

    return new Promise((resolve, reject) => {
        const tx = db.transaction(almacen, modo);
        const store = tx.objectStore(almacen);
        let resultado;
        let errorInformado = false;

        tx.oncomplete = () => resolve(resultado);
        tx.onerror = () => {
            errorInformado = true;
            reject(tx.error || new Error("Error en la transacción de IndexedDB."));
        };
        tx.onabort = () => {
            if (!errorInformado) {
                reject(tx.error || new Error("La transacción de IndexedDB fue cancelada."));
            }
        };

        try {
            const req = crearSolicitud(store);
            req.onsuccess = () => {
                resultado = req.result;
            };
        } catch (error) {
            tx.abort();
            reject(error);
        }
    });
};

const guardarUsuario = (usuario) => {
    return ejecutar("Usuarios", "readwrite", (store) => store.add(usuario));
};

const obtenerUsuario = (id) => {
    return ejecutar("Usuarios", "readonly", (store) => store.get(id));
};

const leerUsuarios = () => {
    return ejecutar("Usuarios", "readonly", (store) => store.getAll());
};

const buscarUsuarioPorCorreo = async (correo) => {
    const correoNormalizado = correo.trim().toLowerCase();
    const usuarios = await leerUsuarios();

    return usuarios.find((usuario) =>
        typeof usuario.correo === "string" &&
        usuario.correo.trim().toLowerCase() === correoNormalizado
    );
};

const actualizarUsuario = (usuario) => {
    return ejecutar("Usuarios", "readwrite", (store) => store.put(usuario));
};

const borrarUsuario = (id) => {
    return ejecutar("Usuarios", "readwrite", (store) => store.delete(id));
};

const guardarRegistro = (almacen, registro) => {
    return ejecutar(almacen, "readwrite", (store) => store.add(registro));
};

const leerRegistros = (almacen) => {
    return ejecutar(almacen, "readonly", (store) => store.getAll());
};

const actualizarRegistro = (almacen, registro) => {
    return ejecutar(almacen, "readwrite", (store) => store.put(registro));
};

const borrarRegistro = (almacen, id) => {
    return ejecutar(almacen, "readwrite", (store) => store.delete(id));
};

window.BaseDeDatos = Object.freeze({
    abrirBD,
    guardarUsuario,
    obtenerUsuario,
    leerUsuarios,
    buscarUsuarioPorCorreo,
    actualizarUsuario,
    borrarUsuario,
    guardarRegistro,
    leerRegistros,
    actualizarRegistro,
    borrarRegistro,
});

