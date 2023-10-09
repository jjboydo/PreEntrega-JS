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

    header.querySelector(".datosUsuario h2").textContent = usuarioRegistrado.nombre;

    document.querySelector(".bienvenida h2 strong").textContent = usuarioRegistrado.nombre;
}

function actualizarHTML() {
    const section = document.querySelector(".objetivo");

    section.querySelector(".obj").textContent = usuarioRegistrado.objetivo.toUpperCase();
    usuarioRegistrado.objetivo === "Ganar Musculo" ? section.querySelector(".kcal strong").textContent = Math.round(calcularCaloriasMantenimiento()) + 300 : section.querySelector(".kcal strong").textContent = Math.round(calcularCaloriasMantenimiento()) - 300;
    section.querySelector(".actividad").textContent = calcularFactorActividad(calcularTiempoTotal()).nombre;

}

const formularioInicio = document.querySelector('#form-inicio');
const formularioCargaRutina = document.querySelector('#form-rutina');
const seleccionEjercicios = document.querySelector("#ejercicios");
const botonesEjercicio = document.querySelectorAll("#ejercicios button");
let usuarioRegistrado;

function crearUsuario(evt){

    evt.preventDefault();

    let nombreUsuario = formularioInicio.querySelector("#nombreUser").value;
    let edad = formularioInicio.querySelector("#edad").value;
    let sexo = formularioInicio.querySelector("#sexo").value;
    let objetivo = formularioInicio.querySelector("#objetivo").value;
    let altura = formularioInicio.querySelector("#altura").value;
    let peso = formularioInicio.querySelector("#peso").value;
    let rutinas = [];
    
    usuarioRegistrado = new Usuario(nombreUsuario, edad, sexo, objetivo, altura, peso, rutinas);
    console.log(usuarioRegistrado);

    desplegarSitio();
    actualizarHTML();
}


// Función para calcular el tiempo total de ejercicio

function calcularTiempoTotal() {
    let tiempoTotal = usuarioRegistrado.rutinas.reduce((acumulador, rutina) => acumulador + (rutina.duracion * rutina.frecuencia), 0);
    return tiempoTotal;
}

// Función para calcular las calorias necesarias para mantener el peso

function calcularCaloriasMantenimiento (){
    if(usuarioRegistrado.sexo === "M"){
        return (10 * usuarioRegistrado.peso + 6.25 * usuarioRegistrado.altura - 5 * usuarioRegistrado.edad + 5) * calcularFactorActividad(calcularTiempoTotal()).factor;
    } else {
        return (10 * usuarioRegistrado.peso + 6.25 * usuarioRegistrado.altura - 5 * usuarioRegistrado.edad - 161) * calcularFactorActividad(calcularTiempoTotal()).factor;
    }
}

// Función que calcula el Factor de Actividad del usuario

function calcularFactorActividad (minutosEjercicioSemanal){
    switch(true){
        case (minutosEjercicioSemanal < 120):
            return {
                nombre: "Sedentario",
                factor: 1.2
            };
        case (minutosEjercicioSemanal < 300):
            return {
                nombre: "Moderadamente Activo",
                factor: 1.55
            }; 
        case (minutosEjercicioSemanal < 600):
            return {
                nombre: "Muy Activo",
                factor: 1.725
            };
        default:
            return {
                nombre: "Extremadamente Activo",
                factor: 1.9
            };                     
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

function mostrarExito(msg){
    const mensajeExito = document.createElement('p');
    mensajeExito.textContent = msg;
    mensajeExito.classList.add('mensaje')
    const modal = document.querySelector('main');
    modal.appendChild(mensajeExito);

    setTimeout(()=>{
        mensajeExito.remove()
    },3000)
}


// Cargar ejercicios de la rutina

function cargarEjercicios(ejercicios){

    const ejerciciosCargados = document.querySelector("#ejercicios-cargar");
    ejerciciosCargados.classList.remove("oct-anim");

    botonesEjercicio.forEach( boton => {
        boton.addEventListener('click', () => {
            const fila = boton.parentNode.parentNode;
            const nombreEjercicio = fila.firstElementChild.textContent;
            const filaNueva = document.createElement("tr");
            filaNueva.innerHTML = `
                <td>${nombreEjercicio}</td>
                <td><input type="number" name="serie" id="serie" min="1"></td>
                <td><input type="number" name="rep" id="rep" min="1"></td>
                <td><input type="number" name="peso" id="peso" min="1"></td>
            `;

            document.querySelector("#ejercicios-cargar-table tbody").appendChild(filaNueva);
            document.querySelector(".btn").classList.remove("oculto");
        });
    });

    const guardarRutina = ejerciciosCargados.querySelector(".btn");
    guardarRutina.addEventListener('click', () => {
        const ejerciciosListos = ejerciciosCargados.querySelectorAll("tbody tr");
        ejerciciosListos.forEach( ejercicio => {
            const hijos = ejercicio.children;
            
            let nombre = hijos[0].textContent;
            let series = hijos[1].firstElementChild.value;
            let repeticiones = hijos[2].firstElementChild.value;
            let peso = hijos[3].firstElementChild.value;
            
            ejercicios.push(new Ejercicio(nombre,repeticiones,series,peso));
        })
        ejerciciosCargados.classList.add("oct-anim");
        document.querySelector("#ejercicios").classList.add("oct-anim");
        mostrarExito("Rutina cargada correctamente");
    });


}

// Crear nueva rutina

function crearRutina(evt){

    evt.preventDefault();

    let nombreRutina = formularioCargaRutina.querySelector("#nombreRut").value;
    /* while (usuarioRegistrado.rutinas.some((rut) => rut.nombre === nombreRutina)) {
        alert("Ya existe una rutina con ese nombre. Por favor ingrese otro nombre");
        nombreRutina = prompt("Ingresa un nombre para la nueva rutina");
    } */
    let duracion = formularioCargaRutina.querySelector("#duracion").value;
    let frecuencia = formularioCargaRutina.querySelector("#dias").value;
    let ejercicios = [];

    
    const listaEjercicios = document.querySelector("#ejercicios");
    listaEjercicios.classList.remove("oct-anim");

    cargarEjercicios(ejercicios);
    
    let rutina = new Rutina(nombreRutina,duracion,frecuencia,ejercicios);
    usuarioRegistrado.rutinas.push(rutina);
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

formularioInicio.addEventListener('submit', crearUsuario);
formularioCargaRutina.addEventListener('submit', crearRutina);

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

