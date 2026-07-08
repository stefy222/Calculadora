const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const listaHistorial = document.getElementById("listaHistorial");

let primerValor = "";
let segundoValor = "";
let operador = "";

function limpiarDisplay(){
    display.value = "";
}

function guardarOperacion(valor){
    primerValor = display.value;
    operador = valor;
    display.value = "";
}

function agregarNumero(valor){
    display.value += valor;
}

function esOperador(valor){
    return valor === "+" ||
           valor === "-" ||
           valor === "*" ||
           valor === "/";
}

buttons.forEach(function(button){
    button.addEventListener("click", function(){
        let value = button.dataset.value;
        
        if(esOperador(value)){
            guardarOperacion(value);
        }
        else{
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
    const elementoHistorial = document.createElement("li");
    elementoHistorial.textContent = `${primerValor} ${operador} ${segundoValor} = ${resultado}`;
    listaHistorial.appendChild(elementoHistorial);
}
