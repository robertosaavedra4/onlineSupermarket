alert('Bienvenido usuario, favor de hacer click en Aceptar para continuar...');

let nombre = prompt('Ingrese su nombre: ');
console.log('Bienvenido ' + nombre);

function inicioPrograma() {
    let opcionElegida = parseInt(prompt(
        'Elija una opción deseada entre las siguientes:\n' +
        '1. Agregar productos\n' +
        '2. Ver carrito\n' +
        '3. Eliminar productos\n' +
        '4. Salir'));
    return opcionElegida;
}

function eliminarProductoDelCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = 'Carrito actual:\n';
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto}\n`;
    });

    let indice = parseInt(prompt(mensaje + "Ingrese el número del producto a eliminar:")) - 1;

    if (indice >= 0 && indice < carrito.length) {
        let eliminado = carrito.splice(indice, 1);
        alert(`Se eliminó: ${eliminado}`);
    } else {
        alert("Índice inválido.");
    }
}

const productos = {
    1: 'banana',
    2: 'manzana',
    3: 'naranja',
    4: 'carne',
    5: 'pollo',
    6: 'gaseosa',
    7: 'agua'
};

let carrito = [];
let respuesta;

do {
    respuesta = inicioPrograma();

    if (respuesta !== 4) {
        switch (respuesta) {
            case 1:
                let lista = '¿Qué productos desea agregar? Ingrese los números separados por coma:\n';
                lista += Object.entries(productos)
                    .map(([id, nombre]) => `${id}. ${nombre}`)
                    .join('\n');
                let seleccion = prompt(lista);
                let listaIds = seleccion.split(',').map(id => id.trim());
                listaIds.forEach(id => {
                    if (productos[id]) carrito.push(productos[id]);
                });
                console.log('Carrito: ', carrito);
                break;

            case 2:
                if (carrito.length === 0) {
                    alert("El carrito está vacío.");
                } else {
                    alert("Carrito: " + carrito.join(', '));
                    console.log('Carrito: ', carrito)
                }
                break;

            case 3:
                eliminarProductoDelCarrito();
                break;

            default:
                alert('Opción elegida incorrecta.');
        }
    } else {
        alert('Gracias por usar el programa');
    }

} while (respuesta !== 4);
