export function toggleFavorite(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const movies = JSON.parse(localStorage.getItem('searchResults') || '[]');
    
    // Find the movie in either search results or favorites
    const movie = movies.find(m => m.id === movieId) || favorites.find(f => f.id === movieId);
    
    if (!movie) return;

    const index = favorites.findIndex(fav => fav.id === movieId);
    if (index === -1) {
        // Add to favorites if not already there
        favorites.push(movie);
    } else {
        // Remove from favorites if already there
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayMovies(); // Refresh the display
}