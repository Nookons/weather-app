import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducers/weather';
import forecastReducer from './reducers/forecast';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        forecast: forecastReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;