// Términos del memorama con descripciones mejoradas
const terminos = [
    { 
        termino: "JUEZ", 
        emoji: "👨‍⚖️",
        descripcion: "Magistrado que imparte justicia y dirige procesos judiciales" 
    },
    { 
        termino: "TRIBUNAL", 
        emoji: "⚖️",
        descripcion: "Órgano de jueces que resuelve controversias jurídicas" 
    },
    { 
        termino: "LEY", 
        emoji: "📜",
        descripcion: "Norma jurídica obligatoria establecida por autoridad" 
    },
    { 
        termino: "JUSTICIA", 
        emoji: "🏛️",
        descripcion: "Principio moral de dar a cada uno lo que le corresponde" 
    },
    { 
        termino: "CÁRCEL", 
        emoji: "🔒",
        descripcion: "Establecimiento para cumplir penas de privación de libertad" 
    },
    { 
        termino: "CONTRATO", 
        emoji: "📝",
        descripcion: "Acuerdo de voluntades que crea derechos y obligaciones" 
    },
    { 
        termino: "ABOGADO", 
        emoji: "👨‍⚖️",
        descripcion: "Profesional que defiende derechos en procesos judiciales" 
    },
    { 
        termino: "DEMANDA", 
        emoji: "💰",
        descripcion: "Documento que inicia un proceso judicial con pretensiones" 
    },
    { 
        termino: "TESTIGO", 
        emoji: "🕵️",
        descripcion: "Persona que declara sobre hechos en proceso judicial" 
    },
    { 
        termino: "PRUEBA", 
        emoji: "📄",
        descripcion: "Medio para demostrar la verdad de los hechos en juicio" 
    },
    { 
        termino: "PLAZO", 
        emoji: "⏰",
        descripcion: "Tiempo establecido para realizar actos procesales" 
    },
    { 
        termino: "PROPIEDAD", 
        emoji: "🏠",
        descripcion: "Derecho de usar, disfrutar y disponer de bienes" 
    },
    { 
        termino: "MATRIMONIO", 
        emoji: "💍",
        descripcion: "Unión legal entre personas con derechos y obligaciones" 
    },
    { 
        termino: "PATRIA POTESTAD", 
        emoji: "👶",
        descripcion: "Derechos y obligaciones de padres sobre hijos menores" 
    },
    { 
        termino: "SOCIEDAD", 
        emoji: "🏢",
        descripcion: "Contrato para contribuir a un fin común con otros" 
    },
    { 
        termino: "HERENCIA", 
        emoji: "💼",
        descripcion: "Transmisión de bienes y derechos por fallecimiento" 
    },
    { 
        termino: "DELITO", 
        emoji: "🚓",
        descripcion: "Acción u omisión penada por la ley con sanción" 
    },
    { 
        termino: "DERECHOS", 
        emoji: "🛡️",
        descripcion: "Facultades o poderes reconocidos a personas por ley" 
    },
    { 
        termino: "DECLARACIÓN", 
        emoji: "📋",
        descripcion: "Manifestación formal ante autoridad judicial" 
    },
    { 
        termino: "LITIGIO", 
        emoji: "⚔️",
        descripcion: "Controversia sometida a decisión de tribunal judicial" 
    }
];

let cartas = [];
let cartasVolteadas = [];
let jugadorActual = 1;
let puntosJ1 = 0;
let puntosJ2 = 0;
let mostrarDescripciones = true;

// Iniciar juego
function iniciarJuego() {
    // Crear pares de cartas
    cartas = [...terminos, ...terminos]
        .sort(() => Math.random() - 0.5);
    
    crearTablero();
    actualizarMarcador();
}

// Crear el tablero de cartas
function crearTablero() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    
    cartas.forEach((terminoObj, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.textContent = '?';
        carta.onclick = () => voltearCarta(index);
        tablero.appendChild(carta);
    });
}

