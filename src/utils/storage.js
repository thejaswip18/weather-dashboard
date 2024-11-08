export const saveLastSearchedCity = (city) => {
  localStorage.setItem('lastCity', city);
};

export const getLastSearchedCity = () => {
  return localStorage.getItem('lastCity');
};
