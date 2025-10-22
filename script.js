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

    // Agregar lo que sería obtenerProductos cuando termine con esa
    abrirCarrito() // La idea sería que el carrito se abra cuando uno agrega un producto
}