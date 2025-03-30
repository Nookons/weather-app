export function kelvinToFahrenheit(kelvin: number) {
    const temp = (kelvin - 273.15) * 9 / 5 + 32
    return ` ${temp.toFixed(0)} F°`;
}
