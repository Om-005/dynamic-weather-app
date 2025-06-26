const CONFIG = {
    BASE_URL: 'https://weather-proxy-a40o.onrender.com/api',
    ENDPOINTS: {
        CURRENT: '/weather',
        FORECAST: '/forecast'
    },
    UNITS: 'metric',
    DEFAULT_CITY: 'New York',
    REQUEST_TIMEOUT: 10000,

    isConfigured() {
        return this.BASE_URL && this.BASE_URL.includes('http');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
