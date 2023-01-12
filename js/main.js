
const URL_API = "https://63c0423ca177ed68abc3792a.mockapi.io/contactos";

let formContacto = document.querySelector("#formContacto");
let divAlertaContacto = document.querySelector ("#alertaContacto");

formContacto.addEventListener("submit", contactar);

class Cliente{
    constructor(nombre, email, direccion, celular, ciudad, provincia, cp) {
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.celular = celular;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.cp = cp
    }
}

async function obtenerDatos() {
    try {
        let response = await fetch(URL_API);    //Hace un GET y se trae la API.  
        let datos = await response.json();    
        if (response.ok) {
            return datos;
        }
    } 
    catch (error) {
        console.log(error);
    }
}

async function contactar(event) {
    event.preventDefault();

    let nombre = document.querySelector("#inputName").value;
    let email = document.querySelector("#inputEmail4").value;
    let direccion = document.querySelector("#inputAddress").value;
    let celular = document.querySelector("#inputAddress2").value;
    let ciudad = document.querySelector("#inputCity").value;
    let provincia = document.querySelector("#inputState").value;
    let cp = document.querySelector("#inputZip").value;

    let contactoNuevo = new Cliente(nombre, email, direccion, celular, ciudad, provincia, cp);

    try {
        let response = await fetch(URL_API, {                                           //A traves de metodo POST, enviamos (agregamos) el contacto nuevo en la API
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(contactoNuevo)
        }) 
        response.status === 201 ? contactoAceptado() : contactoRechazado();     // Si devuelve estado 201, indica que se creo de manera correcta el registro en la API
                                                                                // Sino, se informa que el contacto no pudo ser guardado, se solicita llenar el formulario nuevamente
        document.querySelector("#inputName").value = "";
        document.querySelector("#inputEmail4").value = "";
        document.querySelector("#inputAddress").value = "";
        document.querySelector("#inputAddress2").value = "";
        document.querySelector("#inputCity").value = "";
        document.querySelector("#inputState").value = "";
        document.querySelector("#inputZip").value = "";
    } catch (error) {
        console.log(error);    
    }
}

async function contactoAceptado(){                                                      // Se usa la funcion obtenerDatos para mostrar último registro de la tabla de contacto
    let datos = await obtenerDatos();                                                   //Generacion del DOM de manera dinamica
    divAlertaContacto.innerHTML= `<div class="card-header fw-bold">
                                    Datos ingresados
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Nombre: ${datos[datos.length - 1].nombre}</li> 
                                    <li class="list-group-item">Email: ${datos[datos.length - 1].email} </li>
                                    <li class="list-group-item">Dirección: ${datos[datos.length - 1].direccion}</li>
                                    <li class="list-group-item">Celular: ${datos[datos.length - 1].celular}</li>
                                    <li class="list-group-item">Ciudad: ${datos[datos.length - 1].ciudad}</li>
                                    <li class="list-group-item">Provincia: ${datos[datos.length - 1].provincia}</li>
                                    <li class="list-group-item">CP: ${datos[datos.length - 1].cp}</li>
                                </ul>` 

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Nos contactaremos a la brevedad :) Bienvenido a SOHA',
        showConfirmButton: false,
        timer: 2000
        })
}

function contactoRechazado(){                                                       //Generacion del DOM de manera dinamica
    divAlertaContacto.innerHTML= `<div>
                                    <p> EL CONTACTO NO PUDO GUARDARSE.</p>
                                </div>` 
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor, complete nuevamente el formulario',
        showConfirmButton: false,
        timer: 2000
        })
}
