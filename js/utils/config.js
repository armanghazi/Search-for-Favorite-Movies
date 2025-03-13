export const config = {
    API_KEY: '51fc65ca9a37bfc870c971a33d3f2464',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    DEFAULT_POSTER: 'https://i.ebayimg.com/images/g/dLEAAOSwXFhg6~CL/s-l1600.webp',   // or use alt in movieCard.
    LANGUAGE: 'en-US',
    MIN_VOTE_COUNT: 100,
    YEAR_START: 1900
};

export const endpoints = {
    GENRE_LIST: '/genre/movie/list',
    DISCOVER_MOVIE: '/discover/movie',
    CERTIFICATION_LIST: '/certification/movie/list'
};

export const errorMessages = {
    HTTP_ERROR: (status) => `Error in the request: ${status}`,
    FETCH_ERROR: 'Error getting data',
    NO_RESULTS: 'No movies were found matching the criteria.',
    CERTIFICATION_ERROR: 'No Spanish certifications were found',
    GENRE_ERROR: 'Error loading genres',
    DOM_ERROR: (element) => `The element ${element} was not found in the DOM.`
}; 