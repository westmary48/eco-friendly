import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createUser = user => axios.post(`${firebaseUrl}/ecousers.json`, user);

const getUserByUid = uid => new Promise((resolve, reject) => {
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

const updateUser = (userId, ecouser) => axios.put(`${firebaseUrl}/ecousers/${userId}.json`, ecouser);

const postUser = ecouser => axios.post(`${firebaseUrl}/ecousers.json`, ecouser);

const getSingleUser = userId => axios.get(`${firebaseUrl}/ecousers/${userId}.json`);


export default {
  getAllUsers,
  getUserByUid,
  createUser,
  updateUser,
  postUser,
  getSingleUser,
};
