export function displayMovies() {
    const resultsContainer = document.getElementById('results-container');
    const movies = JSON.parse(localStorage.getItem('searchResults') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    resultsContainer.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Return to the main page';
    backButton.onclick = () => window.location.href = 'index.html';
    resultsContainer.append(backButton);

    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';
    resultsSection.innerHTML = '<h2>Search results</h2>';
    
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'results-grid';
    resultsSection.append(resultsGrid);
    
    movies.forEach(movie => {
        resultsGrid.append(createMovieCard(movie, favorites.some(fav => fav.id === movie.id)));
    });
    
    resultsContainer.append(resultsSection);

    // Add favorites section at the end if there are favorites
    if (favorites.length > 0) {
        const favoritesSection = document.createElement('div');
        favoritesSection.className = 'favorites-section';
        favoritesSection.innerHTML = '<h2>Your favorite movies</h2>';
        
        // Create grid for favorites
        const favoritesGrid = document.createElement('div');
        favoritesGrid.className = 'favorites-grid';
        favoritesSection.append(favoritesGrid);
        
        // Add favorite movies to the grid
        favorites.forEach(movie => {
            favoritesGrid.append(createMovieCard(movie, true));
        });
        
        resultsContainer.append(favoritesSection);
    }
}