document.addEventListener('DOMContentLoaded', () => {

// Dejé de lado el CSS porque quiero tener  el CRUD hecho antes que nada, además, me empecé a cansar del CSS e intentar que todo esté en el lugar que quiero

let carritoPanel = document.getElementById("carrito");
let iconoCarrito = document.getElementById("carrito-icono");
let botonCerrar = document.getElementById("cerrar-carrito");
let listaCarrito = document.getElementById("lista-carrito");
let subtotalEl = document.getElementById("subtotal");
let totalEl = document.getElementById("total");
let botonVaciar =  document.getElementById("vaciar-carrito");
let botonFinalizar = document.getElementById("finalizar-compra");

const productos = {
    "whistle-boton": { id: "whistle-boton", nombre: "Atopos 24k Pink Gold Whistle", precio: 350 }, // El id siendo el mismo que el de los botones me facilita lo que viene después
    "clip-boton": { id: "clip-boton", nombre: "Atopos Silver Paper Clip", precio: 185 },
    "brick-boton": { id: "brick-boton", nombre: "Atopos Brick", precio: 230 },
    "jenga-boton": { id: "jenga-boton", nombre: "Atopos 24k Golden Jenga", precio: 2772 }
};

let carrito = [];

// Estas dos funciones son para abrir/cerrar el carrito
// Igual hasta quee no haga las otras funciones, no tienen mucho snetido

const abrirCarrito  = () => carritoPanel && carritoPanel.classList.add("abierto");
const cerrarCarrito = () => carritoPanel && carritoPanel.classList.remove("abierto");


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

        li.innerHTML = // voy a cambiar lo que sea btn por boton y la posicion de los atributos
            '<div class="item-titulo">' + item.nombre + '</div>' +
            '<div class="item-eliminar">' +
            '<input class="boton boton-eliminar" type="button" value="🗑️">' +
            '</div>' +
            '<div class="item-controles">' +
            '<input class="qty-btn boton-restar" type="button" value="−">' +
            '<div class="qty-badge">' + item.cantidad + '</div>' +
            '<input class="qty-btn boton-sumar" type="button" value="+">' +
            '<div class="price-each">$' + item.precio + ' c/u</div>' +
            '</div>' +
            '<div class="item-total">$' + totalLinea + '</div>';

        listaCarrito.appendChild(li);
        }
    }
    let subtotal = 0;
    for (let i = 0; i < carrito.length; i++) {
        subtotal = subtotal + (carrito[i].precio * carrito[i].cantidad);
    }
    subtotalEl.textContent = "$" + subtotal;
    totalEl.textContent = "$" + subtotal;

    let deshabilitar = carrito.length == 0;
    // Creo que este era el error
    if (botonVaciar) botonVaciar.disabled = deshabilitar;
    if (botonFinalizar) botonFinalizar.disabled = deshabilitar;

}

function cambiarCantidad(id, cambio) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
        let nueva = carrito[i].cantidad + cambio
        if (nueva >= 1) {                          // No dejo que sea 0 porque prefiero que se use un botón para sacarlo
            carrito[i].cantidad = nueva;
        }
        break
        }
    }
    obtenerProductos()
}

// Ahora si, lo que me estaba faltando, conectar el botón agregar al carrito de cada item con el carrito
document.querySelectorAll(".botones-articulos").forEach(boton => {
    boton.addEventListener("click", () => {
        agregarProducto(boton.id);
    });
});

if (iconoCarrito) iconoCarrito.addEventListener("click", abrirCarrito);
if (botonCerrar) botonCerrar.addEventListener("click", cerrarCarrito);
if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);

listaCarrito.addEventListener("click", (e) => {
    let li = e.target.closest("li");
    if (!li) return;
    let id = li.getAttribute("data-id");

    if (e.target.classList.contains("boton-eliminar")) {
        eliminarProducto(id);
    } else if (e.target.classList.contains("boton-sumar")) {
        cambiarCantidad(id, +1);
    } else if (e.target.classList.contains("boton-restar")) {
        cambiarCantidad(id, -1);
    }
});

function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.className = 'notificacion';
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('visible'), 100);

    setTimeout(() => {
        notif.classList.remove('visible');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function finalizarCompra() {
    if (carrito.length == 0) return;

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mostrarNotificacion("Compra exitosa!");
    
    carrito = [];
    obtenerProductos();
    cerrarCarrito();
}

if (botonFinalizar) botonFinalizar.addEventListener('click', finalizarCompra);

});

// Mi idea en general era usar un poco Bootstrap, pero al final no