alert('Bienvenido usuario, favor de hacer click en Aceptar para continuar...')
let nombre = prompt('Ingrese su nombre: ')
console.log('Bienvenido ' + nombre)

function inicioPrograma(){
    let opcionElegida = parseInt(prompt(
        'Elija una opcion deseada entre las siguientes opciones:\n'+
            '1. Agregar productos\n'+
            '2. Ver carrito\n'+
            '3. Eliminar productos\n'+
            '4. Salir'))
            return opcionElegida;
    }

const productos = {
    1: 'banana',
    2: 'manzana',
    3: 'naranja',
    4: 'carne',
    5: 'pollo',
    6: 'gaseosa',
    7: 'agua'
}

let carrito = [];

do {
    respuesta = inicioPrograma();

    if (respuesta !== 4);{
        switch (respuesta) {
        case 1:
            let lista = 'Que productos desea agregar? Separe los numeros por coma\n';
            lista += Object.entries(productos).map(([id, nombre]) => `${id}. ${nombre}`)
            .join('\n');
            let seleccion = prompt(lista);
            let listaIds = seleccion.split(',').map(id => id.trim());
            carrito = listaIds.map(id => productos[id]);
            console.log('Carrito: ', carrito)
            //inicioPrograma();
            break;
        
        case 2:
            alert(carrito);
            //inicioPrograma();
            break;
        
        case 3:
            let itemAEliminar = 'Que producto desea eliminar?\n'
            console.log(carrito)
            itemAEliminar = parseInt(prompt());
            carrito.map=carrito.splice(itemAEliminar);
            //inicioPrograma();
            break;

        case 4:
            alert('Gracias por usar el programa');
            break;
        
    default:
            alert('Opcion elegida incorrecta!!!');



        }
    }
}   while (respuesta!==4);

