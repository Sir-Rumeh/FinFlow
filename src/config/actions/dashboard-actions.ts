import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { MandateRequest, QueryParams } from 'utils/interfaces';

/* MANDATE REQUEST ACTIONS */
export const addMandateRequest = async (payload: MandateRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/mandaterequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);

  try {
    const response = await AxiosClient.get(`/mandaterequests?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/mandaterequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveMandateRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectMandateRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/reject/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMandateRequest = async (
  requestId: string | undefined,
  payload: MandateRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* MANDATE MANAGEMENT ACTIONS */
export const getMandates = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);

  try {
    const response = await AxiosClient.get(`/mandates?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/mandates/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/mandates/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandates/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandates/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMandate = async (requestId: string | undefined, payload: { amount: number }) => {
  try {
    const response = await AxiosClient.put(`/mandates/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* DASHBOARD STATISTICS */
export const getMandateStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/mandaterequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* PROFILE MANAGEMENT ACTIONS */
export const getProfiles = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);

  try {
    const response = await AxiosClient.get(`/profiles?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/profiles/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
