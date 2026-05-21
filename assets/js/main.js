/**
 * SISTEMA DE PRE-ÓRDENES MAYORISTAS (PASO 7)
 */

// Variables globales para el almacenamiento local (Modelo de cátedra)
let miStorage = window.localStorage;
let carritoMayorista = [];

// Arreglo de objetos centralizado de marcas (Requisito Paso 2)
const marcasCencocal = [
    { id: 1, nombre: "Unilever", rubro: "Consumo Masivo" },
    { id: 2, nombre: "Softys", rubro: "Cuidado Personal" },
    { id: 3, nombre: "Sedal", rubro: "Cuidado Capilar" },
    { id: 4, nombre: "Rinso", rubro: "Limpieza e Higiene" }
];

// Evento de inicialización al cargar la ventana
window.onload = () => {
    // 1. Recuperar datos previos de localStorage
    let carritoGuardado = JSON.parse(miStorage.getItem("carritoCencocal"));
    
    if (carritoGuardado != null) {
        carritoMayorista = carritoGuardado;
    }
    
    // 2. Sincronizar el contador de la pantalla
    actualizarContadorVisual();
    
    // 3. Ejecutar la carga dinámica de las marcas en la grilla (Paso 3)
    renderizarCardsMarcas(marcasCencocal);
};

/**
 * Carga dinámica usando tarjetas manipulando el DOM de forma pura
 */
function renderizarCardsMarcas(datos) {
    const contenedorGrilla = document.querySelector(".grilla-marcas");
    if (!contenedorGrilla) return;
    
    // Limpiamos el contenedor (Paso 1)
    contenedorGrilla.innerHTML = "";
    
    // Recorremos el arreglo de objetos (Paso 3)
    datos.forEach(marca => {
        // Crear elemento div para la tarjeta
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("marca-item");
        
        // Estilo flexible para que el botón quepa de forma ordenada abajo
        cardDiv.style.flexDirection = "column";
        cardDiv.style.gap = "10px";
        
        // Crear elemento para el texto de forma segura contra XSS usando textContent
        const tituloMarca = document.createElement("span");
        tituloMarca.textContent = marca.nombre;
        cardDiv.appendChild(tituloMarca);
        
        // BOTÓN INTERACTIVO DEL CARRITO (PASO 7)
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "Añadir a pre-orden";
        btnAgregar.classList.add("btn-preorden");
        
        // Escuchador de eventos estructurado sin ensuciar el HTML
        btnAgregar.addEventListener("click", () => {
            agregarAPreOrden(marca);
        });
        
        // Añadir el botón a la tarjeta y la tarjeta a la grilla
        cardDiv.appendChild(btnAgregar);
        contenedorGrilla.appendChild(cardDiv);
    });
}

/**
 * Agrega el objeto al arreglo, actualiza localStorage y refresca la interfaz (Paso 7)
 */
function agregarAPreOrden(objetoMarca) {
    // Push del objeto al estado global en memoria
    carritoMayorista.push(objetoMarca);
    
    // Guardar arreglo transformado en String en LocalStorage (Lógica de TercerScript.js)
    miStorage.setItem("carritoCencocal", JSON.stringify(carritoMayorista));
    
    // Actualizar el DOM reactivamente
    actualizarContadorVisual();
    
    alert(`¡Se ha añadido ${objetoMarca.nombre} a tu lista de pre-órdenes mayoristas!`);
}

/**
 * Modifica el nodo de la interfaz de forma segura
 */
function actualizarContadorVisual() {
    const contadorElemento = document.getElementById("contadorCarrito");
    if (contadorElemento) {
        // Usamos estrictamente textContent por seguridad de la rúbrica
        contadorElemento.textContent = carritoMayorista.length;
    }
}