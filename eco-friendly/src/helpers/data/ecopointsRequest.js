import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllEcopoints = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/ecopoints.json`)
    .then((result) => {
      const ecopointsObject = result.data;
      const ecopointsArray = [];
      if (ecopointsObject != null) {
        Object.keys(ecopointsObject).forEach((ecopointId) => {
          ecopointsObject[ecopointId].id = ecopointId;
          ecopointsArray.push(ecopointsObject[ecopointId]);
        });
      }
      resolve(ecopointsArray);
    })
    .catch((error) => {
      reject(error);
    });
});
const deletePoint = ecopointId => axios.delete(`${firebaseUrl}/ecopoints/${ecopointId}.json`);

const postRequest = newEcopoint => axios.post(`${firebaseUrl}/ecpoints.json`, newEcopoint);

const getSinglePoint = ecopointId => axios.get(`${firebaseUrl}/ecopints/${ecopointId}.json`);

const updateEcopoint = (ecopointId, ecopoint) => axios.put(`${firebaseUrl}/ecopoints/${ecopointId}.json`, ecopoint);

export default {
  getAllEcopoints,
  deletePoint,
  postRequest,
  getSinglePoint,
  updateEcopoint,
};
