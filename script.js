const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const listaHistorial = document.getElementById("listaHistorial");
const operacionActual = document.getElementById("operacionActual");
const borrarHistorialButton = document.getElementById("borrarHistorial");


let primerValor = "";
let segundoValor = "";
let operador = "";

let operaciones = localStorage.getItem("operaciones");


let historial = operaciones.split("\n");
    historial.forEach(function(operacion) {
        if (operacion != "") {
            const li = document.createElement("li");
            li.textContent = operacion;
            listaHistorial.appendChild(li);
        }
});

function limpiarDisplay() {
    display.value = "";
    operacionActual.textContent = "";
    primerValor = "";
    segundoValor = "";
    operador = "";
}

function guardarOperacion(valor) {
    if (display.value === "") {
        return;
    }

    primerValor = display.value;
    operador = valor;
    operacionActual.textContent = primerValor + " " + operador;
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

function borrarHistorial() {
    localStorage.removeItem("operaciones");
    listaHistorial.innerHTML = "";
    operaciones = "";
}

borrarHistorialButton.addEventListener("click", borrarHistorial);

function calcularResultado() {
    segundoValor = display.value;

    if (primerValor === "" || segundoValor === "" || operador === "") {
        return;
    }

    operacionActual.textContent = primerValor + " " + operador + " " + segundoValor + " = ";
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

    operaciones += operacion + "\n";
    localStorage.setItem("operaciones", operaciones);

}
