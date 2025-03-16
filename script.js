import { searchMovies } from './js/services/searchMovies.js';
import { goBack } from './js/utils/goBack.js';
import { initializeYearSelect } from './js/init/initializeYearSelect.js';
import { initializeGenres } from './js/init/initializeGenres.js';
import { initializeRatingSlider } from './js/init/initializeRatingSlider.js';
import { loadCertifications } from './js/init/loadCertifications.js';
import { displayMovies } from './js/components/displayMovies.js';
import { createMovieCard } from './js/components/createMovieCard.js';
import { toggleFavorite, displayFavorites } from './js/components/toggleFavorite.js';
import { fetchData } from './js/services/fetchData.js';

// Expose functions to window object for HTML access
window.searchMovies = searchMovies;
window.goBack = goBack;
window.initializeYearSelect = initializeYearSelect;
window.initializeGenres = initializeGenres;
window.initializeRatingSlider = initializeRatingSlider;
window.displayMovies = displayMovies;
window.createMovieCard = createMovieCard;
window.toggleFavorite = toggleFavorite;
window.fetchData = fetchData;
window.loadCertifications = loadCertifications;
window.displayFavorites = displayFavorites;

// Función para inicializar la página de resultados
async function initializeResultsPage() {
    try {
        // Primero cargar los favoritos para que estén disponibles
        await displayFavorites();
        // Luego mostrar los resultados de la búsqueda
        await displayMovies();
        // Actualizar los botones de favoritos después de mostrar los resultados
        await displayFavorites();
    } catch (error) {
        console.error('Error al inicializar la página de resultados:', error);
    }
}

// Función para inicializar la página principal
async function initializeMainPage() {
    try {
        console.log('Inicializando página principal...');
        initializeYearSelect();
        await initializeGenres();
        initializeRatingSlider();
        await loadCertifications();
        await displayFavorites();
        console.log('Inicialización completada');
    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
}

// Initialize the page based on current route
document.addEventListener('DOMContentLoaded', async () => {
    const isResultPage = window.location.pathname.includes('result.html');
    if (isResultPage) {
        await initializeResultsPage();
    } else {
        await initializeMainPage();
    }
});