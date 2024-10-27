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
    getFile: builder.query({
      query: (id) => ({
        url: `${PATIENT_URL}/getfile/?id=${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginPatientMutation, useLogoutPatientMutation, useGetPatientFromPatientQuery, useGetFileQuery } = patientApiSlice;
