// ==========================================
// 1. BASE DE DATOS LOCAL (MARCAS Y PRODUCTOS)
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
// 2. RENDERIZADO DINÁMICO DE TARJETAS
// ==========================================
function renderizarCards(marcas) {
    const contenedor = document.querySelector('.grilla-marcas');
    contenedor.innerHTML = ''; 

    marcas.forEach(({ id, nombre, imagen }) => { 
        const cardItem = document.createElement('div');
        cardItem.className = 'marca-item flip-card';
        cardItem.dataset.idMarca = id;

        const cardInner = document.createElement('div');
        cardInner.className = 'flip-card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'flip-card-front';
        
        const spanNombre = document.createElement('span');
        spanNombre.textContent = nombre; 

        const cardBack = document.createElement('div');
        cardBack.className = 'flip-card-back';
        
        const imgLogo = document.createElement('img');
        imgLogo.src = imagen;
        imgLogo.alt = `Logo de ${nombre}`;

        cardFront.appendChild(spanNombre);
        cardBack.appendChild(imgLogo);
        cardInner.append(cardFront, cardBack); 
        cardItem.appendChild(cardInner);
        contenedor.appendChild(cardItem);
    });
}

// ==========================================
// 3. BUSCADOR EN TIEMPO REAL
// ==========================================
function inicializarBuscador() {
    const inputBuscador = document.getElementById('buscadorMarcas');
    inputBuscador.addEventListener('input', ({ target }) => {
        const textoBusqueda = target.value.toLowerCase();
        const marcasFiltradas = marcasCencocal.filter(({ nombre }) => 
            nombre.toLowerCase().includes(textoBusqueda)
        );
        renderizarCards(marcasFiltradas);
    });
}

// ==========================================
// 4. MENÚ HAMBURGUESA Y ACCESIBILIDAD
// ==========================================
function inicializarMenu() {
    const btnMenu = document.getElementById('btnMenu');
    const navHero = document.querySelector('.nav-hero');

    btnMenu.addEventListener('click', () => {
        const estaAbierto = navHero.classList.toggle('nav-activo'); 
        
        btnMenu.setAttribute('aria-expanded', estaAbierto);
        btnMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú' : 'Abrir menú');
        
        if (estaAbierto) {
            navHero.setAttribute('tabindex', '-1');
            navHero.focus();
        }
    });
}

// ==========================================
// 5. VALIDACIÓN DE FORMULARIO DE CONTACTO 
// ==========================================
function inicializarFormulario() {
    const formulario = document.getElementById('formContacto');
    if (!formulario) return; 

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        const nombre = document.getElementById('nombreContacto').value.trim();
        const email = document.getElementById('emailContacto').value.trim();
        const mensaje = document.getElementById('mensajeContacto').value.trim();
        
        const errores = {
            nombre: document.getElementById('errorNombre'),
            email: document.getElementById('errorEmail'),
            mensaje: document.getElementById('errorMensaje')
        };
        const mensajeExito = document.getElementById('mensajeExito');

        Object.values(errores).forEach(err => err.textContent = '');
        mensajeExito.style.display = 'none';

        let esValido = true;
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 3) { 
            errores.nombre.textContent = 'Mínimo 3 caracteres.'; 
            // AQUÍ FALTA ALGO INTENCIONALMENTE
        }
        if (!regexCorreo.test(email)) { 
            errores.email.textContent = 'Correo inválido.'; 
            esValido = false; 
        }
        if (mensaje.length < 10) { 
            errores.mensaje.textContent = 'Mínimo 10 caracteres.'; 
            esValido = false; 
        }

        if (esValido) {
            mensajeExito.textContent = `¡Gracias ${nombre}! Mensaje enviado.`;
            mensajeExito.style.display = 'block';
            mensajeExito.setAttribute('tabindex', '-1');
            mensajeExito.focus();
            formulario.reset();
        }
    });
}

// ==========================================
// 6. MODO OSCURO CON LOCALSTORAGE
// ==========================================
function inicializarModoOscuro() {
    const btnTema = document.getElementById('btnTema');
    const temaGuardado = window.localStorage.getItem('temaCencocal');
    
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        btnTema.textContent = '☀️ Modo Claro';
    }

    btnTema.addEventListener('click', () => {
        const esOscuro = document.body.classList.toggle('modo-oscuro');
        
        window.localStorage.setItem('temaCencocal', esOscuro ? 'oscuro' : 'claro');
        btnTema.textContent = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    });
}

