import { auth } from '../Firebase'// adjust path to your firebase file

const fetchWithToken = async (url, options = {}) => {
  const user = auth.currentUser;

  if (!user) throw new Error('User not authenticated');

  const token = await user.getIdToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${error}`);
  }

  return await res.json();
};

export default fetchWithToken;
