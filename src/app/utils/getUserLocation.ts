import {fetchWeatherData} from "@/app/utils/getWeatherData";

export function getUserLocation(): Promise<IWeatherData | null> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            alert("Geolocation не поддерживается этим браузером.");
            return reject(null);
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const weatherData = await fetchWeatherData(lat.toString(), lon.toString());
                    resolve(weatherData);
                } catch (error) {
                    console.error("Ошибка при получении погоды:", error);
                    reject(null);
                }
            },
            (error) => {
                console.error("Ошибка получения местоположения:", error);
                alert("Не удалось получить местоположение!");
                reject(null);
            }
        );
    });
}
