
function addDarkmodeWidget() {
    new Darkmode().showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);

// Clases

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

    document.querySelector(".seleccion-ejercicios").classList.add("oculto");
    
    header.querySelector(".datosUsuario h2").textContent = usuarioRegistrado.nombre;
    
    document.querySelector(".bienvenida h2 strong").textContent = usuarioRegistrado.nombre;
    
}

function actualizarHTML() {
    const section = document.querySelector(".objetivo");
    
    section.querySelector(".obj").textContent = usuarioRegistrado.objetivo.toUpperCase();
    usuarioRegistrado.objetivo === "Ganar Musculo" ? section.querySelector(".kcal strong").textContent = Math.round(calcularCaloriasMantenimiento()) + 300 : section.querySelector(".kcal strong").textContent = Math.round(calcularCaloriasMantenimiento()) - 300;
    section.querySelector(".actividad").textContent = calcularFactorActividad(calcularTiempoTotal()).nombre;
    mostrarRutinas();
}

const ejerciciosPreCargados = [
    {
        "nombre": "Press de banca",
        "musculo": "Pectorales"
    },
    {
        "nombre": "Sentadillas",
        "musculo": "Piernas"
    },
    {
        "nombre": "Dominadas",
        "musculo": "Espalda"
    },
    {
        "nombre": "Fondos en paralelas",
        "musculo": "Tríceps"
    },
    {
        "nombre": "Curl de bíceps",
        "musculo": "Bíceps"
    },
    {
        "nombre": "Peso muerto",
        "musculo": "Espalda baja"
    },
    {
        "nombre": "Flexiones",
        "musculo": "Pectorales"
    },
    {
        "nombre": "Zancadas",
        "musculo": "Piernas"
    },
    {
        "nombre": "Remo con barra",
        "musculo": "Espalda"
    },
    {
        "nombre": "Press militar",
        "musculo": "Hombros"
    },
    {
        "nombre": "Plancha abdominal",
        "musculo": "Abdominales"
    },
    {
        "nombre": "Elevaciones laterales",
        "musculo": "Hombros"
    },
    {
        "nombre": "Fondos en máquina",
        "musculo": "Tríceps"
    },
    {
        "nombre": "Curl martillo",
        "musculo": "Bíceps"
    },
    {
        "nombre": "Prensa de piernas",
        "musculo": "Piernas"
    },
    {
        "nombre": "Crunches",
        "musculo": "Abdominales"
    },
    {
        "nombre": "Hip Thrust",
        "musculo": "Glúteos"
    },
    {
        "nombre": "Extensiones de tríceps",
        "musculo": "Tríceps"
    },
    {
        "nombre": "Curl concentrado",
        "musculo": "Bíceps"
    }
];
listarEjercicios();
const formularioInicio = document.querySelector('#form-inicio');
const formularioCargaRutina = document.querySelector('#form-rutina');
const seleccionEjercicios = document.querySelector("#ejercicios");
const botonesEjercicio = document.querySelectorAll("#ejercicios button");
const rutinasCargadas = document.querySelector("#rutinas");
const ejerciciosCargados = document.querySelector("#ejercicios-cargar");
let usuarioRegistrado;

window.addEventListener('DOMContentLoaded', ()=>{
    let usuarioStorage = JSON.parse(localStorage.getItem('usuarioRegistrado')) || [];
    if (usuarioStorage.length != 0){
        usuarioRegistrado = usuarioStorage;
        desplegarSitio();
        actualizarHTML();
    }
})

function sincronizarStorage(){
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));
}

function limpiarStorage(){
    localStorage.clear(); 
}

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

    sincronizarStorage();
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
    Swal.fire({
        icon: 'success',
        title: 'Éxito...',
        text: msg,
        timer: 5000
      })
}

function mostrarError(msg) {
    Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: msg,
        timer: 5000
      })
}

