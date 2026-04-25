// 1. Importaicon de datos
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/products";
import type {CartItem} from "../../../types/products";

// ICategory

export const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
export const contenedorProductos = document.getElementById("contenedor-productos") as HTMLElement;

function cargarCategorias() {
    const categorias = getCategories();
    
    // Con esta opcion se puede volver al inicio sin tener que recargar la paigna
    listaCategorias.innerHTML = `<li><a href="#" class="filtro-cat" data-categoria="TODOS">Todas las Categorías</a></li>`;

    categorias.forEach((cat) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" class="filtro-cat" data-categoria="${cat.nombre}">${cat.nombre}</a>`;
        listaCategorias?.appendChild(li);
    });
}


function cargarProductos(listaAMostrar: Product[]) {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = ""; 

    listaAMostrar.forEach((producto: Product) => { 
        const article = document.createElement("article");
        article.classList.add("card-producto");
        article.innerHTML = `            
            <img src="/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio}</strong></p>            
            <button class="btn-producto">Agregar</button>`;

        contenedorProductos.appendChild(article); 

        const btn = article.querySelector(".btn-producto");
        btn?.addEventListener("click", () => 
        {const carrito: CartItem[] = JSON.parse(localStorage.getItem("carrito") || "[]");
         const itemExistente = carrito.find(item => item.id === producto.id);    
         if (itemExistente) {
        itemExistente.cantidad += 1; // Si existe, sumamos uno 
    } else {
        //Agregado para el carrito.
        carrito.push({ ...producto, cantidad: 1 })};
        localStorage.setItem("carrito", JSON.stringify(carrito));
    
        alert(`${producto.nombre} agregado al carrito`);
    })})};

const btnLogout = document.getElementById("logout-btn"); 

btnLogout?.addEventListener("click", () => {    
    localStorage.removeItem("userData"); 
    window.location.href = "../../auth/login/login.html"; // Para que mande al login
});

const inputBusqueda = document.querySelector('input[type="search"]') as HTMLInputElement;
const formBusqueda = document.querySelector('form');

formBusqueda?.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = inputBusqueda.value.toLowerCase();
    
    // Filtracion de productos
    const filtrados = PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(texto)
    );
    
    cargarProductos(filtrados); //Renderiza solo los que coinciden
});

//Filtro de buscar

formBusqueda?.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const texto = inputBusqueda.value.toLowerCase().trim();
    
    // Filtro del array PRODUCTS 
    const productosFiltrados = PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(texto)
    );
    
    // Aviso si no hay resultados
    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = "<p>No se encontraron productos con ese nombre.</p>";
    } else {
        cargarProductos(productosFiltrados); 
    }
});

//Filtro de la barra lateral
// Escuchas los clicks en la barra lateral
listaCategorias?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    if (target.classList.contains('filtro-cat')) {
        const categoriaSeleccionada = target.getAttribute('data-categoria');

        // Si elige "TODOS", mostramos el array completo
        if (categoriaSeleccionada === "TODOS") {
            cargarProductos(PRODUCTS);
        } else {
            // Si elige otra cosa, filtramos
            const filtrados = PRODUCTS.filter(p => 
                p.categorias.some(c => c.nombre === categoriaSeleccionada)
            );
            cargarProductos(filtrados);
        }
    }
});

// Ejecucion
cargarCategorias();
cargarProductos(PRODUCTS);