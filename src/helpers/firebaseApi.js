const url = 'http://localhost:8080';

export const getApi = async () => {
  const res = await fetch(url);
  const { API_KEY } = await res.json();
  return API_KEY;
};
