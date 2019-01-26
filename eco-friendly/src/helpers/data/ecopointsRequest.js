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

const deletePoints = ecopointId => axios.delete(`${firebaseUrl}/ecopoints/${ecopointId}.json`);

const postRequest = ecopoint => axios.post(`${firebaseUrl}/ecopoints.json`, ecopoint);

const getSinglePoint = ecopointId => axios.get(`${firebaseUrl}/ecopoints/${ecopointId}.json`);

const putRequest = (ecopointId, ecopoint) => axios.put(`${firebaseUrl}/ecopoints/${ecopointId}.json`, ecopoint);

export default {
  getRequest,
  deletePoints,
  postRequest,
  getSinglePoint,
  putRequest,
};
