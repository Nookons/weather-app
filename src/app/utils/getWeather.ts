export function getWeatherFromLocalStorageSimple() {
    const weatherData = localStorage.getItem('weatherData');

    if (!weatherData) {
        return null; // Если данных нет в localStorage
    }

    const parsedData = JSON.parse(weatherData);
    return parsedData.weatherData;
}