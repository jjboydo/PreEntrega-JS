function Usuario(nombre, edad, sexo, objetivo, altura, peso, rutinas){
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.objetivo = objetivo;
    this.altura = altura;
    this.peso = peso;
    this.rutinas = rutinas; // Array de objeto Rutina
}

function Rutina(nombre, duracion, frecuencia, ejercicios){
    this.nombre = nombre;
    this.duracion = duracion;
    this.frecuencia = frecuencia;
    this.ejercicios = ejercicios; // Array de objeto Ejercicio
}

function Ejercicio(nombre, repeticiones, series, peso){
    this.nombre = nombre;
    this.repeticiones = repeticiones;
    this.series = series;
    this.peso = peso;
}

function desplegarSitio() {

/*     const inicio = document.querySelector(".inicio");
    inicio.classList.add("oculto"); */

    const body = document.querySelector("body");
    body.classList.add("grid");

    const header = document.querySelector(".header");
    header.classList.remove("oculto");

    const main = document.querySelector("main");
    main.classList.add("grid-main");

    const logo = document.querySelector(".logo");
    logo.classList.remove("oculto");

    const secciones = document.querySelectorAll("section");
    secciones.forEach( seccion => {
        seccion.classList.contains("inicio") ? seccion.classList.add("oculto") : seccion.classList.remove("oculto");
    })
}

const formularioInicio = document.querySelector('#form-inicio');

function crearUsuario(evt){

    evt.preventDefault();

    let nombreUsuario = formularioInicio.querySelector("#nombreUser").value;
    let edad = formularioInicio.querySelector("#edad").value;
    let sexo = formularioInicio.querySelector("#sexo").value;
    let objetivo = formularioInicio.querySelector("#objetivo").value;
    let altura = formularioInicio.querySelector("#altura").value;
    let peso = formularioInicio.querySelector("#peso").value;
    let rutinas = [];
    
    const usuarioRegistrado = new Usuario(nombreUsuario, edad, sexo, objetivo, altura, peso, rutinas);
    console.log(usuarioRegistrado);

    desplegarSitio();
}


// Función para calcular el tiempo total de ejercicio

function calcularTiempoTotal() {
    let tiempoTotal = usuario.rutinas.reduce((acumulador, rutina) => acumulador + (rutina.duracion * rutina.frecuencia), 0);
    return tiempoTotal;
}

// Función para calcular las calorias necesarias para mantener el peso

function calcularCaloriasMantenimiento (){
    if(usuario.sexo.toLowerCase === "m"){
        return (10 * usuario.peso + 6.25 * usuario.altura - 5 * usuario.edad + 5) * calcularFactorActividad(calcularTiempoTotal());
    } else {
        return (10 * usuario.peso + 6.25 * usuario.altura - 5 * usuario.edad - 161) * calcularFactorActividad(calcularTiempoTotal());
    }
}

// Función para mostrar las calorias que debe consumir el usuario, segun sus objetivos y caracterisiticas

function mostrarCalorias(){
    if(usuario.objetivo.toLowerCase() === "ganar musculo"){
        alert("Para ganar músculo, debes consumir un total de: " + (Math.round(calcularCaloriasMantenimiento()) + 300) + " calorias.");
    } else {
        alert("Para perder grasa, debes consumir un total de: " + (Math.round(calcularCaloriasMantenimiento()) - 300) + " calorias.");
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


// Cargar nuevo ejercicio

function cargarEjercicio(){
    let nombre = prompt("Ingresa el nombre del ejercicio a incluir en la rutina");
    let series = validarNumero("Ingrese cantidad de series");
    let repeticiones = validarNumero("Ingrese cantidad de repeticiones");
    let peso = validarNumero("Ingrese el peso con el que realizó el ejercicio");
    return new Ejercicio(nombre,repeticiones,series,peso);
}

// Crear nueva rutina

function crearRutina(){
    let nombreRutina = prompt("Ingresa un nombre para la nueva rutina");
    while (usuario.rutinas.some((rut) => rut.nombre === nombreRutina)) {
        alert("Ya existe una rutina con ese nombre. Por favor ingrese otro nombre");
        nombreRutina = prompt("Ingresa un nombre para la nueva rutina");
    }
    let duracion = validarNumero("¿Cuántos minutos dedicarás a: " + nombreRutina + "?");
    let frecuencia = validarNumero("¿Cuántos días a la semana harás " + nombreRutina + "?");
    let seguirCargando;
    let ejercicios = [];
    do {
        ejercicios.push(cargarEjercicio());
        seguirCargando = confirm("Desea seguir cargando ejercicios?");
    } while (seguirCargando);
    let rutina = new Rutina(nombreRutina,duracion,frecuencia,ejercicios);
    usuario.rutinas.push(rutina);
}

// Mostrar las rutinas del usuario

function mostrarRutinas() {
    if(usuario.rutinas.length != 0){
        let mensaje = "Rutinas del usuario:\n";
        for (const rutina of usuario.rutinas) {
            mensaje += "-------------------\n";
            mensaje += "Rutina: " + rutina.nombre + "\n";
            for (const ejercicio of rutina.ejercicios) {
                mensaje += `${ejercicio.nombre} --> ${ejercicio.series} series de ${ejercicio.repeticiones} repeticiones con ${ejercicio.peso} kg\n`;
            }
        }
        alert(mensaje);
    } else {
        alert("No hay rutinas cargadas");
    }
}

// Mostrar resumen

function mostrarResumen (){
    alert("Resumen de " + usuario.nombre);
    alert("Objetivo de Fitness: " + usuario.objetivo);
    alert("Total de minutos de ejercicio por semana: " + calcularTiempoTotal());
}

// Modificar un ejercicio

function agregarEjericio() {
    let nombre = prompt("Ingresa el nombre de la rutina a la que desea agregar un ejercicio");
    let rutinaElegida = usuario.rutinas.findIndex((rut) => rut.nombre === nombre);
    if (rutinaElegida != -1) {
        usuario.rutinas[rutinaElegida].ejercicios.push(cargarEjercicio());
    } else {
        alert("Rutina no existente.");
    }
}

// Creacion de un usuario

formularioInicio.addEventListener('submit', crearUsuario);

// Menú

/* while(opcion){
    opcion = Number(prompt(`ProFit! Seleccione una ópcion:
    1- Mostrar resumen del usuario
    2- Mostrar calorias a consumir
    3- Cargar nueva rutina
    4- Mostrar rutinas
    5- Agregar un ejercicio a rutina
    `));
    switch (opcion) {
        case 1:
            mostrarResumen();
            break;
        case 2:
            mostrarCalorias();
            break;
        case 3:
            crearRutina();
            break;
        case 4:
            mostrarRutinas();
            break;
        case 5:
            agregarEjericio();
            break;
        case 0:
            break;
        default:
            alert("Opcion no válida")
            break;
    }
} */

