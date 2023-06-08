import AsyncStorage from '@react-native-async-storage/async-storage';

const authFetch = async (url, options) => {
  const token = await AsyncStorage.getItem('userToken');

  const fetchOptions = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, fetchOptions);
};

export default authFetch;
