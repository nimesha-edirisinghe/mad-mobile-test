import apiClient from '../apiInstances/apiClient';

export const getUser = async (
  data?: Record<string, unknown>,
  queryParams?: Record<string, string>
) => {
  try {
    return await apiClient(`/`, 'GET', data, queryParams);
  } catch (error) {
    throw error;
  }
};
