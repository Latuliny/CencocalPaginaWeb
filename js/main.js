// ==========================================
// 1. ARREGLO DE OBJETOS EXPANDIDO (DATOS Y PRODUCTOS)
// ==========================================
const marcasCencocal = [
    { id: 1, nombre: "Softys", imagen: "assets/softys.png", productos: ["Confort Noble", "Toallas Nova", "Pañuelos Elite"] },
    { id: 2, nombre: "SC Johnson", imagen: "assets/SCJohnson.png", productos: ["Raid Insecticida", "Glade Aromático", "Cera Mr. Músculo"] },
    { id: 3, nombre: "Carozzi", imagen: "assets/Carozzi.png", productos: ["Fideos Espagueti 400g", "Salsa de Tomate 200g", "Galletas Costa"] },
    { id: 4, nombre: "Poett", imagen: "assets/poett.png", productos: ["Desodorante Ambiental Primavera", "Limpiador Líquido Lavanda"] },
    { id: 5, nombre: "Clorox", imagen: "assets/Clorox.png", productos: ["Cloro Tradicional 1L", "Cloro Gel", "Toallitas Desinfectantes"] },
    { id: 6, nombre: "Unilever", imagen: "assets/Unilever.png", productos: ["Té Lipton", "Mayonesa Hellmann's", "Jabón Dove"] },
    { id: 7, nombre: "Rinso", imagen: "assets/rinso.png", productos: ["Detergente Polvo 1KG", "Detergente Líquido 3L"] },
    { id: 8, nombre: "Sedal", imagen: "assets/sedal.png", productos: ["Shampoo Ceramidas 340ml", "Acondicionador Restauración"] },
    { id: 9, nombre: "Soft", imagen: "assets/soft.png", productos: ["Suavizante Clásico 1L", "Suavizante Brisa Floral 2L"] }
];

// ==========================================
// 2. FUNCIÓN PARA RENDERIZAR LAS CARDS DE MARCAS
// ==========================================
/**
 * Genera dinámicamente las tarjetas de marcas en el DOM.
 * Parámetro: "marcas" (Array) - Arreglo de objetos con los datos a mostrar.
 */
function renderizarCards(marcas) {
    const contenedor = document.querySelector('.grilla-marcas');
    contenedor.innerHTML = ''; 

    marcas.forEach(marca => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('marca-item', 'flip-card');
        cardItem.dataset.idMarca = marca.id; // Vinculamos el ID para el modal

        const cardInner = document.createElement('div');
        cardInner.classList.add('flip-card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('flip-card-front');
        const spanNombre = document.createElement('span');
        spanNombre.textContent = marca.nombre; // Previene vulnerabilidad XSS

        const cardBack = document.createElement('div');
        cardBack.classList.add('flip-card-back');
        const imgLogo = document.createElement('img');
        imgLogo.src = marca.imagen;
        imgLogo.alt = `Logo de ${marca.nombre}`;

        cardFront.appendChild(spanNombre);
        cardBack.appendChild(imgLogo);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardItem.appendChild(cardInner);
        contenedor.appendChild(cardItem);
    });
}

// ==========================================
// 3. BUSCADOR EN TIEMPO REAL
// ==========================================
/**
 * Inicializa el evento input del buscador para filtrar marcas en tiempo real.
 * Utiliza el método filter() sobre el arreglo principal.
 */
function inicializarBuscador() {
    const inputBuscador = document.getElementById('buscadorMarcas');
    inputBuscador.addEventListener('input', (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();
        const marcasFiltradas = marcasCencocal.filter(marca => 
            marca.nombre.toLowerCase().includes(textoBusqueda)
        );
        renderizarCards(marcasFiltradas);
    });
}

// ==========================================
// 4. MENÚ HAMBURGUESA Y ACCESIBILIDAD ARIA
// ==========================================
/**
 * Controla la apertura/cierre del menú en móviles.
 * Gestiona atributos ARIA y traslada el foco para lectores de pantalla.
 */
