/* funciones(expresada,declarada,flecha), estructura if, else if operador ternario, and y or , estructura for, metodos de arrays  / ejercicios con prompt sync */

//expresada da igual si el console log est[a] antes o despu[es]

console.log(saludar("Daniela"))

function saludar(nombre) {
    return ("Hola " + nombre)
}

console.log(saludar("Esteban"))

//declaradas no da igual el console log ya que est[a] guardada en una variable

//console.log(despedir("Maradei"))


let despedir = function (apellido) {
    return ("chau " + apellido)
}

console.log(despedir("Piazza"))

// back tick

function saludarConSuma(nombre) {
    return (`Hola ${nombre} la suma de 1 +1 es ${1 + 1}`)
}
console.log(saludarConSuma("Esteban"))

// funcion flecha

let saludarFlecha = nombre => "hola " + nombre // Si recibe m[as] de un argumento, hay que ponerlos entre par[e]ntesis // Si es solo una linea, no hace falta poner return

console.log(saludarFlecha("Pedro"))

// estructura if
let a = 1
let b = 2
if (a > b) {
    console.log(`A es mayor que B`)
    console.log("todo lo que quieras") 
} else if (a === b) {
    console.log("A y B son iguales")
} else {
    console.log("A es menor que B")
}

// operador ternario

console.log(a > b ? "a es mayor que b" : "a no es mayor que b") // pregunta ? izquierda = True : derecha = False

// for

// for (variable; condición; variación)
for (let i = 0; i < 10; i++) {
    console.log(i)
}

let nombre = "Esteban"

for (let i = 0; i < nombre.length; i++) {
    console.log(nombre[i])
}

const CARRITO = [
    { id: 1, nombre: "Remera blanca lisa", precio: 5 },
    { id: 2, nombre: "Remera negra lisa", precio: 5 },
    { id: 3, nombre: "Remera roja lisa", precio: 5 },
    { id: 4, nombre: "Remera blanca bart", precio: 5 },
    { id: 5, nombre: "Remera blanca bart", precio: 5 },
]

for (let i = 0; i < CARRITO.length; i++) {
    if (CARRITO[i].id < 4) {
        CARRITO[i].precio = CARRITO[i].precio * 1.2
    }
}
console.log(CARRITO)

let total = 0
for (let i = 0; i < CARRITO.length; i++) {
    total += CARRITO[i].precio
}
console.log(total)

// metodos
