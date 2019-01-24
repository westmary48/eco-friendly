import axios from 'axios';
import apiKeys from '../apiKeys';

 const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

 const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/ecopoints.json`)
    .then((res) => {
      const ecopoints = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          ecopoints.push(res.data[key]);
        });
      }
      resolve(ecopoints);
    })
    .catch(err => reject(err));
});

 export default {
  getRequest,
};