function scrollA(contenedor){
    document.querySelector(contenedor).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function ocultarInicio(){
    document.querySelector(".bienvenida").classList.add("oculto");
    document.querySelector(".objetivo").classList.add("oculto");
    document.querySelector(".rutinas").classList.add("oculto");
}

function mostrarInicio(){
    document.querySelector(".bienvenida").classList.remove("oculto");
    document.querySelector(".objetivo").classList.remove("oculto");
    document.querySelector(".rutinas").classList.remove("oculto");
}

function liActivo(evt){

    const a = evt.target;
    const lis = document.querySelectorAll(".unstyled li");

    lis.forEach(li => {
        li.classList.remove("activo");
    });
    a.parentNode.classList.add("activo");
}

function insertarFila(evt) {
    const boton = evt.target;
    boton.classList.add("oculto");
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

    boton.removeEventListener('click', insertarFila);
}

// Listar los ejercicios para agregar

function listarEjercicios(){
    ejerciciosPreCargados.forEach(ejercicio => {
        const filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `
        <td>${ejercicio.nombre}</td>
        <td>${ejercicio.musculo}</td>
        <td><button>+</button></td>
        `;
        document.querySelector("#ejercicios-table tbody").appendChild(filaNueva);
    });
}

// Cargar ejercicios de la rutina

function cargarEjercicios(ejercicios){
    
    ejerciciosCargados.classList.remove("oct-anim");
    botonesEjercicio.forEach( boton => {
        boton.addEventListener('click', insertarFila);
    });

    ocultarInicio();
    document.querySelector(".seleccion-ejercicios").classList.remove("oculto");

    function guardarRutinaClick() {
        const ejerciciosListos = ejerciciosCargados.querySelectorAll("tbody tr");
        ejerciciosListos.forEach((ejercicio) => {
            const hijos = ejercicio.children;

            let nombre = hijos[0].textContent;
            let series = hijos[1].firstElementChild.value;
            let repeticiones = hijos[2].firstElementChild.value;
            let peso = hijos[3].firstElementChild.value;

            ejercicios.push(new Ejercicio(nombre, repeticiones, series, peso));
        });

        ejerciciosCargados.classList.add("oct-anim");
        document.querySelector("#ejercicios").classList.add("oct-anim");
        mostrarInicio();
        resetBtn();
        resetEjercicios();
        mostrarExito("Rutina cargada correctamente");
        document.querySelector(".seleccion-ejercicios").classList.add("oculto");
        sincronizarStorage();
        
        guardarRutina.removeEventListener('click', guardarRutinaClick);
    }

    const guardarRutina = document.querySelector(".btn");
    guardarRutina.addEventListener('click', guardarRutinaClick);
}

function resetBtn() {
    botonesEjercicio.forEach(boton => {
        boton.classList.remove("oculto");
        boton.removeEventListener('click', insertarFila);
    });
    document.querySelector(".btn").classList.add("oculto");
}

function resetEjercicios() {
    const filas = ejerciciosCargados.querySelector("tbody");
    while(filas.firstChild){
        filas.removeChild(filas.firstChild);
    }
}

function resetRutinas() {
    const filas = rutinasCargadas.querySelector("tbody");
    while(filas.firstChild){
        filas.removeChild(filas.firstChild);
    }
}

function resetDetalleRutina() {
    const filas = document.querySelector(".ejercicios-rutina tbody");
    while(filas.firstChild){
        filas.removeChild(filas.firstChild);
    }
    document.querySelector(".ejercicios-rutina").classList.add("oct-anim");
}

// Crear nueva rutina

function crearRutina(nombre,duracion,frecuencia){

    let nombreRutina = nombre;
    if(usuarioRegistrado.rutinas.some((rut) => rut.nombre === nombreRutina)){
        mostrarError("El nombre de la rutina ya existe");
        return;
    }
    let dur = duracion;
    let frec = frecuencia;
    let ejercicios = [];
    cargarEjercicios(ejercicios);
    const listaEjercicios = document.querySelector("#ejercicios");
    listaEjercicios.classList.remove("oct-anim");

    
    let rutina = new Rutina(nombreRutina,dur,frec,ejercicios);
    usuarioRegistrado.rutinas = [...usuarioRegistrado.rutinas, rutina]
    actualizarHTML();
}

// Mostrar las rutinas del usuario

function mostrarRutinas() {
    resetRutinas();
    usuarioRegistrado.rutinas.forEach(rutina => {
        const filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `
            <td>${rutina.nombre}</td>
            <td>${rutina.duracion}</td>
            <td>${rutina.frecuencia}</td>
            <td>
                <button class="ver-mas">+</button>
                <button class="borrar">-</button>
            </td>
        `;
        document.querySelector("#rutinas tbody").appendChild(filaNueva);
    });
    mostrarDetalleRutina();
    eliminarRutina();
}

function mostrarFila(evt) {
    const boton = evt.target;
    resetDetalleRutina();
    /* document.querySelector(".ejercicios-rutina").classList.remove("oct-anim"); */
    const fila = boton.parentNode.parentNode;
    const nombreRutina = fila.firstElementChild.textContent;
    document.querySelector(".ejercicios-rutina h2").textContent = `${nombreRutina}:`;
    const rutina = usuarioRegistrado.rutinas.find((rut) => rut.nombre === nombreRutina);
    rutina.ejercicios.forEach(ejercicio => {
        const filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `
        <td>${ejercicio.nombre}</td>
        <td>${ejercicio.series}</td>
        <td>${ejercicio.repeticiones}</td>
        <td>${ejercicio.peso}</td>
        `;
        document.querySelector("#ejercicios-rutina-table tbody").appendChild(filaNueva);
    });

    sweetAlertDetalleRutina();
    actualizarHTML();
}

function eliminarFila(evt) {
    const boton = evt.target;
    /* document.querySelector(".ejercicios-rutina").classList.remove("oct-anim"); */
    const fila = boton.parentNode.parentNode;
    const nombreRutina = fila.firstElementChild.textContent;
    usuarioRegistrado.rutinas = usuarioRegistrado.rutinas.filter((rut) => rut.nombre != nombreRutina);
    Swal.fire({
        title: 'Estás seguro de que quieres borrar la rutina?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar Rutina!'
      }).then((result) => {
        if (result.isConfirmed) {
            fila.remove();
          Swal.fire({
            title: "La rutina ha sido eliminada",
            timer: 3000
          })
        }
      })


    actualizarHTML();
    sincronizarStorage();
}

function mostrarDetalleRutina() {
    const botonesRutinas = document.querySelectorAll("#rutinas .ver-mas");
    botonesRutinas.forEach( boton => {
        boton.addEventListener('click', mostrarFila);
    });
}

function eliminarRutina() {
    const botonesRutinas = document.querySelectorAll("#rutinas .borrar");
    botonesRutinas.forEach( boton => {
        boton.addEventListener('click', eliminarFila);
    });
}

function sweetAlertDetalleRutina(){
    document.querySelector(".ejercicios-rutina").classList.remove("oct-anim");
    Swal.fire({
        html: document.querySelector(".ejercicios-rutina").outerHTML,
        width: 800,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            input: '.nombre-rutina',
        }
      })
}

