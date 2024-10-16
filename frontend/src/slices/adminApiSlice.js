import { apiSlice } from './apiSlice';

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    // Add other admin-related endpoints here
  }),
});

export const { useLoginAdminMutation, useLogoutAdminMutation } = adminApiSlice;
