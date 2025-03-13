import { searchMovies } from './js/services/searchMovies.js';
import { goBack } from './js/utils/goBack.js';
import { initializeYearSelect } from './js/init/initializeYearSelect.js';
import { initializeGenres } from './js/init/initializeGenres.js';
import { initializeRatingSlider } from './js/init/initializeRatingSlider.js';
import { loadCertifications } from './js/init/loadCertifications.js';
import { displayMovies } from './js/components/displayMovies.js';
import { createMovieCard } from './js/components/createMovieCard.js';
import { toggleFavorite } from './js/components/toggleFavorite.js';
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

// Initialize the page based on current route
if (window.location.pathname.includes('result.html')) {
    displayMovies();
} else {
    // Initialize the page only if we're on the main page
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('Inicializando página principal...');
        try {
            initializeYearSelect();
            await initializeGenres();
            initializeRatingSlider();
            await loadCertifications();
            console.log('Inicialización completada');
        } catch (error) {
            console.error('Error durante la inicialización:', error);
        }
    });
}