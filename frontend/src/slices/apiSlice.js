import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json, application/octet-stream');
    return headers;
  },
  responseHandler: (response) => {
    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json();
    }
    return response.blob();
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Admin', 'Hcp', 'Patient'],
  endpoints: (builder) => ({}),
});
