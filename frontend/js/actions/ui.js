export const SHOW_MAP = 'SHOW_MAP';
export const HIDE_MAP = 'HIDE_MAP';

export const showMap = () => {
  return {
    type: SHOW_MAP,
  };
};

export const hideMap = () => {
  return {
    type: HIDE_MAP,
  };
};
