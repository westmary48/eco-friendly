import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createUser = user => axios.post(`${firebaseUrl}/ecousers.json`, user);

// change all users to ecousers
const getEcoUserByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/ecousers.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const userObject = result.data;
      const userArray = [];
      if (userObject != null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          userArray.push(userObject[userId]);
        });
      }
      resolve(userArray[0]);
    })
    .catch((error) => {
      reject(error);
    });
});


const updateEcoUser = (ecouserId, ecouser) => axios.put(`${firebaseUrl}/ecousers/${ecouserId}.json`, ecouser);

const postEcoUser = ecouser => axios.post(`${firebaseUrl}/ecousers.json`, ecouser);

const getSingleEcoUser = ecouserId => axios.get(`${firebaseUrl}/ecousers/${ecouserId}.json`);


export default {
  getEcoUserByUid,
  createUser,
  updateEcoUser,
  postEcoUser,
  getSingleEcoUser,
};
