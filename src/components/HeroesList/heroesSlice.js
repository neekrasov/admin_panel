import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook'

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        deleteHero: (state, action) => heroesAdapter.removeOne(state, action.payload),
        createHero: (state, action) => heroesAdapter.addOne(state, action.payload)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(()=>{})
    }
});

const  {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

const {actions, reducer} = heroesSlice;

export default reducer;

// Unused, example

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    createHero,
} = actions;

export const filterHeroesSelector = createSelector(
    selectAll,
    state => state.filters.currentFilter,
    (heroes, filter) => {
        if (filter !== 'all') return heroes.filter(({element}) => element === filter);
        return heroes;
    }
)