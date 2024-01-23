// Inicializar el número secreto en 0
let numeroSecreto = 0;
// Inicializar el contador de intentos en 0
let intentos = 0;
// Crear una lista vacía para almacenar los números ya sorteados
let listaNumerosSorteados = [];
// Definir el número máximo permitido para el juego
let numeroMaximo = 10;

// Función para asignar un texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto; 
    return;    
}

// Función para verificar el intento del usuario
function verificarIntento() {
    // Obtener el número ingresado por el usuario desde la interfaz
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    // Verificar si el número ingresado es igual al número secreto
    if (numeroDeUsuario === numeroSecreto) {
        // Mostrar un mensaje de acierto con la cantidad de intentos realizados
        asignarTextoElemento('p', `Acertaste al número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        // Habilitar el botón para reiniciar el juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            // Mostrar un mensaje indicando que el número secreto es menor
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            // Mostrar un mensaje indicando que el número secreto es mayor
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        // Incrementar el contador de intentos
        intentos++;
        // Limpiar la caja de entrada del usuario
        limpiarCaja();
    }
    return;
}

// Función para limpiar la caja de entrada del usuario
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar un número secreto evitando repeticiones
function generarNumeroSecreto() {
    // Generar un número aleatorio dentro del rango permitido
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    
    // Mostrar en la consola el número generado y la lista de números sorteados
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Verificar si todos los números posibles ya han sido sorteados
    if (listaNumerosSorteados.length == numeroMaximo) {
        // Mostrar un mensaje indicando que todos los números posibles ya fueron sorteados
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el número generado ya está en la lista, generar otro número
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();    
        } else {
            // Agregar el número generado a la lista de números sorteados
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        } 
    }
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    // Mostrar el título del juego
    asignarTextoElemento('h1', 'Juego del número secreto');
    // Indicar al usuario que ingrese un número dentro del rango permitido
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);    
    // Generar el número secreto y establecer el contador de intentos en 1
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar la caja de entrada del usuario
    limpiarCaja();
    // Establecer las condiciones iniciales del juego
    condicionesIniciales();
    // Deshabilitar el botón para reiniciar el juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Llamar a la función que establece las condiciones iniciales para iniciar el juego
condicionesIniciales();
