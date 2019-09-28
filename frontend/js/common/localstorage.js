

export const getAuthState = () => {
  const key = localStorage.getItem('authKey');
  if (key) {
    return {
      forgotPasswordEmailSent: false,
      forgotPasswordReset: false,
      loggedIn: true,
      key,
    };
  }
  return {
    forgotPasswordEmailSent: false,
    forgotPasswordReset: false,
    loggedIn: false,
    key: '',
  };
};

export const setAuthKey = (key) => {
  localStorage.setItem('authKey', key);
};
