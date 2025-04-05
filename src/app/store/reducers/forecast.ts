import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IForecastData} from "@/app/types/forecast";

type ItemsState = {
    forecast: IForecastData | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    forecast: null,
    loading: false,
    error: undefined,
};

export const subscribeToForecast = createAsyncThunk<
    IForecastData,
    { lat: number; lon: number },
    { rejectValue: string }
>(
    'forecast/subscribeToForecast',
    async ({ lat, lon }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

            if (!apiKey) {
                return rejectWithValue("API key missing");
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=eng&appid=${apiKey}`
            );

            if (!response.ok) {
                return rejectWithValue("Ошибка при загрузке прогноза погоды.");
            }

            const data = await response.json();

            return data as IForecastData;
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            return rejectWithValue("Сетевая ошибка или ошибка запроса к API.");
        }
    }
);

const weatherSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IForecastData>) => {
            state.forecast = action.payload;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToForecast.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(subscribeToForecast.fulfilled, (state, action) => {
                state.loading = false;
                state.forecast = action.payload;
            })
            .addCase(subscribeToForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Не удалось получить прогноз погоды.';
            });
    }
});

export const { setItems } = weatherSlice.actions;
export default weatherSlice.reducer;
