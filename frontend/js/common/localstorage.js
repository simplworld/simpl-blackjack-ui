export const getAuthState = () => {
  const key = localStorage.getItem('authKey');
  if (key) {
    return {
      loggedIn: true,
      key,
    };
  }
  return {
    loggedIn: false,
    key: '',
  };
};

export const setAuthKey = (key) => {
  localStorage.setItem('authKey', key);
};
