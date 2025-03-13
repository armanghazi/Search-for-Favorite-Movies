import { config, endpoints, errorMessages } from '../utils/config.js';
import { buildUrl, fetchWithRetry } from '../services/fetchData.js';

export async function loadCertifications() {
    try {
        const url = buildUrl(config.BASE_URL, endpoints.CERTIFICATION_LIST, {
            api_key: config.API_KEY
        });

        const data = await fetchWithRetry(url);
        const certifications = data.certifications['US'];
        
        if (!certifications) {
            throw new Error(errorMessages.CERTIFICATION_ERROR);
        }

        const certificationsContainer = document.getElementById('certifications-container');
        if (!certificationsContainer) {
            throw new Error(errorMessages.DOM_ERROR('certifications-container'));
        }

        certificationsContainer.innerHTML = '';
        
        // Ordenar certificaciones
        certifications.sort((a, b) => {
            if (a.order && b.order) return a.order - b.order;
            return a.certification.localeCompare(b.certification);
        });

        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.className = 'certifications-checkboxes';

        certifications.forEach(cert => {
            const div = document.createElement('div');
            div.className = 'certification-checkbox';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `cert${cert.certification}`;
            input.value = cert.certification;
            
            const label = document.createElement('label');
            label.htmlFor = `cert${cert.certification}`;
            label.textContent = cert.certification;
            
            div.append(input);
            div.append(label);
            checkboxesContainer.append(div);
        });

        certificationsContainer.append(checkboxesContainer);

    } catch (error) {
        console.error('Error al cargar certificaciones:', error);
        const certificationsContainer = document.getElementById('certifications-container');
        if (certificationsContainer) {
            certificationsContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
        }
    }
}