export function initializeRatingSlider() {
    const ratingSlider = document.getElementById('voteAverage');
    const ratingValue = document.getElementById('ratingValue');
    
    ratingSlider.addEventListener('input', (e) => {
        ratingValue.textContent = e.target.value;
    });
}