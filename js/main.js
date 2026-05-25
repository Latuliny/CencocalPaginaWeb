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
/**
 * Genera dinámicamente las tarjetas de marcas en el DOM.
 * Parámetro: "marcas" (Array) - Arreglo de objetos con los datos de las marcas a mostrar.
 */
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
/**
 * Inicializa el evento input del buscador para filtrar marcas en tiempo real.
 * No recibe parámetros. Utiliza el método filter() sobre el arreglo principal.
 */
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
/**
 * Controla la apertura/cierre del menú en móviles.
 * Gestiona atributos ARIA y traslada el foco para lectores de pantalla.
 */
function inicializarMenu() {
    const btnMenu = document.getElementById('btnMenu');
    const navHero = document.querySelector('.nav-hero');

    btnMenu.addEventListener('click', () => {
        navHero.classList.toggle('nav-activo');
        const menuEstaAbierto = navHero.classList.contains('nav-activo');
        
        if (menuEstaAbierto) {
            btnMenu.setAttribute('aria-expanded', 'true');
            btnMenu.setAttribute('aria-label', 'Cerrar menú');
            // Gestión de foco exigida en la rúbrica (Accesibilidad)
            navHero.setAttribute('tabindex', '-1');
            navHero.focus();
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
            
            // Foco en el mensaje de éxito para accesibilidad
            mensajeExito.setAttribute('tabindex', '-1');
            mensajeExito.focus();
            
            formulario.reset();
        }
    });
}

// ==========================================
// 6. MODO OSCURO CON LOCALSTORAGE
// ==========================================
/**
 * Alterna el tema visual del sitio y guarda la preferencia.
 * Utiliza localStorage para persistencia de datos tras recargar.
 */
function inicializarModoOscuro() {
    const btnTema = document.getElementById('btnTema');
    if (!btnTema) return;

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

/**
 * Escucha clics en las tarjetas, busca el objeto interactuado
 * y lo almacena convirtiéndolo a JSON String en el localStorage.
 */
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

/**
 * Lee la longitud del arreglo actual y renderiza de forma segura la cantidad.
 */
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