function sweetAlertRutina(){
    Swal.fire({
        title: 'Cargar nueva rutina',
        html: `<form action="" id="form-rutina" class="form-rutina">
        <div class="nombre-rutina">
            <label for="nombreRut">Nombre de Rutina:</label>
            <input type="text" class="swal2-input" name="nombreRut" id="nombreRut" required>
        </div>

        <div>
            <label for="duracion">Duración (min):</label>
            <input type="number" class="swal2-input" name="duracion" id="duracion" min="10" required>
        </div>

        <div>
            <label for="dias">Días a la semana:</label>
            <input type="number" class="swal2-input" name="dias" id="dias" min="1" max="7" required>
        </div>

    </form>`,
        confirmButtonText: 'Seleccionar ejercicios',
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        width: 800,
        customClass: {
            input: '.nombre-rutina',
        },
        preConfirm: () => {
          const nombre = Swal.getPopup().querySelector('#nombreRut').value;
          const duracion = Swal.getPopup().querySelector('#duracion').value;
          const frecuencia = Swal.getPopup().querySelector('#dias').value;
          if (!nombre || !duracion || !frecuencia || !(frecuencia > 0 && frecuencia < 7) || !(duracion > 0)) {
            Swal.showValidationMessage(`Los datos no son válidos`)
          }
          return { nombre: nombre , duracion: duracion , frecuencia: frecuencia }
        }
      }).then((result) => {
        crearRutina(result.value.nombre, result.value.duracion, result.value.frecuencia);
      })
}

formularioInicio.addEventListener('submit', crearUsuario);
/* formularioCargaRutina.addEventListener('submit', crearRutina); */
/* document.querySelectorAll(".unstyled li").forEach(li => {
    li.addEventListener('click', liActivo);
}); */
document.querySelector(".borrar").addEventListener('click', limpiarStorage);
document.querySelector(".agregarRut").addEventListener('click', sweetAlertRutina);
document.querySelector(".com-aleat").addEventListener('click', () => {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    fetch(apiUrl)
      .then(res => {        
        return res.json();
      })
      .then(data => {
        console.log(data);

        Swal.fire({
            html: `
                <h2>${data.meals[0].strMeal}</h2>
                <img src="${data.meals[0].strMealThumb}" alt="Foto-Receta" class="modal-img">
                <p>${data.meals[0].strCategory}, ${data.meals[0].strArea}</p>
                <h3>Preparación: </h3>
                <p>${data.meals[0].strInstructions}</p>
                <a href="${data.meals[0].strYoutube}" target="_blank" rel="noopener noreferrer" class="modal-a">Ver receta en YouTube</a>
                <br>
                <a href="${data.meals[0].strSource}" target="_blank" rel="noopener noreferrer" class="modal-a">Ver mas detalles de la receta</a>
                `,
            width: 800,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                content: '.modal-a',
            }
          })
      })
      .catch(error => {
        console.error(`Error en la solicitud: ${error}`);
      });
    
});

