import type { CartItem } from "../../../types/products";

// Atrapamos los elementos del HTML
const contenedorCarrito = document.getElementById("contenedor-carrito") as HTMLElement;
const totalCarrito = document.getElementById("total-carrito") as HTMLElement;

//Funcion para renderizaar los precios
const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio);
};

function renderizarCarrito() {
    // Con esto saco los datos del localStorage
    const carrito: CartItem[] = JSON.parse(localStorage.getItem("carrito") || "[]");

    // Si el carrito está vacio debe mostrarse un mensaje indicandolo. 
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío. ¡Agregá algo rico desde el catálogo!</p>";
        totalCarrito.innerText = "Total: $0";
        return;
    }

    // Armamos la tabla del carrito
    contenedorCarrito.innerHTML = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody id="cuerpo-carrito"></tbody>
        </table>
    `;
    const cuerpoCarrito = document.getElementById("cuerpo-carrito") as HTMLElement;
    let totalAcumulado = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${formatearPrecio(item.precio)}</td>
            <td>
                <input type="number" class="input-cantidad" 
                       data-id="${item.id}" value="${item.cantidad}" min="1">
            </td>
            <td>${formatearPrecio(subtotal)}</td>
            <td>
                <button class="btn-eliminar" data-id="${item.id}">Quitar</button>
            </td>
        `;
        cuerpoCarrito.appendChild(fila);
    });

    //Total acumulado del carrito
    totalCarrito.innerText = `Total Final: ${formatearPrecio(totalAcumulado)}`;

    // Eliminacion de un producto
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const target = e.target as HTMLButtonElement;
            const idProducto = Number(target.getAttribute("data-id"));
            
            // Filtramos el carrito: nos quedamos con todos MENOS con el que tiene ese ID
            const nuevoCarrito = carrito.filter(item => item.id !== idProducto);
            
            // Guardamos en el baúl y volvemos a dibujar
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
            renderizarCarrito(); 
        });
    });

    //Actualizacion de la cantidad
    const inputsCantidad = document.querySelectorAll(".input-cantidad");
    inputsCantidad.forEach(input => {
        input.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            const idProducto = Number(target.getAttribute("data-id"));
            const nuevaCantidad = Number(target.value);

            // Buscamos el producto y le actualizamos la cantidad
            const carritoActualizado = carrito.map(item => {
                if (item.id === idProducto) {
                    item.cantidad = nuevaCantidad;
                }
                return item;
            });

            localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
            renderizarCarrito();
        });
    });
}



// boton logout sino tira error.
const btnLogout = document.getElementById("logout-btn"); 
btnLogout?.addEventListener("click", () => {    
    localStorage.removeItem("userData"); 
    window.location.href = "../../auth/login/login.html"; 
});


renderizarCarrito();