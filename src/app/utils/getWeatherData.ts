export async function fetchWeatherData(lat: string, lon: string) {
    const API_KEY = '4d70cd080179becacc711dbcea25f2c7'; // Твой API-ключ
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    try {
        const response = await fetch(url); // Ожидаем ответа от API
        const data = await response.json(); // Ожидаем данных в формате JSON

        return data; // Возвращаем полученные данные
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null; // Возвращаем null, если произошла ошибка
    }
}
