
let contactosClientes = JSON.parse(localStorage.getItem("Clientes")) || [];

let formContacto = document.querySelector("#formContacto");
let divAlertaContacto = document.querySelector ("#alertaContacto");

formContacto.addEventListener("submit", contactar);

class Cliente{
    constructor(email, direccion, celular, ciudad, provincia, cp) {
        this.email = email;
        this.direccion = direccion;
        this.celular = celular;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.cp = cp
    }
}

function contactar(event){
    event.preventDefault();
    let email = document.querySelector("#inputEmail4").value;
    let direccion = document.querySelector("#inputAddress").value;
    let celular = document.querySelector("#inputAddress2").value;
    let ciudad = document.querySelector("#inputCity").value;
    let provincia = document.querySelector("#inputState").value;
    let cp = document.querySelector("#inputZip").value;
    
    let contactoNuevo = new Cliente(email, direccion, celular, ciudad, provincia, cp);
    
    contactosClientes.push(contactoNuevo);
    localStorage.setItem("Clientes", JSON.stringify(contactosClientes));
    
    contactoAceptado();

    document.querySelector("#inputEmail4").value = "";
    document.querySelector("#inputAddress").value = "";
    document.querySelector("#inputAddress2").value = "";
    document.querySelector("#inputCity").value = "";
    document.querySelector("#inputState").value = "";
    document.querySelector("#inputZip").value = "";
}

function contactoAceptado(){
    let listaContactos= JSON.parse(localStorage.getItem("Clientes"));
    divAlertaContacto.innerHTML= `<div class="font-ubuntu">
                                    <p> CONTACTO AGENDADO. Nos comunicaremos a la brevedad a la direccion de mail ${listaContactos[listaContactos.length-1].email}, o al telefono ${listaContactos[listaContactos.length-1].celular}</p>
                                </div>` 

}
