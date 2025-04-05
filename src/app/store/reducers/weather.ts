import { IWeatherData } from "@/app/types/weather";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ItemsState = {
    weather: IWeatherData | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    weather: null,
    loading: false,
    error: undefined,
};

export const subscribeToWeather = createAsyncThunk<
    void,  // Нет необходимости возвращать данные в компонент (данные уже диспатчатся в состояние)
    { lat: number; lon: number },
    { rejectValue: string }  // Тип ошибки
>(
    "weather/subscribeToWeather",
    async ({ lat, lon }, { dispatch, rejectWithValue }) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

            if (!apiKey) {
                return rejectWithValue("API key missing");
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=eng&appid=${apiKey}`
            );

            if (!response.ok) {
                return rejectWithValue("Ошибка при загрузке погоды.");
            }

            const data = await response.json();
            dispatch(setItems(data as IWeatherData));
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(`Ошибка запроса к API: ${error.message}`);
            }
            return rejectWithValue("Ошибка запроса к API: неизвестная ошибка");
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IWeatherData>) => {
            state.weather = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(subscribeToWeather.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(subscribeToWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Не удалось загрузить данные о погоде.";
            });
    },
});


export const { setItems } = weatherSlice.actions;
export default weatherSlice.reducer;
