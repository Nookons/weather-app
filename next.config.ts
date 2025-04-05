import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['openweathermap.org'], // Разрешаем домен для загрузки изображений
    },
};

export default nextConfig;
