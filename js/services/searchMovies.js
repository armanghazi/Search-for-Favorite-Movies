import { config, endpoints, errorMessages } from '../utils/config.js';
import { buildUrl, fetchWithRetry } from './fetchData.js';

export async function searchMovies() {
    try {
        const params = getSearchParams();
        const url = buildUrl(config.BASE_URL, endpoints.DISCOVER_MOVIE, {
            api_key: config.API_KEY,
            language: config.LANGUAGE,
            sort_by: 'popularity.desc',
            page: 1,
            'vote_count.gte': config.MIN_VOTE_COUNT,
            ...params   //All values ​​are added automatically.
        });

        const data = await fetchWithRetry(url); //Retry

        if (data.results?.length > 0) {
            localStorage.setItem('searchResults', JSON.stringify(data.results));
            window.location.href = 'result.html';
        } else {
            showError(errorMessages.NO_RESULTS);
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        showError(error.message);
    }
}

function getSearchParams() {
    const releaseMonth = document.getElementById('releaseMonth').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const genres = Array.from(document.querySelectorAll('.genre-checkbox input:checked')).map(input => input.value);
    const voteAverage = document.getElementById('voteAverage').value;
    const certifications = Array.from(document.querySelectorAll('.certification-checkbox input:checked')).map(input => input.value);

    const params = {};

    if (releaseYear) {
        const startDate = releaseMonth ? `${releaseYear}-${releaseMonth}-01` : `${releaseYear}-01-01`;
        const endDate = releaseMonth ? `${releaseYear}-${releaseMonth}-31` : `${releaseYear}-12-31`;
        params['primary_release_date.gte'] = startDate;
        params['primary_release_date.lte'] = endDate;
    }

    if (genres.length > 0) {
        params.with_genres = genres.join(',');
    }

    if (voteAverage) {
        params['vote_average.gte'] = voteAverage;
    }

    if (certifications.length > 0) {
        params.certification_country = 'US';
        params.certification = certifications.join('|');
    }

    return params;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.search-container');
    const existingError = container.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    container.append(errorDiv);
}