const baseURL = 'https://randomuser.me/api/';

const apiClient = async (
  url: string,
  method: string,
  data?: Record<string, unknown>,
  queryParams?: Record<string, string>
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  let fullUrl = `${baseURL}${url}`;
  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    fullUrl += `?${queryString}`;
  }

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default apiClient;
