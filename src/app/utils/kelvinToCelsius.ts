export function kelvinToCelsius(kelvin: number) {
    const temp = kelvin - 273.15
    return `${temp.toFixed(0)}°`;
}
