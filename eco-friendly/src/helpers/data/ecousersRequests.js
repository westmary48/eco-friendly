import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createUser = user => axios.post(`${firebaseUrl}/ecousers.json`, user);

// change all users to ecousers
const getEcoUserByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/ecousers.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const ecouserObject = result.data;
      const ecouserArray = [];
      if (ecouserObject != null) {
        Object.keys(ecouserObject).forEach((ecouserId) => {
          ecouserObject[ecouserId].id = ecouserId;
          ecouserArray.push(ecouserObject[ecouserId]);
        });
      }
      resolve(ecouserArray[0]);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/ecousers.json`)
    .then((result) => {
      const userObject = result.data;
      const userArray = [];
      if (userObject != null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          userArray.push(userObject[userId]);
        });
      }
      resolve(userArray);
    })
    .catch((error) => {
      reject(error);
    });
});


const updateEcoUser = (ecouserId, ecouserPoints) => axios.patch(`${firebaseUrl}/ecousers/${ecouserId}.json`, ecouserPoints);

const postEcoUser = ecouser => axios.post(`${firebaseUrl}/ecousers.json`, ecouser);

const getSingleEcoUser = ecouserId => axios.get(`${firebaseUrl}/ecousers/${ecouserId}.json`);

const addUser = newUser => axios.post(`${firebaseUrl}/ecousers.json`, newUser);


export default {
  getEcoUserByUid,
  createUser,
  updateEcoUser,
  postEcoUser,
  getSingleEcoUser,
  addUser,
  getAllUsers,
};
