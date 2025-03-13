import { errorMessages } from '../utils/config.js';

export async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(errorMessages.HTTP_ERROR(response.status));
        }
        return await response.json();
    } catch (error) {
        console.error(errorMessages.FETCH_ERROR, error);
        throw error; // Re-throw para manejo en el componente
    }
}


export async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchData(url, options);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}


export function buildUrl(baseUrl, endpoint, params = {}) {
    const url = new URL(baseUrl + endpoint);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value);
        }
    });
    return url.toString();
}