import { apiSlice } from './apiSlice';

const PATIENT_URL = '/api/patient';

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginPatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutPatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    getPatientFromPatient: builder.query({
      query: () => ({
        url: `${PATIENT_URL}/info`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginPatientMutation, useLogoutPatientMutation, useGetPatientFromPatientQuery } = patientApiSlice;
