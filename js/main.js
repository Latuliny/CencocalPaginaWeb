// ==========================================
// 1. ARREGLO DE OBJETOS (DATOS DE LAS MARCAS)
// ==========================================
const marcasCencocal = [
    { id: 1, nombre: "Softys", imagen: "assets/softys.png" },
    { id: 2, nombre: "SC Johnson", imagen: "assets/SCJohnson.png" },
    { id: 3, nombre: "Carozzi", imagen: "assets/Carozzi.png" },
    { id: 4, nombre: "Poett", imagen: "assets/poett.png" },
    { id: 5, nombre: "Clorox", imagen: "assets/Clorox.png" },
    { id: 6, nombre: "Unilever", imagen: "assets/Unilever.png" },
    { id: 7, nombre: "Rinso", imagen: "assets/rinso.png" },
    { id: 8, nombre: "Sedal", imagen: "assets/sedal.png" },
    { id: 9, nombre: "Soft", imagen: "assets/soft.png" }
];

// ==========================================
// 2. FUNCIÓN PARA RENDERIZAR LAS CARDS
// ==========================================
function renderizarCards(marcas) {
    const contenedor = document.querySelector('.grilla-marcas');
    contenedor.innerHTML = ''; 

    marcas.forEach(marca => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('marca-item', 'flip-card');

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
// 3. LÓGICA DEL BUSCADOR EN TIEMPO REAL
// ==========================================
function inicializarBuscador() {
    const inputBuscador = document.getElementById('buscadorMarcas');
    inputBuscador.addEventListener('input', (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();
        const marcasFiltradas = marcasCencocal.filter(marca => {
            return marca.nombre.toLowerCase().includes(textoBusqueda);
        });
        renderizarCards(marcasFiltradas);
    });
}

// ==========================================
// 4. MENÚ HAMBURGUESA Y ACCESIBILIDAD ARIA
// ==========================================
function inicializarMenu() {
    const btnMenu = document.getElementById('btnMenu');
    const navHero = document.querySelector('.nav-hero');

    btnMenu.addEventListener('click', () => {
        navHero.classList.toggle('nav-activo');
        const menuEstaAbierto = navHero.classList.contains('nav-activo');
        if (menuEstaAbierto) {
            btnMenu.setAttribute('aria-expanded', 'true');
            btnMenu.setAttribute('aria-label', 'Cerrar menú');
        } else {
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.setAttribute('aria-label', 'Abrir menú');
        }
    });
}

// ==========================================
// 5. VALIDACIÓN DE FORMULARIO DE CONTACTO (¡Recuperado!)
// ==========================================
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
            errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
            formularioValido = false;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(inputEmail.value.trim())) {
            errorEmail.textContent = 'Ingresa un correo electrónico válido.';
            formularioValido = false;
        }

        if (inputMensaje.value.trim().length < 10) {
            errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
            formularioValido = false;
        }

        if (formularioValido) {
            mensajeExito.textContent = `¡Gracias ${inputNombre.value.trim()}! Mensaje enviado.`;
            mensajeExito.style.display = 'block';
            formulario.reset();
        }
    });
}

// ==========================================
// 6. MODO OSCURO CON LOCALSTORAGE
// ==========================================
function inicializarModoOscuro() {
    const btnTema = document.getElementById('btnTema');
    if (!btnTema) return; // Por si el botón aún no está en el HTML

    const miStorage = window.localStorage;
    const temaGuardado = miStorage.getItem('temaCencocal');
    
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        btnTema.textContent = '☀️ Modo Claro';
    }

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-oscuro');
        
        if (document.body.classList.contains('modo-oscuro')) {
            miStorage.setItem('temaCencocal', 'oscuro');
            btnTema.textContent = '☀️ Modo Claro';
        } else {
            miStorage.setItem('temaCencocal', 'claro');
            btnTema.textContent = '🌙 Modo Oscuro';
        }
    });
}

// ==========================================
// 7. CARRITO DE PRE-ORDEN CON LOCALSTORAGE
// ==========================================
let carritoActual = JSON.parse(window.localStorage.getItem('carritoCencocal')) || [];

function inicializarCarrito() {
    actualizarContadorCarrito();
    const contenedorMarcas = document.querySelector('.grilla-marcas');
    
    contenedorMarcas.addEventListener('click', (evento) => {
        const tarjetaClickeada = evento.target.closest('.flip-card');
        if (tarjetaClickeada) {
            const nombreMarca = tarjetaClickeada.querySelector('.flip-card-front span').textContent;
            const marcaSeleccionada = marcasCencocal.find(m => m.nombre === nombreMarca);
            
            if (marcaSeleccionada) {
                carritoActual.push(marcaSeleccionada);
                window.localStorage.setItem('carritoCencocal', JSON.stringify(carritoActual));
                actualizarContadorCarrito();
                alert(`¡${marcaSeleccionada.nombre} agregado a tu pre-orden!`);
            }
        }
    });
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        contador.textContent = carritoActual.length;
    }
}

// ==========================================
// EJECUCIÓN INICIAL AL CARGAR LA PÁGINA
// ==========================================
renderizarCards(marcasCencocal);
inicializarBuscador();
inicializarMenu();
inicializarFormulario(); 
inicializarModoOscuro(); 
inicializarCarrito();    