// ==========================================
// 7. SISTEMA B2B: MODALES Y CARRITO AVANZADO
// ==========================================
let carritoStock = JSON.parse(window.localStorage.getItem('carritoCencocalStock')) || [];
const modalProductos = document.getElementById('modalProductos');
const modalCarrito = document.getElementById('modalCarrito');

function inicializarSistemaB2B() {
    actualizarContadorCarrito();
    
    document.querySelector('.grilla-marcas').addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.flip-card');
        if (!tarjeta) return; 
        
        const marcaId = parseInt(tarjeta.dataset.idMarca);
        const marcaSel = marcasCencocal.find(m => m.id === marcaId);
        abrirModalProductos(marcaSel);
    });

    document.querySelector('.btn-tienda').addEventListener('click', (evento) => {
        evento.preventDefault();
        abrirModalCarrito();
    });

    document.getElementById('cerrarModalProductos').addEventListener('click', () => cerrarModal(modalProductos));
    document.getElementById('cerrarModalCarrito').addEventListener('click', () => cerrarModal(modalCarrito));
    
    document.getElementById('btnVaciarCarrito').addEventListener('click', () => {
        carritoStock = [];
        guardarYActualizarCarrito();
        renderizarListaCarrito();
    });
}

function abrirModalProductos({ nombre, productos }) { 
    document.getElementById('tituloModalProductos').textContent = `Catálogo: ${nombre}`;
    const contenedorLista = document.getElementById('listaProductos');
    contenedorLista.innerHTML = '';

    productos.forEach(productoNombre => {
        const divItem = document.createElement('div');
        divItem.className = 'item-lista';
        
        const spanProd = document.createElement('span');
        spanProd.textContent = productoNombre;
        
        const btnAñadir = document.createElement('button');
        btnAñadir.className = 'btn-mini';
        btnAñadir.textContent = 'Añadir';
        btnAñadir.addEventListener('click', () => {
            carritoStock.push({ marca: nombre, producto: productoNombre });
            guardarYActualizarCarrito();
            alert(`¡${nombre} agregado a tu pre-orden!`);
        });

        divItem.append(spanProd, btnAñadir);
        contenedorLista.appendChild(divItem);
    });

    abrirModal(modalProductos, 'tituloModalProductos');
}

function abrirModalCarrito() {
    renderizarListaCarrito();
    abrirModal(modalCarrito, null);
}

function renderizarListaCarrito() {
    const contenedor = document.getElementById('contenidoCarrito');
    contenedor.innerHTML = '';

    if (carritoStock.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center;">No hay productos en tu pre-orden.</p>';
        return;
    }

    carritoStock.forEach(({ marca, producto }, index) => {
        const divItem = document.createElement('div');
        divItem.className = 'item-lista';
        
        const spanDetalle = document.createElement('span');
        spanDetalle.textContent = `${marca} - ${producto}`;
        
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-mini btn-eliminar';
        btnEliminar.textContent = '🗑️';
        btnEliminar.setAttribute('aria-label', `Eliminar ${producto}`);
        btnEliminar.addEventListener('click', () => {
            carritoStock.splice(index, 1);
            guardarYActualizarCarrito();
            renderizarListaCarrito(); 
        });

        divItem.append(spanDetalle, btnEliminar);
        contenedor.appendChild(divItem);
    });
}

function abrirModal(modalDOM, focoId) {
    modalDOM.classList.add('activo');
    modalDOM.setAttribute('aria-hidden', 'false');
    if (focoId) {
        document.getElementById(focoId).setAttribute('tabindex', '-1');
        document.getElementById(focoId).focus();
    } else {
        modalDOM.setAttribute('tabindex', '-1');
        modalDOM.focus();
    }
}

function cerrarModal(modalDOM) {
    modalDOM.classList.remove('activo');
    modalDOM.setAttribute('aria-hidden', 'true');
}

function guardarYActualizarCarrito() {
    window.localStorage.setItem('carritoCencocalStock', JSON.stringify(carritoStock));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) contador.textContent = carritoStock.length;
}

renderizarCards(marcasCencocal);
inicializarBuscador();
inicializarMenu();
inicializarFormulario(); 
inicializarModoOscuro(); 
inicializarSistemaB2B();