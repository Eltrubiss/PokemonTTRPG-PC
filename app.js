// ==========================================
// ESTADO GLOBAL DEL SISTEMA
// ==========================================
let baseDatosPokemon = [];
let pokemonActivo = null;
let formaActiva = 'base'; // Nueva variable para rastrear la transformación

// ==========================================
// REFERENCIAS A LA INTERFAZ (DOM)
// ==========================================
const listaPcElement = document.getElementById('lista-pc');
const infoPokemonElement = document.getElementById('info-pokemon');
const inputNivelElement = document.getElementById('input-nivel');

// ==========================================
// MÓDULO MATEMÁTICO
// ==========================================
function calcularStat(statBase, nivel) {
    return (statBase * nivel) / 10 + 5;
}

function calcularBonificador(statCalculada) {
    return Math.round(statCalculada / 10);
}

function formatearBonificador(valor) {
    return valor > 0 ? `+${valor}` : valor.toString();
}

// ==========================================
// MÓDULO DE INTERFAZ Y RENDERIZADO
// ==========================================

// Función global para que los botones HTML puedan llamarla
window.cambiarForma = function(nuevaForma) {
    formaActiva = nuevaForma;
    renderizarDetalles(); // Recalcula todo con la nueva forma
};

function renderizarDetalles() {
    if (!pokemonActivo) return;

    const nivel = parseInt(inputNivelElement.value, 10);
    
    // 1. Determinar qué bloque de estadísticas y habilidades usar
    let stats = pokemonActivo.stat_base;
    let habilidades = pokemonActivo.habilidades || [];
    let nombreAMostrar = pokemonActivo.nombre;

    if (formaActiva !== 'base' && pokemonActivo.formas_alternativas[formaActiva]) {
        const forma = pokemonActivo.formas_alternativas[formaActiva];
        stats = forma.stat_base;
        nombreAMostrar = formaActiva; // Ej: Cambia de "Heracross" a "Mega Heracross"
        
        // Si la forma tiene habilidades propias (como Encadenado), sobrescribe las base
        if (forma.habilidades) {
            habilidades = forma.habilidades;
        }
    }

    // 2. Renderizar Nombre y Botones de Forma
    let htmlSalida = `<h3>${nombreAMostrar} (Nivel ${nivel})</h3>`;
    
    if (pokemonActivo.formas_alternativas) {
        htmlSalida += `<div style="margin-bottom: 15px;">`;
        htmlSalida += `<button onclick="cambiarForma('base')">Forma Base</button> `;
        for (const nombreForma in pokemonActivo.formas_alternativas) {
            htmlSalida += `<button onclick="cambiarForma('${nombreForma}')">${nombreForma}</button> `;
        }
        htmlSalida += `</div>`;
    }

    // 3. Renderizar Información Extra (Evolución y Habilidades)
    htmlSalida += `<div style="margin-bottom: 15px; font-size: 0.9em; background: #f0f0f0; padding: 10px; border-radius: 5px;">`;
    if (habilidades.length > 0) {
        htmlSalida += `<p><strong>Habilidades:</strong> ${habilidades.join(' / ')}</p>`;
    }
    
    // Mostramos la evolución solo si estamos en la forma base y si el Pokémon puede evolucionar
    if (formaActiva === 'base' && pokemonActivo.evolucion) {
        const detalleEvo = pokemonActivo.evoXnivel ? `(Nivel ${pokemonActivo.nivelevolucion})` : '(Método especial)';
        htmlSalida += `<p><strong>Evoluciona a:</strong> ${pokemonActivo.evolucion} ${detalleEvo}</p>`;
    }
    htmlSalida += `</div>`;

    // 4. Calcular y Renderizar Estadísticas
    htmlSalida += `<ul>`;
    for (const [atributo, valorBase] of Object.entries(stats)) {
        const statFinal = calcularStat(valorBase, nivel);
        const bonificador = calcularBonificador(statFinal);
        const bonificadorStr = formatearBonificador(bonificador);
        
        htmlSalida += `<li>
            <strong>${atributo.toUpperCase()}:</strong> Base ${valorBase} 
            &rarr; Stat: <strong>${statFinal.toFixed(1)}</strong> 
            (Bonificador: <strong>${bonificadorStr}</strong>)
        </li>`;
    }
    htmlSalida += `</ul>`;
    
    infoPokemonElement.innerHTML = htmlSalida;
}

function popularListaPC() {
    listaPcElement.innerHTML = ''; 
    
    baseDatosPokemon.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon.nombre;
        li.style.cursor = 'pointer';
        li.style.margin = '5px 0';
        li.style.textDecoration = 'underline';
        
        li.addEventListener('click', () => {
            pokemonActivo = pokemon;
            formaActiva = 'base'; // Reiniciamos a la forma base al cambiar de Pokémon
            renderizarDetalles();
        });
        
        listaPcElement.appendChild(li);
    });
}

// ==========================================
// INICIALIZACIÓN DEL SISTEMA
// ==========================================
async function inicializarSistema() {
    try {
        const respuesta = await fetch('data/pokemon.json');
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        
        baseDatosPokemon = await respuesta.json();
        popularListaPC();
    } catch (error) {
        console.error("Error al cargar JSON:", error);
        infoPokemonElement.innerHTML = `<p style="color: red;">Error al cargar la base de datos.</p>`;
    }
}

inputNivelElement.addEventListener('input', renderizarDetalles);
document.addEventListener('DOMContentLoaded', inicializarSistema);