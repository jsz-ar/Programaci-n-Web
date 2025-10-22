// Dejé de lado el CSS porque quiero tener  el CRUD hecho antes que nada, además, me empecé a cansar del CSS e intentar que todo esté en el lugar que quiero

let carritoPanel = document.getElementById("carrito");
let iconoCarrito = document.getElementById("carrito-icono");
let btnCerrar = document.getElementById("cerrar-carrito");
let listaCarrito = document.getElementById("lista-carrito");
let subtotalEl = document.getElementById("subtotal");
let totalEl = document.getElementById("total");
let btnVaciar =  document.getElementById("vaciar-carrito");
let btnFinalizar = document.getElementById("finalizar-compra");

const productos = {
    "whistle-boton": { id: "whistle-boton", nombre: "Atopos 24k Pink Gold Whistle", precio: 350 }, // El id siendo el mismo que el de los botones me facilita lo que viene después
    "clip-boton": { id: "clip-boton", nombre: "Atopos Silver Paper Clip", precio: 185 },
    "brick-boton": { id: "brick-boton", nombre: "Atopos Brick", precio: 230 },
    "jenga-boton": { id: "jenga-boton", nombre: "Atopos 24k Golden Jenga", precio: 2772 }
};

let carrito = [];

// Estas dos funciones son para abrir/cerrar el carrito
// Igual hasta quee no haga las otras funciones, no tienen mucho snetido

const abrirCarrito  = () => carritoPanel.classList.add("abierto");
const cerrarCarrito = () => carritoPanel.classList.remove("abierto");


function agregarProducto(idBoton) {

    if (!productos[idBoton]) {
        return
    }

    let coincide = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == idBoton) {
            carrito[i].cantidad = carrito[i].cantidad + 1
            coincide = true
        break
        }
    }

    if (!coincide) {
        carrito.push({
            id: idBoton,
            nombre: productos[idBoton].nombre,
            precio: productos[idBoton].precio,
            cantidad: 1
        });
    }

    obtenerProductos()
    abrirCarrito() // La idea sería que el carrito se abra cuando uno agrega un producto
    console.log(carrito);
}

function eliminarProducto(id) {
    let nuevoCarrito = []
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id != id) nuevoCarrito.push(carrito[i]);
    }
    
    carrito = nuevoCarrito
    console.log(carrito)
    obtenerProductos()
}

function vaciarCarrito() {
    carrito = [];
    obtenerProductos()
    console.log(carrito) // No hay mucho misterio tampoco...
}

function obtenerProductos() { // No es la misma que usé en el parcial, pero está adaptada para este contexto
    listaCarrito.innerHTML = "";

    if (carrito.length == 0) {
        let li = document.createElement("li")
        li.className = "item"
        li.innerHTML = '<div class="item-titulo">Tu carrito está vacío</div>';
        listaCarrito.appendChild(li)
    } else {
        for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i]
        let totalLinea = item.precio * item.cantidad;

        let li = document.createElement("li");
        li.className = "item";
        li.setAttribute("data-id", item.id);

        li.innerHTML =
            '<div class="item-titulo">' + item.nombre + '</div>' +
            '<div class="item-eliminar">' +
            '<input class="btn btn-eliminar" type="button" value="🗑️">' +
            '</div>' +
            '<div class="item-controles">' +
            '<input class="qty-btn btn-restar" type="button" value="−">' +
            '<div class="qty-badge">' + item.cantidad + '</div>' +
            '<input class="qty-btn btn-sumar" type="button" value="+">' +
            '<div class="price-each">$' + item.precio + ' c/u</div>' +
            '</div>' +
            '<div class="item-total">$' + totalLinea + '</div>';

        listaCarrito.appendChild(li);
        }
    }
}