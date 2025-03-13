// Make googleTranslateElementInit globally available
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'fa,es,eu,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    // Add event listener for language changes
    if (window.onLanguageChange) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    window.onLanguageChange();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
    }
}

// Load Google Translate script
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
}); 