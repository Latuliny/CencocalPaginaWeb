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
// 2 & 3. FUNCIÓN PARA RENDERIZAR LAS CARDS
// ==========================================
function renderizarCards(marcas) {
    // Seleccionamos el contenedor vacío del HTML
    const contenedor = document.querySelector('.grilla-marcas');
    
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = ''; 

    // Recorremos el arreglo de marcas
    marcas.forEach(marca => {
        // Creamos los elementos HTML uno por uno usando document.createElement
        const cardItem = document.createElement('div');
        cardItem.classList.add('marca-item', 'flip-card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('flip-card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('flip-card-front');
        
        const spanNombre = document.createElement('span');
        // ATENCIÓN: Usamos textContent por seguridad para evitar vulnerabilidades XSS
        spanNombre.textContent = marca.nombre; 

        const cardBack = document.createElement('div');
        cardBack.classList.add('flip-card-back');
        
        const imgLogo = document.createElement('img');
        imgLogo.src = marca.imagen;
        imgLogo.alt = `Logo de ${marca.nombre}`;

        // Ensamblamos la tarjeta metiendo un elemento dentro de otro
        cardFront.appendChild(spanNombre);
        cardBack.appendChild(imgLogo);
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        
        cardItem.appendChild(cardInner);
        
        // Finalmente, agregamos la tarjeta completa al contenedor principal
        contenedor.appendChild(cardItem);
    });
}

// ==========================================
// 4. LÓGICA DEL BUSCADOR EN TIEMPO REAL
// ==========================================
function inicializarBuscador() {
    // Seleccionamos el input que creamos en el HTML
    const inputBuscador = document.getElementById('buscadorMarcas');

    // Le agregamos un 'escuchador de eventos'. 'input' se dispara cada vez que el usuario escribe o borra algo.
    inputBuscador.addEventListener('input', (evento) => {
        // Capturamos lo que el usuario escribió y lo pasamos a minúsculas para que la búsqueda sea exacta
        const textoBusqueda = evento.target.value.toLowerCase();

        // Filtramos el arreglo original usando el método .filter()
        const marcasFiltradas = marcasCencocal.filter(marca => {
            // Pasamos el nombre de la marca a minúsculas y verificamos si incluye el texto buscado
            return marca.nombre.toLowerCase().includes(textoBusqueda);
        });

        // Volvemos a llamar a nuestra función, pero esta vez le pasamos el arreglo filtrado
        renderizarCards(marcasFiltradas);
    });
}

// ==========================================
// 5. MENÚ HAMBURGUESA Y ACCESIBILIDAD ARIA
// ==========================================
function inicializarMenu() {
    // Seleccionamos el botón y la navegación
    const btnMenu = document.getElementById('btnMenu');
    const navHero = document.querySelector('.nav-hero');

    // Escuchamos el clic en el botón
    btnMenu.addEventListener('click', () => {
        // Alternamos (agregamos/quitamos) la clase que muestra el menú en CSS
        navHero.classList.toggle('nav-activo');

        // ACCESIBILIDAD: Verificamos si el menú está abierto o cerrado
        const menuEstaAbierto = navHero.classList.contains('nav-activo');
        
        // Actualizamos el atributo aria-expanded dinámicamente
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
// EJECUCIÓN INICIAL AL CARGAR LA PÁGINA
// ==========================================
// 1. Mostramos todas las tarjetas inicialmente
renderizarCards(marcasCencocal);
// 2. Activamos el buscador para que esté listo para usarse
inicializarBuscador();
// 3. Activamos el menú hamburguesa
inicializarMenu();