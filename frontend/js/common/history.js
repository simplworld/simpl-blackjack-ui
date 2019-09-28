import { createBrowserHistory } from 'history';


const BASE_URL = (window.location.hostname === '7t1rme86sf.execute-api.eu-central-1.amazonaws.com') ? '/dev' : '/';

export default createBrowserHistory({
  basename: `${BASE_URL}`,
});
