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
    createHcp: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createhcp`,
        method: 'POST',
        body: data,
      }),
    }),
    getHcp: builder.query({
      query: ({ username }) => ({
        url: `${ADMIN_URL}/gethcp?username=${username}`,
        method: 'GET',
      }),
    }),
    deleteHcp: builder.mutation({
      query: ({ username, password }) => ({
        url: `${ADMIN_URL}/deletehcp?username=${username}&password=${password}`,
        method: 'DELETE',
      }),
    }),
    createPatient: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createpatient`,
        method: 'POST',
        body: data,
      }),
    }),
    getPatient: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/getpatient`,
        method: 'GET',
      }),
    }),
    deletePatient: builder.mutation({
      query: ({ username, password }) => ({
        url: `${ADMIN_URL}/deletepatient?username=${username}&password=${password}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useCreateHcpMutation,
  useDeleteHcpMutation,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useGetHcpQuery,
  useGetPatientQuery,
} = adminApiSlice;
