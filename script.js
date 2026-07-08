const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

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

function calcularResultado(){
    segundoValor = display.value;
    if(operador === "+"){
        display.value = parseFloat(primerValor) + parseFloat(segundoValor);
    }
    else if(operador === "-"){
        display.value = parseFloat(primerValor) - parseFloat(segundoValor);
    }
    else if(operador === "*"){
        display.value = parseFloat(primerValor) * parseFloat(segundoValor);
    }
    else if(operador === "/"){
        display.value = parseFloat(primerValor) / parseFloat(segundoValor);
    }
}