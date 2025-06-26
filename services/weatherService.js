// Weather Service for Proxy-based Weather API Integration
class WeatherService {
    constructor() {
        this.config = window.CONFIG || {};
        this.baseUrl = this.config.BASE_URL;
        this.units = this.config.UNITS || 'metric';
        this.timeout = this.config.REQUEST_TIMEOUT || 10000;
    }

    /**
     * Fetch current weather data for a city
     * @param {string} city - City name
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeather(city) {
        try {
            const url = `${this.baseUrl}/weather?city=${encodeURIComponent(city)}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(this.getErrorMessage(response.status, errorData.message));
            }

            const data = await response.json();
            return this.formatWeatherData(data);

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - please check your internet connection');
            }
            throw error;
        }
    }

    /**
     * Fetch 7-day weather forecast for a city
     * @param {string} city - City name
     * @returns {Promise<Object>} Forecast data
     */
    async getWeatherForecast(city) {
        try {
            const url = `${this.baseUrl}/forecast?city=${encodeURIComponent(city)}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(this.getErrorMessage(response.status, errorData.message));
            }

            const data = await response.json();
            return this.formatForecastData(data);

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - please check your internet connection');
            }
            throw error;
        }
    }

    /**
     * Check if the weather service is properly configured
     * @returns {boolean}
     */
    isConfigured() {
        return this.config.isConfigured ? this.config.isConfigured() :
               (this.baseUrl && this.baseUrl.startsWith('http'));
    }

    /**
     * Get configuration status and helpful messages
     */
    getConfigurationStatus() {
        const isConfigured = this.isConfigured();
        return {
            isConfigured,
            message: isConfigured ?
                'Weather service is configured and ready to use.' :
                'Please configure your proxy server BASE_URL in config/config.js',
            helpUrl: ''
        };
    }

    /**
     * Format raw API data to match UI expectations
     */
    formatWeatherData(data) {
        return {
            city: `${data.name}, ${data.sys.country}`,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            visibility: Math.round(data.visibility / 1000),
            icon: this.getWeatherIcon(data.weather[0].icon),
            iconCode: data.weather[0].icon,
            pressure: data.main.pressure,
            cloudiness: data.clouds.all,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
        };
    }

    /**
     * Format forecast data from API response
     */
    formatForecastData(data) {
        const dailyForecasts = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = {
                    date: dateKey,
                    shortDate: date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    }),
                    temps: [],
                    descriptions: [],
                    icons: [],
                    humidity: [],
                    windSpeed: []
                };
            }

            dailyForecasts[dateKey].temps.push(item.main.temp);
            dailyForecasts[dateKey].descriptions.push(item.weather[0].description);
            dailyForecasts[dateKey].icons.push(item.weather[0].icon);
            dailyForecasts[dateKey].humidity.push(item.main.humidity);
            dailyForecasts[dateKey].windSpeed.push(item.wind.speed * 3.6);
        });

        const processedForecast = Object.values(dailyForecasts)
            .slice(0, 7)
            .map(day => ({
                date: day.date,
                shortDate: day.shortDate,
                maxTemp: Math.round(Math.max(...day.temps)),
                minTemp: Math.round(Math.min(...day.temps)),
                description: this.getMostFrequentItem(day.descriptions),
                icon: this.getWeatherIcon(this.getMostFrequentItem(day.icons)),
                iconCode: this.getMostFrequentItem(day.icons),
                avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
                avgWindSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length)
            }));

        return {
            city: `${data.city.name}, ${data.city.country}`,
            forecast: processedForecast
        };
    }

    getMostFrequentItem(arr) {
        const frequency = {};
        let maxCount = 0;
        let mostFrequent;

        arr.forEach(item => {
            frequency[item] = (frequency[item] || 0) + 1;
            if (frequency[item] > maxCount) {
                maxCount = frequency[item];
                mostFrequent = item;
            }
        });

        return mostFrequent;
    }

    getWeatherIcon(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    }

    getErrorMessage(status, message) {
        switch (status) {
            case 400: return 'Invalid city name. Please check the spelling and try again.';
            case 401: return 'Unauthorized request. Make sure your proxy server is set up correctly.';
            case 404: return 'City not found. Please try a different city.';
            case 429: return 'Too many requests. Try again shortly.';
            case 500:
            case 502:
            case 503: return 'Weather service is temporarily unavailable. Try again later.';
            default: return message || 'Unable to fetch weather data.';
        }
    }

    validateCityName(city) {
        if (!city || typeof city !== 'string') return false;
        const trimmedCity = city.trim();
        return trimmedCity.length > 0 && trimmedCity.length <= 100;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherService;
} else {
    window.WeatherService = WeatherService;
}
