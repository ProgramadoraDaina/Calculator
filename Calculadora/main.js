const display = document.querySelector(".calculator-display");/*busca un elemento de html con la clase "display" asi
                                                   hacer todo lo que yo quiera*/

const keypad = document.querySelector(".calculator-keypad");/*busca un elemento de html con la clase "keypad"
                                                     asi hacer todo lo que yo quiera*/

const calculatorState = {/*Objeto que guarda el estado de la calculadora, es decir, el valor actual, el
                         valor anterior y el operador seleccionado*/
    currentValue: "0",
    previousValue: null,
    operator: null
};

const botones = [{ Label: "7", type: "number" },
{ Label: "8", type: "number" },
{ Label: "9", type: "number" },
{ Label: "/", type: "operator" },
{ Label: "4", type: "number" },
{ Label: "5", type: "number" },
{ Label: "6", type: "number" },
{ Label: "*", type: "operator" },
{ Label: "1", type: "number" },
{ Label: "2", type: "number" },
{ Label: "3", type: "number" },
{ Label: "-", type: "operator" },
{ Label: "0", type: "number" },
{ Label: "=", type: "equals" },
{ Label: ".", type: "decimal" },
{ Label: "+", type: "operator" },
{ Label: "C", type: "clear" }];
function renderDisplay() {
    display.textContent = calculatorState.currentValue;/*Actualiza el contenido del elemento de
                                                       visualización con el valor actual almacenado en el
                                                       estado de la calculadora, para mostrarlo al usuario*/
}
botones.forEach(function (botonConfig) {/*Recorrer todos los elementos del array buttons uno por uno */

    const boton = document.createElement('button');/*Creo un nuevo elemento de html del tipo "button"
                                                   para cada elemento del array buttons*/

    boton.textContent = botonConfig.Label;/*Establece el texto que se muestra en el botón como el valor
                                          de la propiedad "Label" del objeto de configuración del botón 
                                          actual*/

    boton.dataset.type = botonConfig.type;/*le guardo el type  al boton para luego preguntarme si es un
                                          operador numero o el boton de borrar*/

    boton.dataset.value = botonConfig.Label;/*le guardo el value al boton para luego usarlo en las operaciones
                                            matematicas o para mostrarlo en la pantalla*/

    boton.classList.add("calculadora-boton");/*Agrega la clase "boton" al elemento del botón para que se le apliquen
                                 los estilos definidos en CSS*/
    if (botonConfig.type === "operator") {
        boton.classList.add("operator");
    }
    keypad.append(boton);/*Agrega el botón recién creado al elemento del teclado en el HTML, para que
                           se muestre en la interfaz de usuario*/
})

function handleNumber(Value) {
    if (calculatorState.currentValue === "0") {/*si el valor actual es cero*/

        calculatorState.currentValue = Value;/*actualiza el valor actual*/
        return;/*sale*/
    }
    calculatorState.currentValue += Value;/*si uno pone  mas de un numero se concatenan los numeros, osea
                                        15, 22, 31 */
}
function handleOperator(operator) {
    calculatorState.previousValue = calculatorState.currentValue;
    calculatorState.operator = operator;
    calculatorState.currentValue = "0";
}
function clearCalculator() {
    calculatorState.previousValue = null;
    calculatorState.currentValue = "0";
    calculatorState.operator = null;
}
function addDecimal(){
    if(calculatorState.currentValue.includes(".")){
        return
    }
    calculatorState.currentValue+= ".";
}
function calculateResult() {
    if (calculatorState.previousValue === null || calculatorState.currentValue === null) {
        return;
    }
    const previous = Number(calculatorState.previousValue);
    const current = Number(calculatorState.currentValue);
    let valueResult = 0;
    if (calculatorState.operator === "*") {
        valueResult = previous * current;
    }
    if (calculatorState.operator === "+") {
        valueResult = previous + current;
    }
    if (calculatorState.operator === "-") {
        valueResult = previous - current;
    }
    if (calculatorState.operator === "/") {
        valueResult = previous / current;
    }
    calculatorState.currentValue = String(valueResult);
    calculatorState.previousValue = null;
    calculatorState.operator = null;
}
keypad.addEventListener('click', function (event) {/*Agrega un evento de escucha al elemento del teclado
                                                           para manejar los clics en los botones*/
    const boton = event.target.closest('button');/*Busca el elemento de botón más cercano al elemento que fue clickeado, para asegurarse de que se está interactuando con un botón específico dentro del teclado*/

    if (!boton) return;/*Si no se encuentra ningún botón cercano al elemento clickeado, la función se
                        detiene*/

    const type = boton.dataset.type;/*Obtiene el tipo de botón (número, operador o borrar) del atributo de
                                    datos del botón clickeado*/

    const Value = boton.dataset.value;/*Obtiene el valor del botón (por ejemplo, el número o el operador)
                                      del atributo de datos del botón clickeado*/

    console.log(type, Value);/*Imprime en la consola el tipo y el valor del botón clickeado para
                             depuración*/

    if (type === "number") {
        handleNumber(Value);
    }
    if (type === "operator") {
        handleOperator(Value);
    }
    if (type === "clear") {
        clearCalculator();
    }
    if (type === "equals") {
        calculateResult();
    }
    if(type === "decimal"){
        addDecimal();
    }
    renderDisplay();
})