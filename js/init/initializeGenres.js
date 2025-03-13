import { config, endpoints, errorMessages } from '../utils/config.js';
import { buildUrl, fetchWithRetry } from '../services/fetchData.js';

export async function initializeGenres() {
    try {
        const url = buildUrl(config.BASE_URL, endpoints.GENRE_LIST, {
            api_key: config.API_KEY,
            language: config.LANGUAGE
        });

        const data = await fetchWithRetry(url); // Retry
        const genresContainer = document.getElementById('genres-container');
        
        if (!genresContainer) {
            throw new Error(errorMessages.DOM_ERROR('genres-container'));
        }

        genresContainer.innerHTML = '';
        
        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.className = 'genres-grid';

        // Sort alphabetically
        const sortedGenres = [...data.genres].sort((a, b) => a.name.localeCompare(b.name));

        sortedGenres.forEach(genre => {
            const div = document.createElement('div');
            div.className = 'genre-checkbox';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `genre${genre.id}`;
            input.value = genre.id;
            
            const label = document.createElement('label');
            label.htmlFor = `genre${genre.id}`;
            label.textContent = genre.name;
            
            div.append(input);
            div.append(label);
            checkboxesContainer.append(div);
        });

        genresContainer.append(checkboxesContainer);

    } catch (error) {
        console.error(errorMessages.GENRE_ERROR, error);
        const genresContainer = document.getElementById('genres-container');
        if (genresContainer) {
            genresContainer.innerHTML = `<p class="error-message">${errorMessages.GENRE_ERROR}: ${error.message}</p>`;
        }
    }
}
