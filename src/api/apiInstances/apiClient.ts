const baseURL = 'https://randomuser.me/api/';

// Asynchronous function for making API requests
const apiClient = async (
  url: string,
  method: string,
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Options for the fetch function
  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  // Constructing the full URL with base URL, endpoint, and query parameters
  let fullUrl = `${baseURL}${url}`;
  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    fullUrl += `?${queryString}`;
  }

  try {
    // Making the API request using the fetch function
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
