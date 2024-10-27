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
    getPatientInfo: builder.query({
      query: (username) => ({
        url: `${HCP_URL}/getpatient?username=${username}`,
        method: 'GET',
      }),
    }),
    addBloodType: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addbloodtype`,
        method: 'POST',
        body: data,
      }),
    }),
    addWeight: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addweight`,
        method: 'POST',
        body: data,
      }),
    }),
    addChronicIllness: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addchronicillness`,
        method: 'POST',
        body: data,
      }),
    }),
    addDisability: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/adddisability`,
        method: 'POST',
        body: data,
      }),
    }),
    addAllergy: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addallergy`,
        method: 'POST',
        body: data,
      }),
    }),
    addMedication: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addmedication`,
        method: 'POST',
        body: data,
      }),
    }),
    addPastSurgery: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/addpastsurgery`,
        method: 'POST',
        body: data,
      }),
    }),
    addDiagnosis: builder.mutation({
      query: (data) => ({
        url: `${HCP_URL}/adddiagnosis`,
        method: 'POST',
        body: data,
      }),
    }),
    addScan: builder.mutation({
      query: (formData) => ({
        url: `${HCP_URL}/addscan`,
        method: 'POST',
        body: formData,
      }),
    }),
    addLab: builder.mutation({
      query: (formData) => ({
        url: `${HCP_URL}/addlab`,
        method: 'POST',
        body: formData
      })
    }),
    getFileByIdhcp: builder.query({
      query: (id) => ({
        url: `${HCP_URL}/file/${id}`,
        method: 'GET',
        responseHandler: 'blob'
      }),
    }),
  }),
});

export const {
  useLoginHcpMutation,
  useLogoutHcpMutation,
  useGetPatientInfoQuery,
  useAddBloodTypeMutation,
  useAddWeightMutation,
  useAddChronicIllnessMutation,
  useAddDisabilityMutation,
  useAddAllergyMutation,
  useAddMedicationMutation,
  useAddPastSurgeryMutation,
  useAddDiagnosisMutation,
  useAddScanMutation,
  useAddLabMutation,
  useGetFileByIdhcpQuery
} = hcpApiSlice;