function inicializarMenu() {
    const btnMenu = document.getElementById('btnMenu');
    const navHero = document.querySelector('.nav-hero');

    btnMenu.addEventListener('click', () => {
        navHero.classList.toggle('nav-activo');
        if (navHero.classList.contains('nav-activo')) {
            btnMenu.setAttribute('aria-expanded', 'true');
            btnMenu.setAttribute('aria-label', 'Cerrar menú');
            navHero.setAttribute('tabindex', '-1');
            navHero.focus(); // Accesibilidad: Mueve el foco al menú
        } else {
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.setAttribute('aria-label', 'Abrir menú');
        }
    });
}

// ==========================================
// 5. VALIDACIÓN DE FORMULARIO DE CONTACTO 
// ==========================================
/**
 * Previene el envío por defecto y valida los campos del formulario.
 * Incorpora Regex y sanitización (textContent) para prevenir Inyección XSS.
 */
function inicializarFormulario() {
    const formulario = document.getElementById('formContacto');
    if (!formulario) return; 

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        const inputNombre = document.getElementById('nombreContacto');
        const inputEmail = document.getElementById('emailContacto');
        const inputMensaje = document.getElementById('mensajeContacto');
        
        const errorNombre = document.getElementById('errorNombre');
        const errorEmail = document.getElementById('errorEmail');
        const errorMensaje = document.getElementById('errorMensaje');
        const mensajeExito = document.getElementById('mensajeExito');

        errorNombre.textContent = ''; 
        errorEmail.textContent = ''; 
        errorMensaje.textContent = '';
        mensajeExito.style.display = 'none';

        let formularioValido = true;

        if (inputNombre.value.trim().length < 3) { 
            errorNombre.textContent = 'Mínimo 3 caracteres.'; 
            formularioValido = false; 
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim())) { 
            errorEmail.textContent = 'Correo inválido.'; 
            formularioValido = false; 
        }
        if (inputMensaje.value.trim().length < 10) { 
            errorMensaje.textContent = 'Mínimo 10 caracteres.'; 
            formularioValido = false; 
        }

        if (formularioValido) {
            mensajeExito.textContent = `¡Gracias ${inputNombre.value.trim()}! Mensaje enviado.`;
            mensajeExito.style.display = 'block';
            mensajeExito.setAttribute('tabindex', '-1');
            mensajeExito.focus(); // Accesibilidad: Mueve el foco al mensaje
            formulario.reset();
        }
    });
}

// ==========================================
// 6. MODO OSCURO CON LOCALSTORAGE
// ==========================================
/**
 * Alterna el tema visual del sitio y guarda la preferencia en LocalStorage.
 */
function inicializarModoOscuro() {
    const btnTema = document.getElementById('btnTema');
    const temaGuardado = window.localStorage.getItem('temaCencocal');
    
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        btnTema.textContent = '☀️ Modo Claro';
    }

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-oscuro');
        if (document.body.classList.contains('modo-oscuro')) {
            window.localStorage.setItem('temaCencocal', 'oscuro');
            btnTema.textContent = '☀️ Modo Claro';
        } else {
            window.localStorage.setItem('temaCencocal', 'claro');
            btnTema.textContent = '🌙 Modo Oscuro';
        }
    });
}

// ==========================================
// 7. SISTEMA B2B: MODALES Y CARRITO AVANZADO
// ==========================================
let carritoStock = JSON.parse(window.localStorage.getItem('carritoCencocalStock')) || [];
const modalProductos = document.getElementById('modalProductos');
const modalCarrito = document.getElementById('modalCarrito');

/**
 * Inicializa los eventos para abrir modales de productos y el carrito.
 */
function inicializarSistemaB2B() {
    actualizarContadorCarrito();
    
    // Abrir Modal de Productos al clickear una Marca (Uso de find)
    document.querySelector('.grilla-marcas').addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.flip-card');
        if (tarjeta) {
            const marcaId = parseInt(tarjeta.dataset.idMarca);
            const marcaSel = marcasCencocal.find(m => m.id === marcaId);
            abrirModalProductos(marcaSel);
        }
    });

    // Abrir Modal del Carrito al clickear el botón superior
    document.querySelector('.btn-tienda').addEventListener('click', (evento) => {
        evento.preventDefault();
        abrirModalCarrito();
    });

    // Botones para cerrar modales
    document.getElementById('cerrarModalProductos').addEventListener('click', () => cerrarModal(modalProductos));
    document.getElementById('cerrarModalCarrito').addEventListener('click', () => cerrarModal(modalCarrito));
    
    // Botón para vaciar todo el carrito
    document.getElementById('btnVaciarCarrito').addEventListener('click', () => {
        carritoStock = [];
        guardarYActualizarCarrito();
        renderizarListaCarrito();
    });
}

