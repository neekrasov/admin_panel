import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes', "Filters"], //Tag data update
    endpoints: builder => ({
        getAllHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        }),
        getAllFilters: builder.query({
            query: () => '/filters',
            providesTags: ['Filters']
        }),
    })
})

export const {useGetAllHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation, useGetAllFiltersQuery} = apiSlice;