const productos = [
  { id: 1, nombre: 'Banana', precio: 200 },
  { id: 2, nombre: 'Manzana', precio: 250 },
  { id: 3, nombre: 'Naranja', precio: 180 },
  { id: 4, nombre: 'Carne', precio: 1800 },
  { id: 5, nombre: 'Pollo', precio: 1400 },
  { id: 6, nombre: 'Gaseosa', precio: 700 },
  { id: 7, nombre: 'Agua', precio: 400 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorProductos = document.getElementById('productos');
const listaCarrito = document.getElementById('carrito');
const btnVaciar = document.getElementById('vaciarCarrito');
const inputBuscador = document.getElementById('buscador');
const totalElemento = document.getElementById('total');

function renderProductos(lista = productos) {
  contenedorProductos.innerHTML = '';
  lista.forEach(producto => {
    const div = document.createElement('div');
    div.innerHTML = `
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
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });

  totalElemento.textContent = `Total a pagar: $${total}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const itemEnCarrito = carrito.find(item => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  renderCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

btnVaciar.onclick = () => {
  carrito = [];
  renderCarrito();
};

inputBuscador.addEventListener('input', () => {
  const texto = inputBuscador.value.toLowerCase();
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderProductos(productosFiltrados);
});

renderProductos();
renderCarrito();
