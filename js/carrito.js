const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#listacarrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciarcarrito");
const listaArticulos = document.querySelector("#lista-items");
const formularioPago = document.querySelector("#formularioPago");
const botonPagar = document.querySelector("#botonpagar");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    
    if(listaArticulos){
        //Agregar un articulo presionando a carrito
        listaArticulos.addEventListener("click", agregarArticulo);
        
        //Vaciar todo el carrito
        btnVaciarCarrito.addEventListener("click", () => {
            articulosCarrito = []; //Resetear arreglo
            localStorage.setItem("carrito", []);
            localStorage.setItem("costoCarrito", 0);
            limpiarHTML(); //Eliminar todo el HTML
        })
    }

    //Eliminar articulos del carrito
    carrito.addEventListener("click", eliminarArticulo);

    //Muestra los cursos del local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carritoHTML();
    })

    //Limpiar el local storage y el carrito cuando el cliente paga
    if(formularioPago){
        botonpagar.addEventListener("click", () => {
            localStorage.setItem("carrito", []);
            localStorage.setItem("costoCarrito", 0);
        })
    }
}


function agregarArticulo(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        const articuloSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(articuloSeleccionado);
        alert("Producto agregado a carrito.");
    }
}

//Eliminar un articulo del carrito
function eliminarArticulo(e){
    e.preventDefault();

    if(e.target.classList.contains("borrar-item")){
        const articuloId = e.target.getAttribute("id");

        //Eliminar el arreglo de articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}

//Leer y extrer la información del producto
function leerDatosProducto(articulo){
    //console.log(articulo);

    //Crear objeto con el contenido del producto actual
    const infoArticulo ={
        imagen: articulo.querySelector("img").src,
        titulo: articulo.querySelector("h3").textContent,
        precio: parseFloat(articulo.querySelector("p span").textContent.replace("$", "")).toFixed(2),
        id: articulo.querySelector("button").getAttribute("id"),
        cantidad: 1
    }

    //Revisa si un item ya existe en el carrito
    const existe = articulosCarrito.some(articulo => articulo.id === infoArticulo.id);
    if(existe){
        //Actualizamos la cantidad
        const articulos = articulosCarrito.map(articulo =>{
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo; //Retorna el objeto actualizado
            }
            else{
                return articulo; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...articulos]
    }
    else{
        //Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoArticulo];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

//Mostrar el carrito en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();

    //Recorrer el carrito y generar el HTML
    articulosCarrito.forEach( articulo => {
        const {imagen, titulo, precio, cantidad, id} = articulo;
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${imagen}" width= 55px, height=auto>
            </td>
            <td>${titulo}</td>
            <td>${cantidad}</td>
            <td>$${(precio*cantidad).toFixed(2)}</td>
            <td> 
                <a href="#" class="borrar-item" id="${id}"> x </a>
            </td>
        `;

        //Agregar el HTML del carrito al tbody
        contenedorCarrito.appendChild(fila);
    });

    //Agregar el carrito de compras al local storage
    sincronizarStorage();

    //Agregar el total al local storage
    totalCarrito();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Eliminar los articulos previos
function limpiarHTML(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function totalCarrito(){
    let total = 0;
    let costoCarrito = localStorage.getItem(total);

    articulosCarrito.forEach(articulo => {
        total = total + articulo.precio*articulo.cantidad;
    })
    
    localStorage.setItem("costoCarrito", total);

    const mostrarTotal = document.createElement("tr");

    mostrarTotal.innerHTML = `
        <td></td>
        <td></td>
        <td>TOTAL:</td>
        <td>$${total.toFixed(2)}</td>
    `;

    //Agregar el total al HTML
    contenedorCarrito.appendChild(mostrarTotal);
}