/**
 * Muestra la lista de productos de una marca en un modal dinámico
 * Parámetro: "marca" (Object) - Objeto con los datos y productos de la marca
 */
function abrirModalProductos(marca) {
    document.getElementById('tituloModalProductos').textContent = `Catálogo: ${marca.nombre}`;
    const contenedorLista = document.getElementById('listaProductos');
    contenedorLista.innerHTML = '';

    marca.productos.forEach(productoNombre => {
        const divItem = document.createElement('div');
        divItem.classList.add('item-lista');
        
        const spanProd = document.createElement('span');
        spanProd.textContent = productoNombre;
        
        const btnAñadir = document.createElement('button');
        btnAñadir.classList.add('btn-mini');
        btnAñadir.textContent = 'Añadir';
        btnAñadir.addEventListener('click', () => {
            carritoStock.push({ marca: marca.nombre, producto: productoNombre });
            guardarYActualizarCarrito();
            alert(`¡${marca.nombre} agregado a tu pre-orden!`);
        });

        divItem.appendChild(spanProd);
        divItem.appendChild(btnAñadir);
        contenedorLista.appendChild(divItem);
    });

    modalProductos.classList.add('activo');
    modalProductos.setAttribute('aria-hidden', 'false');
    document.getElementById('tituloModalProductos').setAttribute('tabindex', '-1');
    document.getElementById('tituloModalProductos').focus(); // Accesibilidad: Foco en Modal
}

/**
 * Muestra el contenido actual del carrito permitiendo eliminar ítems (splice)
 */
function abrirModalCarrito() {
    renderizarListaCarrito();
    modalCarrito.classList.add('activo');
    modalCarrito.setAttribute('aria-hidden', 'false');
    modalCarrito.setAttribute('tabindex', '-1');
    modalCarrito.focus(); // Accesibilidad: Foco en Modal
}

function renderizarListaCarrito() {
    const contenedor = document.getElementById('contenidoCarrito');
    contenedor.innerHTML = '';

    if (carritoStock.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center;">No hay productos en tu pre-orden.</p>';
        return;
    }

    carritoStock.forEach((item, index) => {
        const divItem = document.createElement('div');
        divItem.classList.add('item-lista');
        
        const spanDetalle = document.createElement('span');
        spanDetalle.textContent = `${item.marca} - ${item.producto}`;
        
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn-mini', 'btn-eliminar');
        btnEliminar.textContent = '🗑️';
        btnEliminar.setAttribute('aria-label', `Eliminar ${item.producto}`);
        btnEliminar.addEventListener('click', () => {
            carritoStock.splice(index, 1); // Elimina 1 elemento usando su índice
            guardarYActualizarCarrito();
            renderizarListaCarrito(); // Re-dibuja el DOM actualizado
        });

        divItem.appendChild(spanDetalle);
        divItem.appendChild(btnEliminar);
        contenedor.appendChild(divItem);
    });
}

function cerrarModal(modalDOM) {
    modalDOM.classList.remove('activo');
    modalDOM.setAttribute('aria-hidden', 'true');
}

function guardarYActualizarCarrito() {
    // Convierte el arreglo a String JSON para LocalStorage
    window.localStorage.setItem('carritoCencocalStock', JSON.stringify(carritoStock));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) contador.textContent = carritoStock.length;
}

// ==========================================
// EJECUCIÓN INICIAL 
// ==========================================
renderizarCards(marcasCencocal);
inicializarBuscador();
inicializarMenu();
inicializarFormulario(); 
inicializarModoOscuro(); 
inicializarSistemaB2B();