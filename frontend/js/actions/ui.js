export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showMap = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const hideMap = () => {
  return {
    type: HIDE_MODAL,
  };
};
