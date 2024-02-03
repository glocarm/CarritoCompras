class Producto {
  constructor(id, nombre, precio, disponible, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.disponible = disponible;
    this.imagen = imagen;
    this.cantidad = 1;
  }
}

const aceite = new Producto(1, "Aceite Marolio", 1500.0, 2, "img/aceite.png");
const arroz = new Producto(2, "Arroz Marolio", 1700, 98, "img/arroz.png");
const galletas = new Producto(3,"Galletas Marolio", 640.0, 200, "img/galletas.png");
const pasta = new Producto(4, "Pasta Marolio", 100.0, 150, "img/pasta.png");
const polenta = new Producto(5, "Polenta Marolio",100.0, 150, "img/polenta.png");
const yerba = new Producto(6, "Yerba Marolio", 100.0, 150, "img/yerba.png");

const arrayproductos = [aceite, arroz, galletas, pasta, polenta, yerba];

let arraycarrito = [];

//Mostrar Catalogo de Productos del Almacén modificando el DOM

const contenedorProductos = document.getElementById("contenedorProductos");
const mostrarProductos = () => {
  contenedorProductos.innerHTML = "";
  arrayproductos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
              <div class="card">
                  <img src=${producto.imagen} class="card-img-top imgProductos">
                  <div class="card-body">
                      <h5>${producto.nombre}</h5>
                      <p>$ ${producto.precio}</p>
                      <p>${producto.disponible} Unidades</p>
                      <button class="btn colorBoton" id="boton${producto.id}">Agregar al Carrito</button>
                  </div>
              </div> `;
    contenedorProductos.appendChild(card);
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarCarrito(producto.id);
      mostrarProductos();
    });
  });
};
mostrarProductos();

//Función Agregar Productos al Carrito
const agregarCarrito = (id) => {
  const productoCatalogo = arrayproductos.find(
    (producto) => producto.id === id
  );
  if (productoCatalogo) {
    if (productoCatalogo.disponible > 0) {
      const productoenCarrito = arraycarrito.find(
        (productos) => productos.id === id
      );
      if (!productoenCarrito) {
        arraycarrito.push(productoCatalogo);
        productoCatalogo.disponible -= 1;
      } else {
        productoenCarrito.cantidad += 1;
        productoCatalogo.disponible -= 1;
      }
    } else {
      alert("Este producto no tiene unidades disponibles");
    }
  }
  calcularTotalCompra();
};

//mostrar los Productos del Carrito con click en boton ver Carrito
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("vercarrito");
verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});
const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  arraycarrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
              <div class="card">
                  <img src=${producto.imagen} class="card-img-top imgProductos">
                  <div class="card-body">
                      <h5>${producto.nombre}</h5>
                      <p>$ ${producto.precio}</p>
                      <p>${producto.cantidad} En Carrito</p>
                      <button id="eliminar${producto.id}" class="btn colorBoton">-</button>
                      <button id="agregar${producto.id}" class="btn colorBoton">+</button>
                      </div>
              </div> `;
    contenedorCarrito.appendChild(card);

    //funcion para eliminar un producto del carrito
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminardelCarrito(producto.id);
    });

    //funcion para aumentar cantidad de un producto que ya esta en el carrito
    const aumentarprodcarrito = document.getElementById(
      `agregar${producto.id}`
    );
    aumentarprodcarrito.addEventListener("click", () => {
      aumentacantprod(producto.id);
      mostrarCarrito();
    });
  });
};

//Función eliminar unidades del producto que estan en el Carrito y actualiza disponible en almacen
const sacardelCarrito = (id) => {
  const productoCatalogo = arrayproductos.find(
    (producto) => producto.id === id
  );
  productoCatalogo.disponible += 1;
  const productoenCarrito = arraycarrito.find((producto) => producto.id === id);
  if (productoenCarrito.cantidad > 1) {
    productoenCarrito.cantidad -= 1;
  } else {
    if (productoenCarrito.cantidad === 1) {
      arraycarrito.splice(arraycarrito.indexOf(productoenCarrito), 1);
    }
  }
  calcularTotalCompra();
};

//funcion que elimina el producto de la lista del carrito y lo recalcula
const eliminardelCarrito = (id) => {
  const producto = arraycarrito.find(producto => producto.id === id);
  sacardelCarrito(id);
  mostrarProductos();
  mostrarCarrito(); // Muestra el Carrito actualizado
  calcularTotalCompra();
};

//funcion que aumenta la cantidad del producto que ya esta en el carrito
const aumentacantprod = (id) => {
  agregarCarrito(id);
  mostrarCarrito(); // Muestra el Carrito actualizado
  calcularTotalCompra();
};

//Función que elimina todo el Carrito del boton Vaciar Carrito
const vaciarCarrito = document.getElementById("vaciarcarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminartodoelcarrito();
});

//Función que vacia el Carrito y actualiza disponible en Catalogo de Productos
const eliminartodoelcarrito = () => {
  let i=0;
  while (i<=arraycarrito.length-1){
    let j=0;  let encontrado=false;
    while((j<=arrayproductos.length-1)&&(encontrado===false))
    { 
      if(arraycarrito[i].id===arrayproductos[j].id){
        encontrado=true;
        arrayproductos[j].disponible += arraycarrito[i].cantidad;
      }
      j++;
    }
    i++;
  }
  arraycarrito = [];
  mostrarProductos();
  mostrarCarrito();
  calcularTotalCompra();
};

// función que calcula el total de la compra
const total = document.getElementById("total");
const calcularTotalCompra = () => {
  let totalCompra = 0;
  arraycarrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `$ ${totalCompra}`;
};
