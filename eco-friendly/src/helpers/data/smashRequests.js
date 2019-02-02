// This file contans all requests that touch multiple collections.

import ecousersRequests from './ecousersRequests';
import friendRequests from './friendRequest';

const usersAndFriends = currentUid => new Promise((resolve, reject) => {
  const users = [];
  ecousersRequests.getAllUsers()
    .then((usrs) => {
      friendRequests.getAllFriends()
        .then((friends) => {
          usrs.forEach((user) => {
            const newUser = { ...user };
            newUser.isAccepted = false;
            newUser.isPending = false;
            newUser.friendRequest = '';
            newUser.friendRequestId = '';
            friends.forEach((friend) => {
              if (friend.uid === currentUid && friend.friendUid === newUser.uid) {
                newUser.isAccepted = friend.isAccepted;
                newUser.isPending = friend.isPending;
                newUser.friendRequest = 'me';
                newUser.friendRequestId = friend.id;
              } else if (friend.friendUid === currentUid && newUser.uid === friend.uid) {
                newUser.isAccepted = friend.isAccepted;
                newUser.isPending = friend.isPending;
                newUser.friendRequest = 'them';
                newUser.friendRequestId = friend.id;
              }
            });
            if (newUser.uid !== currentUid) {
              users.push(newUser);
            }
          });
          resolve(users);
        });
    })
    .catch(err => reject(err));
});
const getPointsFromMeAndFriends = uid => new Promise((resolve, reject) => {
  let allPoints = [];
  ecousersRequests.getAllUsers()
    .then((ecouserz) => {
      allPoints = ecouserz;
      friendRequests.getMyFriends(uid).then((friendsArray) => {
        friendsArray.push(uid);
        const pointsToKeep = allPoints.filter(f => friendsArray.includes(f.uid));
        resolve(pointsToKeep);
      });
    })
    .catch(err => reject(err));
});


export default {
  usersAndFriends,
  getPointsFromMeAndFriends,
};
