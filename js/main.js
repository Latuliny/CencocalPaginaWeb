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
// 3. EJECUTAR LA FUNCIÓN AL CARGAR
// ==========================================
renderizarCards(marcasCencocal);