const formulario = document.getElementById("formEmpleado");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const mensaje = document.getElementById("mensaje");

const nit = document.getElementById("nit");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fechaNacimiento = document.getElementById("fechaNacimiento");

const errorNit = document.getElementById("errorNit");
const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorFecha = document.getElementById("errorFecha");

function validarNit() {
    const valor = nit.value.trim();

    if (valor === "") {
        errorNit.textContent = "El NIT es obligatorio";
        return false;
    }

    if (!/^\d+$/.test(valor)) {
        errorNit.textContent = "El NIT solo puede contener números";
        return false;
    }

    if (valor.length < 6 || valor.length > 13) {
        errorNit.textContent = "El NIT debe tener entre 6 y 13 dígitos";
        return false;
    }

    const filas = cuerpoTabla.querySelectorAll("tr");

    for (let fila of filas) {
        const nitExistente = fila.cells[0].textContent;

        if (nitExistente === valor) {
            errorNit.textContent = "Este NIT ya está registrado";
            return false;
        }
    }

    errorNit.textContent = "";
    return true;
}

function validarNombre() {
    const valor = nombre.value.trim();

    if (valor === "") {
        errorNombre.textContent = "El nombre es obligatorio";
        return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)) {
        errorNombre.textContent = "El nombre solo puede contener letras";
        return false;
    }

    if (valor.length < 2) {
        errorNombre.textContent = "El nombre debe tener al menos 2 caracteres";
        return false;
    }

    if (valor.length > 30) {
        errorNombre.textContent = "El nombre no puede superar los 30 caracteres";
        return false;
    }

    errorNombre.textContent = "";
    return true;
}

function validarApellido() {
    const valor = apellido.value.trim();

    if (valor === "") {
        errorApellido.textContent = "El apellido es obligatorio";
        return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)) {
        errorApellido.textContent = "El apellido solo puede contener letras";
        return false;
    }

    if (valor.length < 2) {
        errorApellido.textContent = "El apellido debe tener al menos 2 caracteres";
        return false;
    }

    if (valor.length > 30) {
        errorApellido.textContent = "El apellido no puede superar los 30 caracteres";
        return false;
    }

    errorApellido.textContent = "";
    return true;
}

function validarFecha() {
    const valor = fechaNacimiento.value.trim();

    if (valor === "") {
        errorFecha.textContent = "La fecha es obligatoria";
        return false;
    }

    const formato = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const resultado = valor.match(formato);

    if (!resultado) {
        errorFecha.textContent = "Use el formato dd/mm/aaaa";
        return false;
    }

    const dia = parseInt(resultado[1]);
    const mes = parseInt(resultado[2]);
    const anio = parseInt(resultado[3]);

    const fecha = new Date(anio, mes - 1, dia);

    if (
        fecha.getFullYear() !== anio ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getDate() !== dia
    ) {
        errorFecha.textContent = "La fecha no es válida";
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha > hoy) {
        errorFecha.textContent = "La fecha no puede ser futura";
        return false;
    }

    const edad = hoy.getFullYear() - anio;

    if (edad > 100) {
        errorFecha.textContent = "La fecha de nacimiento no es válida";
        return false;
    }

    errorFecha.textContent = "";
    return true;
}

nit.addEventListener("input", function() {
    nit.value = nit.value.replace(/\D/g, "");
    validarNit();
});

nombre.addEventListener("input", function() {
    validarNombre();
});

apellido.addEventListener("input", function() {
    validarApellido();
});

fechaNacimiento.addEventListener("input", function() {
    validarFecha();
});

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nitValido = validarNit();
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const fechaValida = validarFecha();

    if (!nitValido || !nombreValido || !apellidoValido || !fechaValida) {
        mensaje.textContent = "Corrija los errores antes de agregar el empleado";
        mensaje.className = "incorrecto";
        return;
    }

    const fila = document.createElement("tr");

    const celdaNit = document.createElement("td");
    const celdaNombre = document.createElement("td");
    const celdaApellido = document.createElement("td");
    const celdaFecha = document.createElement("td");

    celdaNit.textContent = nit.value.trim();
    celdaNombre.textContent = nombre.value.trim();
    celdaApellido.textContent = apellido.value.trim();
    celdaFecha.textContent = fechaNacimiento.value.trim();

    fila.appendChild(celdaNit);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaFecha);

    cuerpoTabla.appendChild(fila);

    mensaje.textContent = "Empleado agregado correctamente";
    mensaje.className = "correcto";

    formulario.reset();

    errorNit.textContent = "";
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorFecha.textContent = "";
});