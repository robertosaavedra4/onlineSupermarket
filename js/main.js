let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorProductos = document.getElementById('productos');
const listaCarrito = document.getElementById('carrito-lista');
const btnAbrirCarrito = document.getElementById('btnCarrito');
const panelCarrito = document.getElementById('panelCarrito');
const btnCerrarCarrito = document.getElementById('cerrarCarrito');
const totalElemento = document.getElementById('total');
const btnFinalizar = document.getElementById('finalizarCompra');

function mostrarAlerta(mensaje, icono = "success") {
    Swal.fire({
        position: 'top-end',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

fetch('js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderProductos(productos);
    });

function renderProductos(lista) {
    contenedorProductos.innerHTML = '';
    lista.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imgProducto"/>
            <p><strong>${producto.nombre}</strong> - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function renderCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nombre}</span> - $${item.precio * item.cantidad}
            <div class="cantControles">
                <button onclick="modificarCantidad(${index}, -1)">−</button>
                <span>${item.cantidad}</span>
                <button onclick="modificarCantidad(${index}, 1)">+</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    totalElemento.textContent = `Total: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderCarrito();
    mostrarAlerta("Producto agregado");
}

function modificarCantidad(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    renderCarrito();
}

btnAbrirCarrito.onclick = () => {
    panelCarrito.style.display = "flex";
};

btnCerrarCarrito.onclick = () => {
    panelCarrito.style.display = "none";
};

btnFinalizar.onclick = () => {
    if (carrito.length === 0) {
        mostrarAlerta("Tu carrito está vacío", "warning");
        return;
    }

    Swal.fire({
        title: 'Finalizar compra',
        html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="email" type="email" class="swal2-input" placeholder="Email">
        `,
        confirmButtonText: 'Comprar',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            if (!nombre || !email) {
                Swal.showValidationMessage('Por favor, completá todos los campos');
            }
            return { nombre, email };
        }
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire(`¡Gracias ${result.value.nombre}!`, 'Tu compra fue registrada.', 'success');
            carrito = [];
            renderCarrito();
        }
    });
};

renderCarrito();
