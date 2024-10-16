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
    // Add other patient-related endpoints here
  }),
});

export const { useLoginPatientMutation, useLogoutPatientMutation } = patientApiSlice;