// Voltear carta
function voltearCarta(index) {
    const carta = document.getElementsByClassName('carta')[index];
    const terminoObj = cartas[index];
    
    // Si ya está volteada o son 2 cartas ya volteadas, no hacer nada
    if (carta.textContent !== '?' || cartasVolteadas.length >= 2) return;
    
    // Mostrar el término y descripción
    if (mostrarDescripciones) {
        carta.innerHTML = `
            <div class="termino">${terminoObj.emoji} ${terminoObj.termino}</div>
            <div class="descripcion">${terminoObj.descripcion}</div>
            <div class="equipo-limon">Equipo Limón 🍋</div>
        `;
    } else {
        carta.innerHTML = `
            <div class="termino">${terminoObj.emoji} ${terminoObj.termino}</div>
            <div class="equipo-limon">Equipo Limón 🍋</div>
        `;
    }
    
    carta.classList.add('volteada');
    cartasVolteadas.push(index);
    
    if (cartasVolteadas.length === 2) {
        setTimeout(verificarPar, 1000);
    }
}

// Verificar si las cartas son pares
function verificarPar() {
    const [index1, index2] = cartasVolteadas;
    
    if (cartas[index1].termino === cartas[index2].termino) {
        // Par encontrado
        document.getElementsByClassName('carta')[index1].classList.add('encontrada');
        document.getElementsByClassName('carta')[index2].classList.add('encontrada');
        
        if (jugadorActual === 1) {
            puntosJ1++;
        } else {
            puntosJ2++;
        }
        
        actualizarMarcador();
        verificarFinJuego();
    } else {
        // No es par, voltear de nuevo
        voltearAtras(index1);
        voltearAtras(index2);
        
        // Cambiar turno
        jugadorActual = jugadorActual === 1 ? 2 : 1;
        actualizarMarcador();
    }
    
    cartasVolteadas = [];
}

// Voltear carta hacia atrás
function voltearAtras(index) {
    const carta = document.getElementsByClassName('carta')[index];
    carta.textContent = '?';
    carta.classList.remove('volteada');
    carta.innerHTML = '?';
}

// Actualizar marcador
function actualizarMarcador() {
    document.getElementById('player1').innerHTML = `JUGADOR 1: ⭐ <span>${puntosJ1}</span>`;
    document.getElementById('player2').innerHTML = `JUGADOR 2: ⭐ <span>${puntosJ2}</span>`;
    document.getElementById('turno').textContent = `TURNO: JUGADOR ${jugadorActual}`;
    
    // Resaltar jugador activo
    document.getElementById('player1').classList.toggle('active', jugadorActual === 1);
    document.getElementById('player2').classList.toggle('active', jugadorActual === 2);
}

// Verificar fin del juego
function verificarFinJuego() {
    const cartasVolteadas = document.getElementsByClassName('carta');
    let todasEncontradas = true;
    
    for (let carta of cartasVolteadas) {
        if (carta.textContent === '?') {
            todasEncontradas = false;
            break;
        }
    }
    
    if (todasEncontradas) {
        setTimeout(() => {
            let mensaje = '';
            if (puntosJ1 > puntosJ2) {
                mensaje = `¡JUGADOR 1 GANA! 🏆\n\nPuntos: ${puntosJ1} vs ${puntosJ2}`;
            } else if (puntosJ2 > puntosJ1) {
                mensaje = `¡JUGADOR 2 GANA! 🏆\n\nPuntos: ${puntosJ1} vs ${puntosJ2}`;
            } else {
                mensaje = `¡EMPATE! 🤝\n\nAmbos jugadores: ${puntosJ1} puntos`;
            }
            
            mensaje += '\n\nDesarrollado por Equipo Limón 🍋';
            alert(mensaje);
        }, 500);
    }
}

// Reiniciar juego
function reiniciarJuego() {
    cartasVolteadas = [];
    jugadorActual = 1;
    puntosJ1 = 0;
    puntosJ2 = 0;
    iniciarJuego();
}

// Alternar descripciones
function toggleDescripciones() {
    mostrarDescripciones = !mostrarDescripciones;
    const boton = document.querySelector('button[onclick="toggleDescripciones()"]');
    boton.textContent = mostrarDescripciones ? '🔍 OCULTAR DESCRIPCIONES' : '🔍 MOSTRAR DESCRIPCIONES';
    reiniciarJuego();
}

// Mostrar menú
function mostrarMenu() {
    alert('🎴 MEMORAMA JURÍDICO - Equipo Limón 🍋\n\n• 20 términos jurídicos con descripciones\n• 2 jugadores por turnos\n• Encuentra los pares de términos\n• Gana quien tenga más puntos\n\n¡Aprende derecho jugando!');
}

// Iniciar cuando se carga la página
document.addEventListener('DOMContentLoaded', iniciarJuego);
