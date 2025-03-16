import { createMovieCard } from './createMovieCard.js';

// Function to update favorite buttons
function updateFavoriteButtons(movieId, isFavorite) {
    const buttons = document.querySelectorAll(`[data-movie-id="${movieId}"]`);
    buttons.forEach(button => {
        button.classList.toggle('active', isFavorite);
        button.innerHTML = isFavorite ? '❤️' : '🤍';
    });
}

// Function to toggle a movie as favorite
export async function toggleFavorite(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieId = movie.id;
    
    const isFavorite = favorites.some(fav => fav.id === movieId);

    if (isFavorite) {
        // Remove from favorites if already there
        favorites = favorites.filter(fav => fav.id !== movieId);
    } else {
        // Add to favorites if not already there
        favorites.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
            overview: movie.overview
        });
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update UI for this movie's buttons
    updateFavoriteButtons(movieId, !isFavorite);

    // Actualizar la sección de favoritos
    await displayFavorites();
}

// Function to check if a movie is favorite
export function isFavorite(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.id === movieId);
}

// Function to display favorite movies in the favorites section
export async function displayFavorites() {
    try {
        const favoritesGrid = document.getElementById('favorites-grid');
        const favoritesSection = document.getElementById('favorites-section');
        
        if (!favoritesGrid || !favoritesSection) {
            return; // Silently return if section not found
        }

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Clear previous content
        favoritesGrid.innerHTML = '';

        if (favorites.length > 0) {
            favoritesSection.style.display = 'block';
            
            // Add favorite movies dynamically in reverse order (newest first)
            [...favorites].reverse().forEach(movie => {
                const movieCard = createMovieCard(movie);
                favoritesGrid.appendChild(movieCard);
            });

            // Update all favorite buttons in the page
            const allButtons = document.querySelectorAll('.favorite-button');
            allButtons.forEach(button => {
                const buttonMovieId = parseInt(button.getAttribute('data-movie-id'));
                updateFavoriteButtons(buttonMovieId, favorites.some(fav => fav.id === buttonMovieId));
            });
        } else {
            favoritesSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Error al mostrar favoritos:', error);
    }
}
