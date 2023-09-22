function Usuario(nombre, edad, sexo, objetivo, altura, peso, rutinas){
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.objetivo = objetivo;
    this.altura = altura;
    this.peso = peso;
    this.rutinas = rutinas;
}

function Rutina(nombre, duracion, frecuencia){
    this.nombre = nombre;
    this.duracion = duracion;
    this.frecuencia = frecuencia;
    this.ejercicios = this.ejercicios;
}

function Ejercicio(nombre, repeticiones, series, peso){
    this.nombre = nombre;
    this.repeticiones = repeticiones;
    this.series = series;
    this.peso = peso;
}

function crearUsuario(){
    let nombreUsuario = prompt("Bienvenido! Por favor, ingresa tu nombre:");
    let edad = validarNumero("Por favor, ingresa tu edad:");
    
    let sexo = prompt("Por favor, ingresa tu sexo (M | F)");
    while(sexo != "m" && sexo != "f" && sexo != "M" && sexo != "F"){
        alert("El dato ingresado no es valido. Por favor ingrese nuevamente");
        sexo = prompt("Por favor, ingresa tu sexo (M | F)");
    }
    
    let objetivo = prompt("Cual es tu objetivo? (Perder peso | Ganar musculo)");
    while(objetivo != "perder peso" && objetivo != "Perder peso" && objetivo != "ganar musculo" && objetivo != "Ganar musculo"){
        alert("El dato ingresado no es valido. Por favor ingrese nuevamente");
        objetivo = prompt("Cual es tu objetivo? (Perder peso | Ganar musculo)");
    }
    
    let altura = validarNumero("Cual es tu altura en cm?");
    
    let peso = validarNumero("Cual es tu peso en kg?");

    return new Usuario(nombreUsuario, edad, sexo, objetivo, altura, peso);
}

let minutosEjercicio = 0;
let diasEjercicio = 0;
let seguirCargando = true;

// Función para calcular el tiempo total de ejercicio

function calcularTiempoTotal() {
    return minutosEjercicio * diasEjercicio;
}

// Función para calcular las calorias necesarias para mantener el peso

function calcularCaloriasMantenimiento (edad, peso, altura, sexo){
    if(sexo.toLowerCase === "m"){
        return (10 * peso + 6.25 * altura - 5 * edad + 5) * calcularFactorActividad(calcularTiempoTotal());
    } else {
        return (10 * peso + 6.25 * altura - 5 * edad - 161) * calcularFactorActividad(calcularTiempoTotal());
    }
}

// Función para mostrar las calorias que debe consumir el usuario, segun sus objetivos y caracterisiticas

function mostrarCalorias(){
    if(objetivo.toLowerCase() === "ganar musculo"){
        alert("Para ganar músculo, debes consumir un total de: " + (calcularCaloriasMantenimiento(edad,peso,altura,sexo) + 300) + " calorias.");
    } else {
        alert("Para perder grasa, debes consumir un total de: " + (calcularCaloriasMantenimiento(edad,peso,altura,sexo) - 300) + " calorias.");
    }
}

// Función que calcula el Factor de Actividad del usuario

function calcularFactorActividad (minutosEjercicioSemanal){
    switch(true){
        case (minutosEjercicioSemanal < 120):
            alert("Usted es una persona Sedentaria.");
            return 1.55;
        case (minutosEjercicioSemanal < 300):
            alert("Usted es una persona Moderadamente Activa.");
            return 1.85; 
        case (minutosEjercicioSemanal < 600):
            alert("Usted es una persona Muy Activa.");
            return 2.2;
        default:
            alert("Usted es una persona Extremadamente Activa.");
            return 1.85;                     
    }
}

// Validacion de numeros

function validarNumero(mensaje) {
    let entrada;
    do {
        entrada = parseInt(prompt(mensaje));
        if (isNaN(entrada) || entrada <= 0) {
            alert("Por favor, ingresa un número válido y positivo.");
        }
    } while (isNaN(entrada) || entrada <= 0);
    return entrada;
}

// Creacion de un usuario

const usuario = crearUsuario();

// Carga de ejercicios

while (seguirCargando){
    let ejercicio = prompt("Ingresa una Rutina a realizar (fuerza, funcional, cardio)");
    let minutos = validarNumero("¿Cuántos minutos dedicarás a: " + ejercicio + " cada día?");
    let dias = validarNumero("¿Cuántos días a la semana harás " + ejercicio + "?");

    minutosEjercicio += minutos;
    diasEjercicio += dias;
    seguirCargando = confirm("Desea seguir cargando ejercicios?");
}

// Mostrar resumen

alert("Resumen de " + usuario.nombre);
alert("Objetivo de Fitness: " + usuario.objetivo);
alert("Total de minutos de ejercicio por semana: " + calcularTiempoTotal());
mostrarCalorias();

