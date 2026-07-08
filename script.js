const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const listaHistorial = document.getElementById("listaHistorial");

let primerValor = "";
let segundoValor = "";
let operador = "";

// Recuperar historial del localStorage
let operaciones = localStorage.getItem("operaciones");

if (operaciones == null) {
    operaciones = "";
} else {
    let historial = operaciones.split("\n");

    historial.forEach(function(operacion) {
        if (operacion != "") {
            const li = document.createElement("li");
            li.textContent = operacion;
            listaHistorial.appendChild(li);
        }
    });
}

function limpiarDisplay() {
    display.value = "";
}

function guardarOperacion(valor) {
    primerValor = display.value;
    operador = valor;
    display.value = "";
}

function agregarNumero(valor) {
    display.value += valor;
}

function esOperador(valor) {
    return valor === "+" ||
           valor === "-" ||
           valor === "*" ||
           valor === "/";
}

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.dataset.value;

        if (esOperador(value)) {
            guardarOperacion(value);
        } else {
            agregarNumero(value);
        }

    });

});

clearButton.addEventListener("click", limpiarDisplay);

equalsButton.addEventListener("click", calcularResultado);

function calcularResultado() {
    segundoValor = display.value;
    let resultado = "";
    switch (operador) {
        case "+":
            resultado = parseFloat(primerValor) + parseFloat(segundoValor);
            break;
        case "-":
            resultado = parseFloat(primerValor) - parseFloat(segundoValor);
            break;
        case "*":
            resultado = parseFloat(primerValor) * parseFloat(segundoValor);
            break;
        case "/":
            resultado = parseFloat(primerValor) / parseFloat(segundoValor);
            break;
    }

    display.value = resultado;

    let operacion = `${primerValor} ${operador} ${segundoValor} = ${resultado}`;

    const elementoHistorial = document.createElement("li");
    elementoHistorial.textContent = operacion;
    listaHistorial.appendChild(elementoHistorial);

    // Guardar en localStorage
    operaciones += operacion + "\n";
    localStorage.setItem("operaciones", operaciones);

}