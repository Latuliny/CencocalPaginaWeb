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
        // Sanitización para prevenir XSS
        spanNombre.textContent = marca.nombre; 

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
// 5. VALIDACIÓN DE FORMULARIO DE CONTACTO SEGURO
// ==========================================
function inicializarFormulario() {
    const formulario = document.getElementById('formContacto');
    if (!formulario) return; 

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita recargar la página

        const inputNombre = document.getElementById('nombreContacto');
        const inputEmail = document.getElementById('emailContacto');
        const inputMensaje = document.getElementById('mensajeContacto');
        
        const errorNombre = document.getElementById('errorNombre');
        const errorEmail = document.getElementById('errorEmail');
        const errorMensaje = document.getElementById('errorMensaje');
        const mensajeExito = document.getElementById('mensajeExito');

        // Limpiar mensajes
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
            errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido.';
            formularioValido = false;
        }

        if (inputMensaje.value.trim().length < 10) {
            errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
            formularioValido = false;
        }

        if (formularioValido) {
            mensajeExito.textContent = `¡Gracias por contactarnos, ${inputNombre.value.trim()}! Hemos recibido tu mensaje de forma segura.`;
            mensajeExito.style.display = 'block';
            formulario.reset();
        }
    });
}

// ==========================================
// EJECUCIÓN INICIAL AL CARGAR LA PÁGINA
// ==========================================
renderizarCards(marcasCencocal);
inicializarBuscador();
inicializarMenu();
inicializarFormulario();