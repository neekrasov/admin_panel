import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/HeroesFilters/filtersSlice'
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
    reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), // thunk is the default
    devTools: process.env.NODE_ENV !== 'production',
    
})

export default store;