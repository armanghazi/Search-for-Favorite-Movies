export function initializeYearSelect() {
    const yearSelect = document.getElementById('releaseYear');
    const currentYear = new Date().getFullYear();
    const startYear = 1900;

    // Limpiar opciones existentes excepto la primera
    while (yearSelect.options.length > 1) {
        yearSelect.remove(1);
    }

    // Agregar años desde el actual hasta 1900
    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}