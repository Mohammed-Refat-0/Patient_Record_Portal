import { apiSlice } from './apiSlice';

const HCP_URL = '/api/hcp';

export const hcpApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginHcp: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutHcp: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    // Add other healthcare professional-related endpoints here
  }),
});

export const { useLoginHcpMutation, useLogoutHcpMutation } = hcpApiSlice;
