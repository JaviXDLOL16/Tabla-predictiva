import { tablaAnalisis, tokensTerminales } from "./gramatica.js";

function analyzeSyntax(inputList) {
    // Agregamos el token de fin de cadena "$" 
    inputList.push("$");
    // Inicializamos la historia de la pila
    var stackHistory = "";
    // Inicializamos la pila con el símbolo inicial y el token de fin de cadena
    var symbols = ["$", "FUNCION"];

    // Ciclo principal del análisis sintáctico
    while (symbols.length > 0) {
        // Obtenemos el símbolo en la cima de la pila
        var X = symbols[symbols.length - 1];
        // Obtenemos el símbolo actual de la entrada
        var a = inputList[0];
        // Actualizamos la historia de la pila con el estado actual
        stackHistory += "Pila: [" + symbols + "]  -> " + a + "\n";

        // Si el símbolo en la cima de la pila es terminal
        if (isTerminal(X)) {
            // Si coincide con el símbolo de entrada, lo eliminamos de la pila y avanzamos en la entrada
            if (X === a) {
                symbols.pop();
                inputList.shift();
            } else {
                // Si no coincide, hay un error de sintaxis
                return {
                    "success": false,
                    "stackHistory": stackHistory
                };
            }
        } else { // Si el símbolo en la cima de la pila es no terminal
            try {
                // Producción correspondiente de la tabla de análisis
                const production = tablaAnalisis[X][a];
                // Si la producción existe o es una producción epsilon (array vacío)
                if (production || (Array.isArray(production) && production.length === 0)) {
                    // Aplicamos la producción a la pila
                    symbols.pop();
                    symbols.push.apply(symbols, production.slice().reverse());
                } else {
                    //No hay producción
                    return {
                        "success": false,
                        "stackHistory": stackHistory
                    };
                }
            } catch (error) {
                // Si ocurre un error al acceder a la tabla de análisis, hay un error de sintaxis
                return {
                    "success": false,
                    "stackHistory": stackHistory
                };
            }
        }
    }
    // Si se llega aquí, el análisis sintáctico fue exitoso
    return { 
        "success": true,
        "stackHistory": stackHistory 
    };
}

// Verifica si un token es terminal
function isTerminal(token) {
    return tokensTerminales.has(token);
}

export { analyzeSyntax }
