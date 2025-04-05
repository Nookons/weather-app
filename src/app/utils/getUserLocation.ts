export function getUserLocation(): Promise<{ lat: number; lon: number } | null> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            alert("Geolocation не поддерживается этим браузером.");
            return reject(null);
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({ lat, lon });
            },
            (error) => {
                console.error("Ошибка получения местоположения:", error);
                alert("Не удалось получить местоположение!");
                reject(null);
            }
        );
    });
}
